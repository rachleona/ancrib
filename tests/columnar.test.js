const { columnar, scytale } = require('../ciphers/columnar')
const { typeError, argError } = require('../utils/errors')

// pure columnar
test("columnar class is defined and has correct values",  () => {
    const myCol = new columnar("abcde", "", { key: "ACB" })

    expect(myCol).toBeDefined()
    expect(myCol.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "ACB",
        "p": "abcde"
    })
})

test("handles non-string key correctly by pushing typeError with correct data into errors error", () => {
    const myCol = new columnar("abcde", "", { key: 3 })

    const e =  myCol.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")
})

// test("handles faulty key strings correctly by pushing argError with correct data into errors error", () => {
//     const myCol = new columnar("abcde", "", { key: "ADAC" })

//     const e =  myCol.getAttr("errors").errors
   
//     expect(e[e.length - 1]).toBeInstanceOf(argError)
//     expect(e[e.length - 1].para).toBe("k")
//     expect(e[e.length - 1].problem).toBe("Characters not unique")

//     myCol.setK("ACDGEBOPLV")
//     const f = myCol.getAttr("errors").errors

//     expect(f[f.length - 1]).toBeInstanceOf(argError)
//     expect(f[f.length - 1].para).toBe("k")
//     expect(f[f.length - 1].problem).toBe("Exceed max length")
// })

test("encrypt method works correctly", () => {
    const myCol = new columnar("abc", "", { key: "ACB" })

    expect(myCol.encrypt()).toStrictEqual({
        "p": "abc",
        "c": "acb",
        "errors": []
    })

    myCol.setP("abcdef")
    expect(myCol.encrypt()).toStrictEqual({
        "p": "abcdef",
        "c": "adcfbe",
        "errors": []
    })

    myCol.setP("The brown fox jumped over the lazy dog.")
    myCol.setK("ADECB")
    expect(myCol.encrypt()).toStrictEqual({
        "p": "The brown fox jumped over the lazy dog.",
        "c": "Trfu  ldb jdr    n eeey.hoomotaoewxpvhzg",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myCol = new columnar("abc", "a", { key: 3 })
    const res = myCol.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myCol.setK("ACB")
    expect(myCol.encrypt()).toStrictEqual({
        "c": "acb",
        "p": "abc",
        "errors": []
    })
})

test("decrypt method works correctly", () => {
    const myCol = new columnar("", "acb", { key: "ACB" })

    expect(myCol.decrypt()).toStrictEqual({
        "p": "abc",
        "c": "acb",
        "errors": []
    })

    myCol.setC("adcfbe")
    expect(myCol.decrypt()).toStrictEqual({
        "p": "abcdef",
        "c": "adcfbe",
        "errors": []
    })

    myCol.setC("Trfu  ldb jdr    n eeey.hoomotaoewxpvhzg")
    myCol.setK("ADECB")
    expect(myCol.decrypt()).toStrictEqual({
        "p": "The brown fox jumped over the lazy dog.",
        "c": "Trfu  ldb jdr    n eeey.hoomotaoewxpvhzg",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myCol = new columnar("a", "acb", { key: 3 })
    const res = myCol.decrypt()
    expect(res.c).toBe("acb")
    expect(res.p).toBe("a")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myCol.setK("ACB")
    expect(myCol.decrypt()).toStrictEqual({
        "c": "acb",
        "p": "abc",
        "errors": []
    })
})

//scytale
test("scytale class is defined and has correct values",  () => {
    const myCol = new scytale("abcde", "", { key: 3 })

    expect(myCol).toBeDefined()
    expect(myCol.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": 3,
        "p": "abcde"
    })
})

test("scytale handles non-integer key correctly by pushing typeError with correct data into errors error", () => {
    const myCol = new scytale("abcde", "", { key: "str" })

    const e =  myCol.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("int")
})

// test("handles faulty key strings correctly by pushing argError with correct data into errors error", () => {
//     const myCol = new columnar("abcde", "", { key: "ADAC" })

//     const e =  myCol.getAttr("errors").errors
   
//     expect(e[e.length - 1]).toBeInstanceOf(argError)
//     expect(e[e.length - 1].para).toBe("k")
//     expect(e[e.length - 1].problem).toBe("Characters not unique")

//     myCol.setK("ACDGEBOPLV")
//     const f = myCol.getAttr("errors").errors

//     expect(f[f.length - 1]).toBeInstanceOf(argError)
//     expect(f[f.length - 1].para).toBe("k")
//     expect(f[f.length - 1].problem).toBe("Exceed max length")
// })

test("scytale encrypt method works correctly", () => {
    const myCol = new scytale("abcdef", "", { key: 3 })

    expect(myCol.encrypt()).toStrictEqual({
        "p": "abcdef",
        "c": "adbecf",
        "errors": []
    })

    myCol.setK(2)
    expect(myCol.encrypt()).toStrictEqual({
        "p": "abcdef",
        "c": "acebdf",
        "errors": []
    })

    myCol.setP("The brown fox jumped over the lazy dog.")
    myCol.setK(5)
    expect(myCol.encrypt()).toStrictEqual({
        "p": "The brown fox jumped over the lazy dog.",
        "c": "Trfu  ldhoomotaoewxpvhzg n eeey.b jdr   ",
        "errors": []
    })
})

test("scytale encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myCol = new scytale("abcdef", "a", { key: "ACB" })
    const res = myCol.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abcdef")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myCol.setK(3)
    expect(myCol.encrypt()).toStrictEqual({
        "c": "adbecf",
        "p": "abcdef",
        "errors": []
    })
})

test("scytale decrypt method works correctly", () => {
    const myCol = new scytale("", "adbecf", { key: 3 })

    expect(myCol.decrypt()).toStrictEqual({
        "p": "abcdef",
        "c": "adbecf",
        "errors": []
    })

    myCol.setC("acebdf")
    myCol.setK(2)
    expect(myCol.decrypt()).toStrictEqual({
        "p": "abcdef",
        "c": "acebdf",
        "errors": []
    })

    myCol.setC("Trfu  ldhoomotaoewxpvhzg n eeey.b jdr   ")
    myCol.setK(5)
    expect(myCol.decrypt()).toStrictEqual({
        "p": "The brown fox jumped over the lazy dog.",
        "c": "Trfu  ldhoomotaoewxpvhzg n eeey.b jdr   ",
        "errors": []
    })
})

test("scytale decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myCol = new scytale("a", "acebdf", { key: "ACB" })
    const res = myCol.decrypt()
    expect(res.c).toBe("acebdf")
    expect(res.p).toBe("a")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myCol.setK(2)
    expect(myCol.decrypt()).toStrictEqual({
        "c": "acebdf",
        "p": "abcdef",
        "errors": []
    })
})