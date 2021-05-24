const { check } = require("../utils/typechecks")

export default function cipher(plaintext, ciphertext, options, keycheck)
{
    let errors = []
    const attr = {
        "k": "",
        "p": "",
        "c": ""
    }

    const isValidString = check("str", { msg: "invalid input"})
    const setAttr  = (para, arg, func) => {
        try
        {
            func(arg)
            attr[para] = arg
        }
        catch(err)
        {
            attr[para] = ""
            errors.push(err)
        }

        return attr[para]
    }

    const checkAttr = (para, func) => {
        try
        {
            func(attr[para])
            errors = errors.filter( v => v.code != "INPUT_TYPE_ERROR" || v.para != para )
            return true
        }
        catch(err)
        {
            errors.push(err)
            return false
        }
    }

    this.kIsValid = () => { checkAttr("k", keycheck) }
    this.pIsValid = () => { checkAttr("p", isValidString) }
    this.cIsValid = () => { checkAttr("c", isValidString) }
    
    this.setK = v => { setAttr("k", v, keycheck) }
    this.setP = v => { setAttr("p", v, isValidString) }
    this.setC = v => { setAttr("c", v, isValidString) }

    this.setK(options.key)
    this.setP(plaintext)
    this.setC(ciphertext)
}