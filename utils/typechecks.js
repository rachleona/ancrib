const { typeError } = require('./errors')
const { rsaKeyPair, enigmaSetup } = require('./keyclasses')

//TODO error messages
//TODO string size checks
const check = (type, options={ msg: "" }) => {
    let comp = true
    switch(type)
    {
        case "rsa":
            comp = !v instanceof rsaKeyPair || rsaKeyPair.size != size
            break
        case "enm":
            comp = !v instanceof enigmaSetup
            break
        case "int":
            comp = typeof v != "number" || !Number.isInteger(v)
            break
        case "str":
            comp = typeof v != "string" || v.length != size
            break
        default: 
            comp = typeof v != type
    }
    return v => { 
        if(comp) throw typeError(msg, type)
    }
}

module.exports = { check }