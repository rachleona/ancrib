const info =  require("../info.json")
const { check } = require("../utils/typechecks")
const protocipher = require("../utils/prototype")

function caesar(plaintext, ciphertext, options) 
{

    const isValidKey = check(info.caesar.pure.keyType)
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
        attr.c = cipher(attr.k, attr.p.split(""))
        return attr.c
    }

    this.decrypt = () => {
        attr.p = cipher(26 - attr.k, attr.c.split(""))
        return attr.p
    }
}

module.exports = { caesar }