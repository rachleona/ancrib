const { typeError } = require("./errors")
const { rsaKeyPair, enigmaSetup } = require("./keyclasses")

const check = (type, options = { msg: "error", misc: {} }) => {
  let comp = true

  // functions will return true for invalid keys
  switch (type) {
    case "rsa":
      comp = (v) => !(v instanceof rsaKeyPair) || rsaKeyPair.size != size
      break
    case "enm":
      comp = (v) => !(v instanceof enigmaSetup)
      break
    case "int":
      comp = (v) => typeof v != "number" || !Number.isInteger(v)
      break
    case "str":
      comp = (v, enc = "utf8") => {
        let res = typeof v == "string" || v instanceof Buffer
        if (!res) return true
        const buf = Buffer.from(v, enc)
        res =
          res && (!options.misc.unique || new Set(v.split("")).size == v.length)
        res =
          res &&
          (!options.misc.len ||
            (buf.length * 8 >= options.misc.len.min &&
              buf.length * 8 <= options.misc.len.max))
        return !res
      }
      break
    default:
      comp = (v) => typeof v != type
  }

  return (v, para, e = "utf8") => {
    if (comp(v, e)) throw new typeError(options.msg, type, para)
  }
}

module.exports = { check }
