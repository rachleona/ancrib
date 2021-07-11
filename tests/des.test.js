const { lucifer, triple } = require('../ciphers/des')
const { typeError } = require("../utils/errors")

test("lucifer class is defined and has correct values",  () => {
    const myDES = new lucifer("abcde", "", { key: "SOME KEY" })

    expect(myDES).toBeDefined()
    expect(myDES.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "SOME KEY",
        "p": "abcde"
    })
})

test("handles non-string/incorrect length keys correctly by pushing typeError with correct data into errors error", () => {
    const myDES = new lucifer("abcde", "", { key: 567 })
    myDES.setK(3) 
    const e =  myDES.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")

    myDES.setK("somestr") 
    const f =  myDES.getAttr("errors").errors
   
    expect(f[f.length - 1]).toBeInstanceOf(typeError)
    expect(f[f.length - 1].para).toBe("k")
    
    myDES.setK("1234567890abcdef", "hex")
    expect(myDES.getAttr("errors").errors.length).toBe(0)
})

test("encrypt method works correctly", () => {
    const myDES = new lucifer("ATTACK AT DAWN!", "", { key: "SOME KEY" })
    expect(myDES.encrypt()).toStrictEqual({
        "c": "47ba168b0f0621151f6bf5850009ad7e",
        "p": "ATTACK AT DAWN!",
        "errors": []
    })

    myDES.setP("")
    expect(myDES.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myDES.setP("01a1d6d039776742")
    myDES.setK("7ca110454a1a6e57", "hex")
    expect(myDES.encrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "690f5b0d9a26939b",
        "p": "01a1d6d039776742",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myDES = new lucifer("305532286d6f295a", "a", { key: 1234567890 })
    const res = myDES.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("305532286d6f295a")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myDES.setK("1c587f1c13924fef", "hex")
    expect(myDES.encrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "63fac0d034d9f793",
        "p": "305532286d6f295a",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myDES = new lucifer("", "47ba168b0f0621151f6bf5850009ad7e", { key: "SOME KEY" })
    expect(myDES.decrypt()).toStrictEqual({
        "c": "47ba168b0f0621151f6bf5850009ad7e",
        "p": "ATTACK AT DAWN!",
        "errors": []
    })

    myDES.setC("")
    expect(myDES.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myDES.setC("690f5b0d9a26939b")
    myDES.setK("7ca110454a1a6e57", "hex")
    expect(myDES.decrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "690f5b0d9a26939b",
        "p": "01a1d6d039776742",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myDES = new lucifer("abc", "63fac0d034d9f793", { key: 1234567890 })
    const res = myDES.decrypt()
    expect(res.c).toBe("63fac0d034d9f793")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myDES.setK("1c587f1c13924fef", "hex")
    expect(myDES.decrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "63fac0d034d9f793",
        "p": "305532286d6f295a",
        "errors": []
    })
})

//todo triple tests

test("triple class is defined and has correct values",  () => {
    const myDES = new triple("abcde", "", { key: "SOME 128 BIT KEY" })

    expect(myDES).toBeDefined()
    expect(myDES.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "SOME 128 BIT KEY",
        "p": "abcde"
    })
})

test("handles non-string/incorrect length keys correctly by pushing typeError with correct data into errors error", () => {
    const myDES = new triple("abcde", "", { key: 567 })
    myDES.setK(3) 
    const e =  myDES.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")

    myDES.setK("somestr") 
    const f =  myDES.getAttr("errors").errors
   
    expect(f[f.length - 1]).toBeInstanceOf(typeError)
    expect(f[f.length - 1].para).toBe("k")

    myDES.setK("1234567890abcdef1234567890abcdef", "hex")
    expect(myDES.getAttr("errors").errors.length).toBe(0)
})

test("encrypt method works correctly", () => {
    const myDES = new triple("ATTACK AT DAWN!", "", { key: "SOME 128 BIT KEY" })
    expect(myDES.encrypt()).toStrictEqual({
        "c": "6755ebb40ff71b95c3d7215154744836",
        "p": "ATTACK AT DAWN!",
        "errors": []
    })

    myDES.setP("")
    expect(myDES.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myDES.setP("01a1d6d0397767425cd54ca83def57da")
    myDES.setK("7ca110454a1a6e570131d9619dc1376e", "hex")
    expect(myDES.encrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "b76fab4fbdbdb76700fc5e0f15ad8a43",
        "p": "01a1d6d0397767425cd54ca83def57da",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myDES = new triple("305532286d6f295a1d9d5c5018f728c2", "a", { key: 1234567890 })
    const res = myDES.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("305532286d6f295a1d9d5c5018f728c2")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myDES.setK("1c587f1c13924fef018310dc409b26d6", "hex")
    expect(myDES.encrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "757251a1099ca6fdef8947415754480c",
        "p": "305532286d6f295a1d9d5c5018f728c2",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myDES = new triple("", "6755ebb40ff71b95c3d7215154744836", { key: "SOME 128 BIT KEY" })
    expect(myDES.decrypt()).toStrictEqual({
        "c": "6755ebb40ff71b95c3d7215154744836",
        "p": "ATTACK AT DAWN!",
        "errors": []
    })

    myDES.setC("")
    expect(myDES.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myDES.setC("b76fab4fbdbdb76700fc5e0f15ad8a43")
    myDES.setK("7ca110454a1a6e570131d9619dc1376e", "hex")
    expect(myDES.decrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "b76fab4fbdbdb76700fc5e0f15ad8a43",
        "p": "01a1d6d0397767425cd54ca83def57da",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myDES = new triple("abc", "757251a1099ca6fdef8947415754480c", { key: 1234567890 })
    const res = myDES.decrypt()
    expect(res.c).toBe("757251a1099ca6fdef8947415754480c")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myDES.setK("1c587f1c13924fef018310dc409b26d6", "hex")
    expect(myDES.decrypt('hex', 'hex', 'hex')).toStrictEqual({
        "c": "757251a1099ca6fdef8947415754480c",
        "p": "305532286d6f295a1d9d5c5018f728c2",
        "errors": []
    })
})