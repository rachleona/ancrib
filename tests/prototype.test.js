const protocipher = require("../utils/prototype")
const { check } = require("../utils/typechecks")
const { typeError } = require("../utils/errors")

const intCheck = check("int", { msg: "Gimme int!" })
const myCipher = new protocipher("abcde", "", 3, { key: true, keyType: "int", keyMisc: {} })

test("type checker working as expected", () => {
    expect(() => { intCheck("", "k") }).toThrow(typeError)
    expect(() => { intCheck(1, "k") }).not.toThrow(typeError)
})

test("class is defined and has correct attributes",  () => {

    expect(myCipher).not.toBe(undefined)
    expect(myCipher.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": 3,
        "p": "abcde"
    })
})

test("attributes can be updated correctly", () => {
    expect(myCipher.setK(5)).toBe(5)
    expect(myCipher.setP("abc")).toBe("abc")
    expect(myCipher.setC("sth")).toBe("sth")
    expect(myCipher.getAttr("k", "p", "c")).toStrictEqual({ 
        "k": 5,
        "p": "abc",
        "c": "sth"
    })
})

test("handles wrong key type correctly by pushing typeError with correct data into errors error", () => {
    myCipher.setK(1.2) 
    const e =  myCipher.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].code).toBe("INPUT_TYPE_ERROR")
    expect(e[e.length - 1].requiredType).toBe("int")
})

test("handles wrong plaintext type correctly by pushing typeError with correct data into errors error", () => {
    myCipher.setP(1.2) 
    const e =  myCipher.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("p")
    expect(e[e.length - 1].code).toBe("INPUT_TYPE_ERROR")
    expect(e[e.length - 1].requiredType).toBe("str")
})

// test("handles missing arguments correctly by throwing argError", () => {
// })