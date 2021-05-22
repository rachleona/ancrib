const info = require("../info.json")
const { check } = require("../utils/typechecks")

const isValidString = check("str")

function columnar(plaintext, ciphertext, options)
{
    const isValidKey = check(info.columnar.pure.keyType, { "unique": true })
    protocipher.call(this, plaintext, ciphertext, options, isValidKey)

    const encrypt = (k, len, text) => {
        const clen = text.length
        const padded = text + "X".repeat(len - text.length % len)

        const chars = Array(clen / len)
        .fill(0)
        .map( (v, i) => {
            const l = len * i
            return padded.slice(l, l + len )
        })
        
        const res = chars.map( v => {
            return k.reduce((str, i) => {
                return str + v[i]
            }, "")
        })

        return Array(len)
        .fill("")
        .map( (v, i) => {
            return res.reduce( (str, e) => {
                return str + e[i]
            }, "")
        }).join("")
    }

    const decrypt = (k, len, text) => {
        const clen = text.length
        const rlen = clen / len

        const chars = Array(rlen)
        .fill(0)
        .map( (v, i) => {
            return Array(len)
            .fill("")
            .reduce( (str, e, n) => {
                return str + text[i + n * rlen]
            }, "")
        })

        const res = chars.map( (v) => {
            return k.reduce( (str, e, n, a) => {
                return str + v[a.indexOf(n)]
            }, "")
        })

        return res.join("")
    }


    this.encrypt = () => {
        this.c = encrypt(this.k, this.len, this.p)
        return this.c
    }

    this.decrypt = () => {
        this.p = decrypt(this.k, this.len, this.c)
        return this.p
    }
}

function scytale(plaintext, ciphertext, options)
{
    const isValidKey = check(info.columnar.scytale.keyType)
    protocipher.call(this, plaintext, ciphertext, options, isValidKey)

    const encrypt = (k, chars) => {
        
        const len = chars.length / k
    
        return Array(k)
        .fill(0)
        .map( (v, i) => {
            return Array(len)
            .fill("")
            .reduce( (str, e, n) => {
                return str + chars[n * k + i]
            }, "")
        }).reduce( (a, v) => {
            return [...a, ...v]
        }, [])
    }
    
    const decrypt = (k, chars) => {
    
        const len = chars.length / k
    
        return Array(len)
        .fill(0)
        .map( (v, i) => {
            return Array(k)
            .fill("")
            .reduce( (str, e, n) => {
                return str + chars[n * len + i]
            }, "")
        }).reduce( (a, v) => {
            return [...a, ...v]
        }, [])
    }    

    this.encrypt = () => {
        this.c = encrypt(this.k, this.p)
        return this.c
    }

    this.decrypt = () => {
        this.p = decrypt(this.k, this.c)
    }

}

module.exports = { columnar, scytale }