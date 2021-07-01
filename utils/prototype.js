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
    const setAttr  = (para, arg, func) => {
        try
        {
            attr.errors = attr.errors.filter( v => v.code != "INPUT_TYPE_ERROR" || v.para != para )
            func(arg, para)
            attr[para] = arg
        }
        catch(err)
        {
            attr[para] = ""
            attr.errors.push(err)
        }
    }

    const checkAttr = (para, func) => {
        try
        {
            attr.errors = attr.errors.filter( v => v.code != "INPUT_TYPE_ERROR" || v.para != para )
            func(attr[para], para)
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

        this.kIsValid = () => { 
            checkAttr("k", keycheck) 
        }
        this.setK = v => { 
            setAttr("k", v, keycheck) 
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