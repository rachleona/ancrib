const { typeError } = require('./errors')
const { rsaKeyPair, enigmaSetup } = require('./keyclasses')

//TODO error messages
//TODO string size checks
const check = (type, options={ msg: "" }) => {
    let comp = true

    switch(type)
    {
        case "rsa":
            comp = v => !v instanceof rsaKeyPair || rsaKeyPair.size != size
            break
        case "enm":
            comp = v => !v instanceof enigmaSetup
            break
        case "int":
            comp = v => typeof v != "number" || !Number.isInteger(v)
            break
        case "str":
            comp = v => typeof v != "string" //|| v.length != size
            break
        default: 
        comp = v => typeof v != type
    }

    return (v, para) => { 
        if(comp(v)) throw new typeError(options.msg, type, para)
    }
}

module.exports = { check }