const info = require("../info.json")
const protocipher = require("../utils/prototype")

function caesar(plaintext, ciphertext, options) {
  protocipher.call(
    this,
    plaintext,
    ciphertext,
    options.key,
    info.caesar.modes.pure
  )

  const cipher = (key, chars) => {
    const k = parseInt(key)
    return chars.map((a) => {
      const char = a.charCodeAt(0)
      if (char > 64 && char < 91) {
        return String.fromCharCode(65 + (((char + k) % 65) % 26))
      }

      if (char > 96 && char < 123) {
        return String.fromCharCode(97 + (((char + k) % 97) % 26))
      }

      return String.fromCharCode(char)
    })
  }

  this.encrypt = () => {
    const { k, p, errors } = this.getAttr("k", "p", "errors")
    if (errors.length == 0) this.setC(cipher(k, p.split("")).join(""))

    return this.getAttr("p", "c", "errors")
  }

  this.decrypt = () => {
    const { k, c, errors } = this.getAttr("k", "c", "errors")
    if (errors.length == 0) this.setP(cipher(26 - k % 26, c.split("")).join(""))
    return this.getAttr("p", "c", "errors")
  }
}

module.exports = { caesar }
