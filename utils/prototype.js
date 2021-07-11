const { check } = require("../utils/typechecks")

function cipher(plaintext, ciphertext, key, info)
{
    const attr = {
        "k": "",
        "p": "",
        "c": "",
        "errors": []
    }

    const isValidString = check("str", { msg: "invalid input", misc: {} })
    const setAttr  = (para, arg, func, enc='utf8') => {
        try
        {
            attr.errors = attr.errors.filter( v => v.code != "INPUT_TYPE_ERROR" || v.para != para )
            func(arg, para, enc)
            attr[para] = arg
        }
        catch(err)
        {
            attr[para] = ""
            attr.errors.push(err)
        }
    }

    const checkAttr = (para, func, enc='utf8') => {
        try
        {
            attr.errors = attr.errors.filter( v => v.code != "INPUT_TYPE_ERROR" || v.para != para )
            func(attr[para], para, enc)
            return true
        }
        catch(err)
        {
            attr.errors.push(err)
            return false
        }
    }

    this.getAttr = (...para) => {
        const res = {}
        para.forEach( v => {
            if(attr[v] !== undefined)
            {
                res[v] = attr[v]
            }
        })
        return res
    }

    if(info.key)
    {
        const keycheck = check(info.keyType, {
            msg: info.msg,
            misc: info.keyMisc
        })

        this.kIsValid = (e='utf8') => { 
            checkAttr("k", keycheck, e) 
        }
        this.setK = (v, e='utf8') => { 
            setAttr("k", v, keycheck, e) 
            return attr.k
        }
        this.setK(key)
    }

    
    this.pIsValid = () => { 
        checkAttr("p", isValidString) 
    }
    this.cIsValid = () => { 
        checkAttr("c", isValidString) 
    }
    
    this.setP = v => { 
        setAttr("p", v, isValidString) 
        return attr.p
    }
    this.setC = v => { 
        setAttr("c", v, isValidString)  
        return attr.c
    }

    this.setP(plaintext)
    this.setC(ciphertext)
}

module.exports = cipher