const info =  require("../info.json")
const { check } = require("../utils/typechecks")
const protocipher = require("../utils/prototype")

function caesar(plaintext, ciphertext, options) 
{

    const isValidKey = check(info.caesar.modes.pure.keyType)
    protocipher.call(this, plaintext, ciphertext, options, isValidKey)

    const cipher = (k, chars) => {
        return chars.map( a => {
            const char = a.charCodeAt(0)
            if(char > 64 && char < 91)
            {
                return String.fromCharCode(65 + (char + k) % 65 % 26)
            }

            if(char > 96 && char < 123)
            {
                return String.fromCharCode(97 + (char + k) % 97 % 26)
            }

            return String.fromCharCode(char).join("")
        })
    }

    this.encrypt = () => {
        const { k, p } = this.getAttr("k", "p")
        this.setC(cipher(k, p.split("")).join(""))
        return this.getAttr("p", "c", "errors")
    }

    this.decrypt = () => {
        const { k, c } = this.getAttr("k", "c")
        this.setP(cipher(26 - k, c.split("")).join(""))
        return this.getAttr("p", "c", "errors")
    }
}

module.exports = { caesar }