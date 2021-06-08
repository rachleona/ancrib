const { caesar } = require('../ciphers/caesar')
const { typeError } = require("../utils/errors")

test("caesar class is defined and has correct values",  () => {
    const myCaesar = new caesar("abcde", "", { key: 3 })

    expect(myCaesar).toBeDefined()
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
    expect(e[e.length - 1].requiredType).toBe("int")
})

test("encrypt method works correctly", () => {
    const myCaesar = new caesar("abc", "", { key: 3 })
    expect(myCaesar.encrypt()).toStrictEqual({
        "c": "def",
        "p": "abc",
        "errors": []
    })

    myCaesar.setP("")
    expect(myCaesar.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myCaesar.setP("The brown fox jumped over the lazy dog.")
    myCaesar.setK(5)
    expect(myCaesar.encrypt()).toStrictEqual({
        "c": "Ymj gwtbs ktc ozruji tajw ymj qfed itl.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myCaesar = new caesar("abc", "a", { key: "key" })
    const res = myCaesar.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myCaesar.setK(3)
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

    myCaesar.setC("")
    expect(myCaesar.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myCaesar.setC("Ymj gwtbs ktc ozruji tajw ymj qfed itl.")
    myCaesar.setK(5)
    expect(myCaesar.decrypt()).toStrictEqual({
        "c": "Ymj gwtbs ktc ozruji tajw ymj qfed itl.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myCaesar = new caesar("abc", "a", { key: "key" })
    const res = myCaesar.decrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myCaesar.setK(3)
    expect(myCaesar.decrypt()).toStrictEqual({
        "c": "a",
        "p": "x",
        "errors": []
    })
})