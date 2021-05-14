const bigInt = require('big-integer')
const random = require('random-bigint')

const gcd = (x, y) => {
    const a = bigInt(x)
    const b = bigInt(y)
    if(a.eq(0) || a.eq(b)) return b
    if(b.eq(0)) return a

    let larger, smaller

    if(a.greater(b))
    {
        larger = a
        smaller = b
    }
    else
    {
        larger = b
        smaller = a
    }

    const r =  larger.mod(smaller)

    return gcd(smaller, r)
}

const lcm = (x, y) => {
    const a = bigInt(x)
    const b = bigInt(y)
    const d = gcd(a, b)
    return a.divide(d).multiply(b)
}

const hugeRandom = size => {
    const m = size % 128
    let p = 0
    let res = bigInt.zero
    for(let s = size; s >= 128; s -= 128)
    {
        res = bigInt(random(128)).multiply(bigInt(2).pow(p * 128)).add(res)
        p++
    }
    return bigInt(random(m)).multiply(bigInt(2).pow(p * 128)).add(res)
}

const isPrimeMR = (num, r) => {
    const w = bigInt(num)
    let m = w.subtract(1)
    let a = bigInt.zero
    while(m.mod(2) == 0)
    {
        a.add(1)
        m = m.divide(2)
    }

    const len = w.bitLength()
    let res = true
    
    for(let i = 0; i < r; i++)
    {
        let b = hugeRandom(len)
        while (b.leq(1) || w.subtract(1).leq(b) ) b = hugeRandom(len)
        if(!millerRabin(w, m, a, b))
        {
            res = false
            break
        }
    }

    return res
}

const millerRabin = (w, m, a, b) => {
    let z = b.modPow(m, w)
    if(z.eq(1) || w.subtract(1).eq(z)) return true
    let res = false
    for(let j = 1; j < a; j++)
    {
        z = z.modPow(2, w)

        if(z.eq(1)) 
        {
            break
        }

        if(w.subtract(1).eq(z)){
            res = true
            break
        } 
            
    }
    return res
}

const diff = (x, y) => {
    const a = bigInt(x)
    const b = bigInt(y)
    if(a.greater(b)) return a.subtract(b)
    return b.subtract(a)
}

const generatePrimesRSA = nlen => {
    // const secData = {
    //     2048: {
    //         strength: 112,
    //         rounds: 4
    //     },
    //     3072: {
    //         strength: 128,
    //         rounds: 3
    //     }
    // }
    const e = bigInt(65537)
    const l = nlen / 2

    //const strength = secData[nlen].strength
    const randomGen = len => {
        let r = hugeRandom(len)
        if(r.mod(2) == 0) r = r.add(1)
        return r
    }
    const lowerBound = bigInt(2).pow(l - 1).multiply(bigInt(Math.sqrt(2) * 10000000000000000).subtract(1)).divide(10000000000000000)

    // generate p
    let p
    for(let i = 0; i < 5 * l; i++)
    {
        p = randomGen(l)
        while(p.lesser(lowerBound)) 
        { 
            p = randomGen(l)
        }
        if(gcd(p.subtract(1), e).eq(1))
        {
            if(isPrimeMR(p, /*secData[nlen].rounds*/ 3))
            {
                break
            }
        }
        if(i == 5 * l - 1) return false
    }

    // generate q
    let q
    for(let i = 0; i < 5 * l; i++)
    {
        q = randomGen(l)
        while(q.lesser(lowerBound) || diff(p, q).leq(bigInt(2).pow(l - 100))) q = randomGen(l)
        if(gcd(q.subtract(1), e).eq(1))
        {
            if(isPrimeMR(q, /*secData[nlen].rounds*/ 3))
            {
                break
            }
        }
        if(i == 5 * l - 1) return false
    }

    return {p, q}
}

const makeBlocks = (bytes, size=16) => {
    let blocks = []
    for(let i = 0; i < bytes.length; i += size)
    {
        let data = Buffer.alloc(size)
        bytes.copy(data, 0, i)
        blocks.push(data)
    }

    return blocks
}

module.exports = { gcd, lcm, generatePrimesRSA, makeBlocks }