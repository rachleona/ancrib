const info =  require("../info.json")
const protocipher = require("../utils/prototype")
const { intToBytes, leftRotate, makeBlocks } = require("../utils/util")

function md5(plaintext, ciphertext, options)
{
    protocipher.call(this, plaintext, ciphertext, options.key, info.md5.modes.pure)

    const addPadding = plaintext => {
        const buf = Buffer.from(plaintext)
        const size = buf.length
        const pad = Buffer.alloc(size % 64 < 56 ? 56 - size % 64 : 120 - size % 64)
        pad[0] = 0x80
        const length = intToBytes(size * 8, 8, 0)
        return Buffer.concat([buf, pad, length])
    }

    const loadWords = block => {
        const matrix = []
        for(let i = 0; i < block.length; i+=4)
        {
            let word = 0x00000000
            for(let j = 0; j < 4; j++)
            {
                word += block[i + j] * Math.pow(256, j)
            }
            matrix.push(word)
        }
        return matrix
    }

    // auxiliary functions
    const F = (a, b, c) => (a & b) | (~a & c) 
    const G = (a, b, c) => (a & c) | (b & ~c) 
    const H = (a, b, c) => a ^ b ^ c
    const I = (a, b, c) =>  b ^ (a | ~c)

    // round constants and shift amounts
    const T = [0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391]
    const s = [7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21]

    const FF = (a, b, c, d, k, i, s) => { 
        let n = a + F(b, c, d) + k + i
        return (b + leftRotate(n, s)) >>> 0
    }
    
    const GG = (a, b, c, d, k, i, s) => { 
        let n = a + G(b, c, d) + k + i
        return (b + leftRotate(n, s)) >>> 0
    }
    
    const HH = (a, b, c, d, k, i, s) => { 
        let n = a + H(b, c, d) + k + i
        return (b + leftRotate(n, s)) >>> 0
    }
    
    const II = (a, b, c, d, k, i, s) => { 
        let n = a + I(b, c, d) + k + i
        return (b + leftRotate(n, s)) >>> 0
    }

    const digest = message => {
        const m = makeBlocks(addPadding(message), 64)
        let A = 0x67452301
        let B = 0xefcdab89
        let C = 0x98badcfe
        let D = 0x10325476
    
        for(let i = 0; i < m.length; i++)
        {
            const words = loadWords(m[i])
            const AA = A
            const BB = B
            const CC = C
            const DD = D
    
            for(let x = 0; x < 64; x++)
            {
                // round 1
                let N = 0
                if(x < 16)
                {
                    N = FF(A, B, C, D, words[x],  T[x], s[x])
                }
                // round 2
                else if(x < 32)
                {
                    N = GG(A, B, C, D, words[(5 * x + 1) % 16],  T[x], s[x])
                }
                // round 3
                else if(x < 48)
                {
                    N = HH(A, B, C, D, words[(3 * x + 5) % 16],  T[x], s[x])
                }
                // round 4
                else
                {
                    N = II(A, B, C, D, words[7 * x % 16],  T[x], s[x])
                }
                
                A = D
                D = C
                C = B
                B = N
            }
    
            A = (A + AA) >>> 0
            B = (B + BB) >>> 0
            C = (C + CC) >>> 0
            D = (D + DD) >>> 0
        }
    
        return Buffer.concat([intToBytes(A, 4, 0), intToBytes(B, 4, 0), intToBytes(C, 4, 0), intToBytes(D, 4, 0)]).toString('hex')
    }

    this.hash = () => {
        const { p, errors } = this.getAttr("p", "errors")
        if(errors.length == 0) this.setC(digest(p))

        return this.getAttr("p", "c", "errors")
    }
}

module.exports = { md5 }