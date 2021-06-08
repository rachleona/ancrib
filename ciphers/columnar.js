const info = require("../info.json")
const { check } = require("../utils/typechecks")
const protocipher = require("../utils/prototype")

function columnar(plaintext, ciphertext, options)
{
    const isValidKey = check(info.columnar.modes.pure.keyType, { "unique": true })
    protocipher.call(this, plaintext, ciphertext, options.key, isValidKey)

    const encrypt = (key, len, text) => {
        const k = key.split("").sort().map( v => key.indexOf(v) )
        const padded = text.padEnd(Math.ceil(text.length / len) * len, " ")
        const clen = padded.length

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

    const decrypt = (key, len, text) => {
        const k = key.split("").sort().map( v => key.indexOf(v) )
        const padded = text.padEnd(Math.ceil(text.length / len) * len, " ")
        const clen = padded.length
        const rlen = clen / len

        const chars = Array(rlen)
        .fill(0)
        .map( (v, i) => {
            return Array(len)
            .fill("")
            .reduce( (str, e, n) => {
                return str + padded[i + n * rlen]
            }, "")
        })

        const res = chars.map( (v) => {
            return k.reduce( (str, e, n, a) => {
                return str + v[a.indexOf(n)]
            }, "")
        })

        return res.join("").trimEnd()
    }


    this.encrypt = () => {
        const { k, p, errors } = this.getAttr("k", "p", "errors")

        if(errors.length == 0) this.setC(encrypt(k, k.length, p))
        return this.getAttr("c", "p", "errors")
    }

    this.decrypt = () => {
        const { k, c, errors } = this.getAttr("k", "c", "errors")
        
        if(errors.length == 0) this.setP(decrypt(k, k.length, c))
        return this.getAttr("c", "p", "errors")
    }
}

function scytale(plaintext, ciphertext, options)
{
    const isValidKey = check(info.columnar.modes.scytale.keyType)
    protocipher.call(this, plaintext, ciphertext, options.key, isValidKey)

    const encrypt = (k, text) => {
        const chars = text.padEnd(Math.ceil(text.length / k) * k, " ")
        const len = Math.ceil(chars.length / k)
    
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
        }, []).join("")
    }
    
    const decrypt = (k, chars) => {
    
        const len = Math.ceil(chars.length / k)
    
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
        }, []).join("").trimEnd()
    }    

    this.encrypt = () => {
        const { k, p, errors } = this.getAttr("k", "p", "errors")

        if(errors.length == 0) this.setC(encrypt(k, p))
        return this.getAttr("c", "p", "errors")
    }

    this.decrypt = () => {
        const { k, c, errors } = this.getAttr("k", "c", "errors")

        if(errors.length == 0) this.setP(decrypt(k, c))
        return this.getAttr("c", "p", "errors")
    }

}

module.exports = { columnar, scytale }