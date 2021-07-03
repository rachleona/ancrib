const { rijndael } = require('../ciphers/aes')
const { typeError } = require("../utils/errors")

test("rijndael class is defined and has correct values",  () => {
    const myAES = new rijndael("abcde", "", { key: "SOME 128 BIT KEY", rounds: 9, bits: 128 })

    expect(myAES).toBeDefined()
    expect(myAES.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "SOME 128 BIT KEY",
        "p": "abcde"
    })
})

test("handles non-string/incorrect length keys correctly by pushing typeError with correct data into errors error", () => {
    const myAES = new rijndael("abcde", "", { key: "SOME 128 BIT KEY", rounds: 9, bits: 128 })
    myAES.setK(3) 
    const e =  myAES.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")

    myAES.setK("somestr") 
    const f =  myAES.getAttr("errors").errors
   
    expect(f[f.length - 1]).toBeInstanceOf(typeError)
    expect(f[f.length - 1].para).toBe("k")
    expect(f[f.length - 1].requiredType).toBe("str")
})

test("encrypt method works correctly", () => {
    const myAES = new rijndael("ATTACK AT DAWN!", "", { key: "SOME 128 BIT KEY", rounds: 9, bits: 128 })
    expect(myAES.encrypt()).toStrictEqual({
        "c": "0bdfa595235c307a105d593fb78fbb13",
        "p": "ATTACK AT DAWN!",
        "errors": []
    })

    myAES.setP("")
    expect(myAES.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myAES.setP("The brown fox jumped over the lazy dog.")
    myAES.setK("ANOTHER KEY HERE")
    myAES.setR(10)
    expect(myAES.encrypt()).toStrictEqual({
        "c": "71a9266f3d31f417cd3ae9acb74ca454108a15571522998a9997d5a1e9f1b994629b8b37459566b4c1e4519b6eae0a9d",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myAES = new rijndael("abc", "a", { key: "key", bits: 128 })
    const res = myAES.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myAES.setK("SOME 128 BIT KEY")
    myAES.setR(10)
    expect(myAES.encrypt()).toStrictEqual({
        "c": "5f58b7ed461de1f1dc1173cb8f77c5b3",
        "p": "abc",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myAES = new rijndael("", "0bdfa595235c307a105d593fb78fbb13", { key: "SOME 128 BIT KEY", bits: 128, rounds: 9 })
    expect(myAES.decrypt()).toStrictEqual({
        "c": "0bdfa595235c307a105d593fb78fbb13",
        "p": "ATTACK AT DAWN!",
        "errors": []
    })

    myAES.setC("")
    expect(myAES.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myAES.setC("71a9266f3d31f417cd3ae9acb74ca454108a15571522998a9997d5a1e9f1b994629b8b37459566b4c1e4519b6eae0a9d")
    myAES.setK("ANOTHER KEY HERE")
    myAES.setR(10)
    expect(myAES.decrypt()).toStrictEqual({
        "c": "71a9266f3d31f417cd3ae9acb74ca454108a15571522998a9997d5a1e9f1b994629b8b37459566b4c1e4519b6eae0a9d",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myAES = new rijndael("a", "5f58b7ed461de1f1dc1173cb8f77c5b3", { key: "key", bits: 128, rounds: 10 })
    const res = myAES.decrypt()
    expect(res.c).toBe("5f58b7ed461de1f1dc1173cb8f77c5b3")
    expect(res.p).toBe("a")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myAES.setK("SOME 128 BIT KEY")

    expect(myAES.decrypt()).toStrictEqual({
        "c": "5f58b7ed461de1f1dc1173cb8f77c5b3",
        "p": "abc",
        "errors": []
    })
})