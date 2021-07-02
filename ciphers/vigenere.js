const info =  require("../info.json")
const protocipher = require("../utils/prototype")

function vigenere(plaintext, ciphertext, options)
{
    protocipher.call(this, plaintext, ciphertext, options.key, info.vigenere.modes.pure)

    const encrypt = (plaintext, key) => {
        const chars = plaintext.split("")
        const keys = key.toUpperCase().split("")
        const keylen = key.length
        let counter = 0
    
        const ciphertext = chars.map( (c, i) => {
            const k = keys[(i - counter) % keylen].charCodeAt(0) - 65
            const char = c.charCodeAt(0)
            
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + (char + k) % 65 % 26)
            }
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + (char + k) % 97 % 26)
            }
            else
            {
                counter++
                return String.fromCharCode(char)
            }
        })
    
        return ciphertext.join("")
    }

    const decrypt = (ciphertext, key) => {
        const inverseKey = key.toUpperCase().split("").map( c => String.fromCharCode((91 - c.charCodeAt(0)) % 26 + 65 )).join("")
        return encrypt(ciphertext, inverseKey)
    }

    this.encrypt = () => {
        const { k, p, errors } = this.getAttr("k", "p", "errors")

        if(errors.length == 0) this.setC(encrypt(p, k))
        return this.getAttr("c", "p", "errors")
    }

    this.decrypt = () => {
        const { k, c, errors } = this.getAttr("k", "c", "errors")
        
        if(errors.length == 0) this.setP(decrypt(c, k))
        return this.getAttr("c", "p", "errors")
    }
}

function autokey(plaintext, ciphertext, options)
{
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
    protocipher.call(this, plaintext, ciphertext, options.key, info.vigenere.modes.autokey)

    const encrypt = (plaintext, key) => {
        const chars = plaintext.split("")
        const keys = key.padEnd(chars.length, plaintext).toUpperCase().split("").filter( v => alphabets.includes(v) )
        let counter = 0
    
        const ciphertext = chars.map( (c, i) => {
            const k = keys[i - counter].charCodeAt(0) - 65
            const char = c.charCodeAt(0)
            
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + (char + k) % 65 % 26)
            }
            else if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + (char + k) % 97 % 26)
            }
            else
            {
                counter++
                return String.fromCharCode(char)
            }
        })
    
        return ciphertext.join("")
    }

    const decrypt = (ciphertext, key) => {
        const inverseKey = k => k.toUpperCase().split("").map( c => String.fromCharCode((91 - c.charCodeAt(0)) % 26 + 65 ))
        const chars = ciphertext.split("")
        const keys = inverseKey(key)

        let counter = 0
    
        const plaintext = chars.map( (c, i) => {
            const k = keys[i - counter].charCodeAt(0) - 65
            const char = c.charCodeAt(0)
            
            if(char > 64 && char < 91)
            {
                const r = String.fromCharCode(65 + (char + k) % 65 % 26)
                keys.push(...inverseKey(r))
                return r
            }
            else if(char > 96 && char < 123)
            {
                const r = String.fromCharCode(97 + (char + k) % 97 % 26)
                keys.push(...inverseKey(r.toUpperCase()))
                return r
            }
            else
            {
                counter++
                return String.fromCharCode(char)
            }
        })

        return plaintext.join("")
    }

    this.encrypt = () => {
        const { k, p, errors } = this.getAttr("k", "p", "errors")

        if(errors.length == 0) this.setC(encrypt(p, k))
        return this.getAttr("c", "p", "errors")
    }

    this.decrypt = () => {
        const { k, c, errors } = this.getAttr("k", "c", "errors")
        
        if(errors.length == 0) this.setP(decrypt(c, k))
        return this.getAttr("c", "p", "errors")
    }
}

module.exports = { vigenere, autokey }