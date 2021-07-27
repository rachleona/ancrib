const info = require("../info.json")
const protocipher = require("../utils/prototype")

function vernam(plaintext, ciphertext, options) {
  const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
  protocipher.call(
    this,
    plaintext,
    ciphertext,
    options.key,
    info.vernam.modes.pure
  )

  const cipher = (plaintext, key, rev = false) => {
    //todo key with invalid characters
    const chars = plaintext.split("")
    const inverseKey = (k) =>
      k
        .toUpperCase()
        .split("")
        .map((c) => String.fromCharCode(((91 - c.charCodeAt(0)) % 26) + 65))
    const keys = rev
      ? inverseKey(key).filter((v) => alphabets.includes(v))
      : key
          .toUpperCase()
          .split("")
          .filter((v) => alphabets.includes(v))
    let counter = 0

    const ciphertext = chars.map((c, i) => {
      if (keys.length <= i - counter) return c
      const k = keys[i - counter].charCodeAt(0) - 65
      const char = c.charCodeAt(0)

      if (char > 64 && char < 91) {
        return String.fromCharCode(65 + (((char + k) % 65) % 26))
      } else if (char > 96 && char < 123) {
        return String.fromCharCode(97 + (((char + k) % 97) % 26))
      } else {
        counter++
        return String.fromCharCode(char)
      }
    })

    return ciphertext.join("")
  }

  this.encrypt = () => {
    const { k, p, errors } = this.getAttr("k", "p", "errors")
    if (errors.length == 0) this.setC(cipher(p, k))

    return this.getAttr("p", "c", "errors")
  }

  this.decrypt = () => {
    const { k, c, errors } = this.getAttr("k", "c", "errors")
    if (errors.length == 0) this.setP(cipher(c, k, true))
    return this.getAttr("p", "c", "errors")
  }
}

module.exports = { vernam }
