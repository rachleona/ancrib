const { caesar } = require('../ciphers/caesar')
const { typeError } = require("../utils/errors")

test("caesar class is defined and has correct values",  () => {
    const myCaesar = new caesar("abcde", "", { key: 3 })

    expect(myCaesar).not.toBe(undefined)
    expect(myCaesar.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": 3,
        "p": "abcde"
    })
})

test("handles non-integer key correctly by pushing typeError with correct data into errors error", () => {
    const myCaesar = new caesar("abcde", "", { key: 3 })
    myCaesar.setK("key") 
    const e =  myCaesar.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].code).toBe("INPUT_TYPE_ERROR")
    expect(e[e.length - 1].requiredType).toBe("int")
})

test("encrypt method works correctly", () => {
    const myCaesar = new caesar("abc", "", { key: 3 })
    expect(myCaesar.encrypt()).toStrictEqual({
        "c": "def",
        "p": "abc",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myCaesar = new caesar("", "def", { key: 3 })
    expect(myCaesar.decrypt()).toStrictEqual({
        "c": "def",
        "p": "abc",
        "errors": []
    })
})