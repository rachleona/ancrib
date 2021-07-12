const info =  require("../info.json")
const protocipher = require("../utils/prototype")
const { intToBytes, xorBytes, makeBlocks, unBlock } = require("../utils/util")

function rijndael(plaintext, ciphertext, options)
{
    const bits = options.bits || 128
    protocipher.call(this, plaintext, ciphertext, options.key, info.rijndael.modes[bits])
    let rounds = options.rounds || 10

    this.setR = r => {
        rounds = r
    }

    const S = [ 0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16 ]
    const Si =[ 0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d ] 
    const rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c]

    const loadMatrix128 = block => {
        const matrix = []
        for(let i = 0; i < block.length; i+=4)
        {
            const arr = block.slice(i, i + 4)
            matrix.push(arr)
        }
        return matrix
    }
    
    const expandKey = (key, num=10) => {
        const roundKeys = []
        let prevKey = loadMatrix128(key)
        
        for(let i = 0; i < num; i++)
        {
            const newKey = []
            let lastCol = Buffer.allocUnsafe(4)
            prevKey[3].copy(lastCol, 0, 1)
            prevKey[3].copy(lastCol, 3, 0)
            for(let j = 0; j < 4; j++)
            {
                lastCol[j] = S[lastCol[j]] 
            }
            
            newKey.push(xorBytes(lastCol, intToBytes(rcon[i], 4, 0)))
    
            for(let j = 0; j < prevKey.length; j++)
            {
                const newCol = xorBytes(prevKey[j], newKey[newKey.length - 1])
                newKey[j] = newCol
            }
    
            roundKeys[i] = newKey
            prevKey = newKey
        }
    
        return roundKeys
    }
    
    const round = (blocks, key, last=false) => {
        const res = blocks.map( b => {
            const arr = []
            const block = loadMatrix128(b)[0]
    
            // run through S box
            for(let i = 0; i < 4; i++)
            {
                arr[i] = block[i]
                for(let j = 0; j < 4; j++)
                {
                    arr[i][j] = S[arr[i][j]]
                }            
            }
    
            // diffusion
            for(let i = 1; i < 4; i++)
            {
                const row = []
                for(let j = 0; j < 4; j++)
                {
                    row[(j + 4 - i) % 4] = arr[j][i]
                }
                row.map( (v, k) => {
                    arr[k][i] = v
                })  
            }
    
            // mix column 
            if(!last)
            {
                const mCon = [ [0x02, 0x03, 0x01, 0x01],
                                [0x01, 0x02, 0x03, 0x01],
                                [0x01, 0x01, 0x02, 0x03],
                                [0x03, 0x01, 0x01, 0x02]]
    
                for(let i = 0; i < 4;i++)
                {
                    const newRow = []
                    mCon.map( (row, j) => {
                        const values = []
                        row.map((v, k) => {
                            if(v === 0x01)
                            {
                                values[k] = arr[i][k]
                                return
                            }
                            const mod = (arr[i][k] & 0x80) === 0x80
                            values[k] = mod ? ((arr[i][k] << 1 & 0xff) ^ 0x1b) ^ (arr[i][k] * (v & 0x01)) : (arr[i][k] << 1 & 0xff) ^ (arr[i][k] * (v & 0x01))
                        })
                        newRow[j] = values[0] ^ values[1] ^ values[2] ^ values[3]
                    })
                    newRow.map( (v, k) => {
                        arr[i][k] = v
                    })
                }
            }
    
            // xor with round key
            for(let i = 0; i < 4; i++)
            {
                arr[i] = xorBytes(arr[i], key[i])
            }
    
            return arr
        })
    
        return res
    }
    
    const roundi = (blocks, key, last=false) => {
        const res = blocks.map( block => {
            // xor with roundKey
            let arr = block.map( (buf, i) => xorBytes(buf, key[i]))
    
            // mixColumn
            if(!last)
            {
                const miCon = [ [0x0e, 0x0b, 0x0d, 0x09],
                                [0x09, 0x0e, 0x0b, 0x0d],
                                [0x0d, 0x09, 0x0e, 0x0b],
                                [0x0b, 0x0d, 0x09, 0x0e]]
    
                for(let i = 0; i < 4;i++)
                {
                    const newRow = []
                    miCon.map( (row, j) => {
                        const values = []
                        const multiply2 = (byte, rep=1) => {
                            let newVal = byte
                            for(let i = 0; i < rep; i++)
                            {
                                const mod = (newVal & 0x80) === 0x80
                                newVal = mod ? newVal << 1 & 0xff ^ 0x1b : newVal << 1 & 0xff
                            }
                            return newVal
                        }
                        row.map((v, k) => {
                            if(v === 0x09)
                            {
                                values[k] = multiply2(arr[i][k], 3) ^ arr[i][k]
                            }
                            else if(v === 0x0b)
                            {
                                values[k] = multiply2(multiply2(arr[i][k], 2) ^ arr[i][k]) ^ arr[i][k]
                            }
                            else if(v === 0x0d)
                            {
                                values[k] = multiply2((multiply2(arr[i][k]) ^ arr[i][k]), 2) ^ arr[i][k]
                            }
                            else
                            {
                                values[k] = multiply2(multiply2((multiply2(arr[i][k]) ^ arr[i][k])) ^ arr[i][k])
                            }
                        })
                        newRow[j] = values[0] ^ values[1] ^ values[2] ^ values[3]
                    })
                    newRow.map( (v, k) => {
                        arr[i][k] = v
                    })
                }
            }
    
            // diffusion
            for(let i = 1; i < 4; i++)
            {
                const row = []
                for(let j = 0; j < 4; j++)
                {
                    row[(j + i) % 4] = arr[j][i]
                }
                row.map( (v, k) => {
                    arr[k][i] = v
                })  
            }
    
            // run through inverse S-box
            for(let i = 0; i < arr.length; i++)
            {
                for(let j = 0; j < 4; j++)
                {
                    arr[i][j] = Si[arr[i][j]]
                }
            }
            
            return arr
        })
    
        return res
    }
    
    const encrypt = (plaintext, key, num) => {
        const blocks = makeBlocks(Buffer.from(plaintext))
        const keyBytes = Buffer.from(key)
        const roundKeys = expandKey(keyBytes, num)
        const firstKey = loadMatrix128(keyBytes)
    
        // first round
        let res = blocks.map( b => {
            const block = loadMatrix128(b)
            const arr = []
            for(let i = 0; i < 4; i++)
            {
                arr[i] = xorBytes(block[i], firstKey[i])
            }
            return arr
        })
    
        // intermediate rounds
        for(let i = 0; i < num; i++)
        {
            const last = i == num - 1 
            res = round(res, roundKeys[i], last)
        }
    
        return unBlock(res).toString('hex')
    }
    
    const decrypt = (ciphertext, key, num) => {
        const blocks = makeBlocks(Buffer.from(ciphertext, 'hex'))
        const keyBytes = Buffer.from(key)
        const roundKeys = expandKey(keyBytes, num)
        const firstKey = loadMatrix128(keyBytes)
    
        let res = blocks.map( b => {
            return loadMatrix128(b)
        })
        
        // inverse intermediate rounds
        for(let i = num - 1; i >= 0; i--)
        {
            const last = i == num -1
            res = roundi(res, roundKeys[i], last)
        }
    
        // inverse first round
        res = res.map( block => {
            const arr = []
            for(let i = 0; i < 4; i++)
            {
                arr[i] = xorBytes(block[i], firstKey[i])
            }
            return arr
        })

        const r = unBlock(res)
        const i = r.indexOf(0x00)
    
        return i == -1 ? r.toString() : r.slice(0, i).toString()
    }

    this.encrypt = () => {
        const { k, p, errors } = this.getAttr("k", "p", "errors")
        if(errors.length == 0) this.setC(encrypt(p, k, rounds))

        return this.getAttr("p", "c", "errors")
    }

    this.decrypt = () => {
        const { k, c, errors } = this.getAttr("k", "c", "errors")
        if(errors.length == 0) this.setP(decrypt(c, k, rounds))

        return this.getAttr("p", "c", "errors")
    }
}

module.exports = { rijndael }