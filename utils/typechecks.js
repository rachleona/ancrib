const { typeError } = require('./errors')
const { rsaKeyPair, enigmaSetup } = require('./keyclasses')

//TODO error messages
//TODO string size checks
const check = (type, options={ msg: "error", misc: {} }) => {
    let comp = true

    switch(type)
    {
        case "rsa":
            comp = v => !(v instanceof rsaKeyPair) || rsaKeyPair.size != size
            break
        case "enm":
            comp = v => !(v instanceof enigmaSetup)
            break
        case "int":
            comp = v => typeof v != "number" || !Number.isInteger(v)
            break
        case "str":
            comp = v => {
                let res = typeof v == "string"
                if (!res) return true
                const buf = Buffer.from(v)
                res = res && (!options.misc.unique || (new Set(v.split("")).size == v.length))
                res = res && (!options.misc.len || (buf.length * 8 >= options.misc.len.min && buf.length * 8 <= options.misc.len.max))
                return !res
            }
            break
        default: 
            comp = v => typeof v != type
    }

    return (v, para) => { 
        if(comp(v)) throw new typeError(options.msg, type, para)
    }
}

module.exports = { check }