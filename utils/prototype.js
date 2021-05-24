const { check } = require("../utils/typechecks")

function cipher(plaintext, ciphertext, options, keycheck)
{
    const attr = {
        "k": "",
        "p": "",
        "c": "",
        "errors": []
    }

    const isValidString = check("str", { msg: "invalid input"})
    const setAttr  = (para, arg, func) => {
        try
        {
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

    this.kIsValid = () => { 
        checkAttr("k", keycheck) 
    }
    this.pIsValid = () => { 
        checkAttr("p", isValidString) 
    }
    this.cIsValid = () => { 
        checkAttr("c", isValidString) 
    }
    
    this.setK = v => { 
        setAttr("k", v, keycheck) 
        return attr.k
    }
    this.setP = v => { 
        setAttr("p", v, isValidString) 
        return attr.p
    }
    this.setC = v => { 
        setAttr("c", v, isValidString)  
        return attr.c
    }

    this.setK(options.key)
    this.setP(plaintext)
    this.setC(ciphertext)
}

module.exports = cipher