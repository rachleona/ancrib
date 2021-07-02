const { enigma } = require('../ciphers/enigma')
const { typeError } = require("../utils/errors")
const { enigmaSetup, rotorChoices, defaultPb, defaultRef } = require("../utils/keyclasses")

test("enigma class is defined and has correct values",  () => {
    const key = new enigmaSetup(rotorChoices[0], rotorChoices[1], rotorChoices[2], defaultRef, defaultPb)
    const myEnm = new enigma("abcde", "", { key })

    expect(myEnm).toBeDefined()
    expect(myEnm.getAttr("k", "p", "c")).toStrictEqual({ 
        "c": "",
        "k": key,
        "p": "abcde"
    })
})

test("handles invalid key correctly by pushing typeError with correct data into errors error", () => {
    const key = new enigmaSetup(rotorChoices[0], rotorChoices[1], rotorChoices[2], defaultRef, defaultPb)
    const myEnm = new enigma("abcde", "", { key })
    myEnm.setK("key") 
    const e =  myEnm.getAttr("errors").errors
   
    expect(e[e.length - 1]).toBeInstanceOf(typeError)
    expect(e[e.length - 1].para).toBe("k")
    expect(e[e.length - 1].requiredType).toBe("enm")
})

test("encrypt method works correctly", () => {
    const key = new enigmaSetup(rotorChoices[0], rotorChoices[1], rotorChoices[2], defaultRef, defaultPb)
    const myEnm = new enigma("abc", "", { key })
    expect(myEnm.encrypt()).toStrictEqual({
        "c": "FRU",
        "p": "abc",
        "errors": []
    })

    myEnm.setP("")
    expect(myEnm.encrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    const key2 = new enigmaSetup(rotorChoices[1], rotorChoices[3], rotorChoices[4], defaultRef, defaultPb)
    myEnm.setP("The brown fox jumped over the lazy dog.")
    myEnm.setK(key2)
    expect(myEnm.encrypt()).toStrictEqual({
        "c": "WLM LMYBS BWS OFHFON GRMC JXL PVUT VZS.",
        "p": "The brown fox jumped over the lazy dog.",
        "errors": []
    })
})

test("encrypt method handles invalid inputs correctly by pushing error into array", () => {
    const key = new enigmaSetup(rotorChoices[0], rotorChoices[1], rotorChoices[2], defaultRef, defaultPb)
    const myEnm = new enigma("ABC", "A", { key: "key" })
    const res = myEnm.encrypt()
    expect(res.c).toBe("A")
    expect(res.p).toBe("ABC")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myEnm.setK(key)
    expect(myEnm.encrypt()).toStrictEqual({
        "c": "FRU",
        "p": "ABC",
        "errors": []
    })
})

test("decrypt method works correctly", () =>{
    const key = new enigmaSetup(rotorChoices[0], rotorChoices[1], rotorChoices[2], defaultRef, defaultPb)
    const myEnm = new enigma("", "FRU", { key })

    expect(myEnm.decrypt()).toStrictEqual({
        "c": "FRU",
        "p": "ABC",
        "errors": []
    })

    myEnm.setC("")
    expect(myEnm.decrypt()).toStrictEqual({
        "c": "",
        "p": "",
        "errors": []
    })

    const key2 = new enigmaSetup(rotorChoices[0], rotorChoices[2], rotorChoices[3], defaultRef, defaultPb)
    myEnm.setC("UOT HCPVA DWK WNTFON GTMT DXH XHGF VNS.")
    myEnm.setK(key2)
    expect(myEnm.decrypt()).toStrictEqual({
        "c": "UOT HCPVA DWK WNTFON GTMT DXH XHGF VNS.",
        "p": "THE BROWN FOX JUMPED OVER THE LAZY DOG.",
        "errors": []
    })
})

test("decrypt method handles invalid inputs correctly by pushing error into array", () => {
    const key = new enigmaSetup(rotorChoices[0], rotorChoices[1], rotorChoices[2], defaultRef, defaultPb)
    const myEnm = new enigma("a", "abc", { key: "key" })
    const res = myEnm.decrypt()
    expect(res.c).toBe("abc")
    expect(res.p).toBe("a")
    expect(res.errors[0]).toBeInstanceOf(typeError)

    myEnm.setK(key)
    expect(myEnm.decrypt()).toStrictEqual({
        "c": "abc",
        "p": "FRU",
        "errors": []
    })
})

