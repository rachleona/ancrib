const { vernam } = require('../ciphers/vernam')
const { typeError } = require("../utils/errors")

test("vernam class is defined and has correct values",  () => {
    const myVernam = new vernam("abcde", "", { key: "keyss" })

    expect(myVernam).toBeDefined()
    expect(myVernam.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "keyss",
        "p": "abcde"
    })
})

test("handles non-string key correctly by pushing typeError with correct data into errors error", () => {
    const myVernam = new vernam("abcde", "", { key: "keyss" })
    myVernam.setK(3) 
    const e =  myVernam.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")
})

test("encrypt method works correctly", () => {
    const myVernam = new vernam("abc", "", { key: "key" })
    expect(myVernam.encrypt()).toStrictEqual({
        "c": "kfa",
        "p": "abc",
        "errors": []
    })

    myVernam.setP("")
    expect(myVernam.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myVernam.setP("The brown fox jumped over the lazy dog.")
    myVernam.setK("Thebrownfoxjumpedoverthelazydog")
    expect(myVernam.encrypt()).toStrictEqual({
        "c": "Moi cicsa kcu soyeig cqii moi wayw gcm.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myVernam = new vernam("abc", "a", { key: 3 })
    const res = myVernam.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myVernam.setK("key")
    expect(myVernam.encrypt()).toStrictEqual({
        "c": "kfa",
        "p": "abc",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myVernam = new vernam("", "kfa", { key: "key" })

    expect(myVernam.decrypt()).toStrictEqual({
        "c": "kfa",
        "p": "abc",
        "errors": []
    })

    myVernam.setC("")
    expect(myVernam.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myVernam.setC("Moi cicsa kcu soyeig cqii moi wayw gcm.")
    myVernam.setK("Thebrownfoxjumpedoverthelazydog")
    expect(myVernam.decrypt()).toStrictEqual({
        "c": "Moi cicsa kcu soyeig cqii moi wayw gcm.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myVernam = new vernam("a", "abc", { key: 3 })
    const res = myVernam.decrypt()
    expect(res.c).toBe("abc")
    expect(res.p).toBe("a")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myVernam.setK("key")
    expect(myVernam.decrypt()).toStrictEqual({
        "c": "abc",
        "p": "qxe",
        "errors": []
    })
})

