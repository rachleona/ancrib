const { vigenere, autokey } = require('../ciphers/vigenere')
const { typeError } = require("../utils/errors")

test("vigenere class is defined and has correct values",  () => {
    const myVig = new vigenere("abcde", "", { key: "SOMEKEY" })

    expect(myVig).toBeDefined()
    expect(myVig.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "SOMEKEY",
        "p": "abcde"
    })
})

test("handles non-string key correctly by pushing typeError with correct data into errors error", () => {
    const myVig = new vigenere("abcde", "", { key: "SOMEKEY" })
    myVig.setK(3) 
    const e =  myVig.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")
})

test("encrypt method works correctly", () => {
    const myVig = new vigenere("abc", "", { key: "SOMEKEY" })
    expect(myVig.encrypt()).toStrictEqual({
        "c": "spo",
        "p": "abc",
        "errors": []
    })

    myVig.setP("")
    expect(myVig.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myVig.setP("The brown fox jumped over the lazy dog.")
    myVig.setK("VIGENERE")
    expect(myVig.encrypt()).toStrictEqual({
        "c": "Opk fesnr awd nhqgiy wbie xyi gifc qsx.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myVig = new vigenere("abc", "a", { key: 3 })
    const res = myVig.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myVig.setK("ABC")
    expect(myVig.encrypt()).toStrictEqual({
        "c": "ace",
        "p": "abc",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myVig = new vigenere("", "spo", { key: "SOMEKEY" })
    expect(myVig.decrypt()).toStrictEqual({
        "c": "spo",
        "p": "abc",
        "errors": []
    })

    myVig.setC("")
    expect(myVig.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myVig.setC("Opk fesnr awd nhqgiy wbie xyi gifc qsx.")
    myVig.setK("VIGENERE")
    expect(myVig.decrypt()).toStrictEqual({
        "c": "Opk fesnr awd nhqgiy wbie xyi gifc qsx.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myVig = new vigenere("abc", "a", { key: 3 })
    const res = myVig.decrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myVig.setK("SOMEKEY")
    expect(myVig.decrypt()).toStrictEqual({
        "c": "a",
        "p": "i",
        "errors": []
    })
})


//autokey
test("autokey class is defined and has correct values",  () => {
    const myVig = new autokey("abcde", "", { key: "SOMEKEY" })

    expect(myVig).toBeDefined()
    expect(myVig.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": "SOMEKEY",
        "p": "abcde"
    })
})

test("autokey handles non-string keys correctly by pushing typeError with correct data into errors error", () => {
    const myVig = new autokey("abcde", "", { key: "SOMEKEY" })
    myVig.setK(3) 
    const e =  myVig.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("str")
})

test("encrypt method works correctly", () => {
    const myVig = new autokey("abcde", "", { key: "ABC" })
    expect(myVig.encrypt()).toStrictEqual({
        "c": "acedf",
        "p": "abcde",
        "errors": []
    })

    myVig.setP("")
    expect(myVig.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myVig.setP("The brown fox jumped over the lazy dog.")
    myVig.setK("AUTOKEY")
    expect(myVig.encrypt()).toStrictEqual({
        "c": "Tbx pbsug msy aiicjr leyd ilh zvdp wvk.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myVig = new autokey("abc", "a", { key: 3 })
    const res = myVig.encrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myVig.setK("ABC")
    expect(myVig.encrypt()).toStrictEqual({
        "c": "ace",
        "p": "abc",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const myVig = new autokey("", "spo", { key: "SOMEKEY" })
    expect(myVig.decrypt()).toStrictEqual({
        "c": "spo",
        "p": "abc",
        "errors": []
    })

    myVig.setC("")
    expect(myVig.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    myVig.setC("Tbx pbsug msy aiicjr leyd ilh zvdp wvk.")
    myVig.setK("AUTOKEY")
    expect(myVig.decrypt()).toStrictEqual({
        "c": "Tbx pbsug msy aiicjr leyd ilh zvdp wvk.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const myVig = new autokey("abc", "a", { key: 3 })
    const res = myVig.decrypt()
    expect(res.c).toBe("a")
    expect(res.p).toBe("abc")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myVig.setK("SOMEKEY")
    expect(myVig.decrypt()).toStrictEqual({
        "c": "a",
        "p": "i",
        "errors": []
    })
})