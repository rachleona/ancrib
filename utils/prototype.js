const { check } = require("../utils/typechecks")

export default function cipher(plaintext, ciphertext, options, keycheck)
{
    this.errors = []

    const isValidString = check("str", { msg: "invalid input"})
    const setAttr  = (para, arg, func) => {
        try
        {
            func(arg)
            this[para] = arg
        }
        catch(err)
        {
            this[para] = ""
            this.errors.push(err)
        }
    }

    const checkAttr = (para, func) => {
        try
        {
            func(this[para])
            this.errors = this.errors.filter( v => v.code != "INPUT_TYPE_ERROR" || v.para != para )
            return true
        }
        catch(err)
        {
            this.errors.push(err)
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