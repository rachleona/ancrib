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
      comp = (v) => {
        try {
          const n = parseFloat(v)
          let res = typeof n == "number" && Number.isInteger(n)
          res = res && (!options.range || (n <= options.range.max && n >= options.range.min ))
          return !res
        }
        catch(e) {
          return true
        }
      }
      break
    case "str":
      comp = (v, enc = "utf8") => {
        let res = typeof v == "string" || v instanceof Buffer
        if (!res) return true
        try
        {
          const buf = Buffer.from(v, enc)
          if(buf.length === 0 && v.length !== 0) throw "error"
  
          // no duplicate characters?
          res =
            res && (!options.misc.unique || new Set(v.split("")).size == v.length)
  
          // string length check based on bit length
          res =
            res &&
            (!options.misc.len ||
              (buf.length * 8 >= options.misc.len.min &&
                buf.length * 8 <= options.misc.len.max))
          
          // regexp check
          res = res && (!options.misc.re || v.match(options.misc.re))
          return !res
        } catch(err) {
          return true
        }
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
