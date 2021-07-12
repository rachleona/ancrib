const { sha2, HMACsha2 } = require('../ciphers/sha2')

test("sha2 class is defined and has correct values",  () => {
    const mySHA = new sha2("abcde", "", {})

    expect(mySHA).toBeDefined()
    expect(mySHA.getAttr("p", "c")).toStrictEqual({ 
        "c": "",
        "p": "abcde"
    })
})


test("hash method works correctly", () => {
    const mySHA = new sha2("", "", {})
    expect(mySHA.hash()).toStrictEqual({
        "c": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        "p": "",
        "errors": []
    })

    mySHA.setP("abc")
    expect(mySHA.hash()).toStrictEqual({
        "c": "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad",
        "p": "abc",
        "errors": []
    })

    mySHA.setP("abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq")
    expect(mySHA.hash()).toStrictEqual({
        "c": "248d6a61d20638b8e5c026930c3e6039a33ce45964ff2167f6ecedd419db06c1",
        "p": "abcdbcdecdefdefgefghfghighijhijkijkljklmklmnlmnomnopnopq",
        "errors": []
    })

    mySHA.setP("secure hash algorithm")
    expect(mySHA.hash()).toStrictEqual({
        "c": "f30ceb2bb2829e79e4ca9753d35a8ecc00262d164cc077080295381cbd643f0d",
        "p": "secure hash algorithm",
        "errors": []
    })
})

test("sha2 has no setK method",  () => {
    const mySHA = new sha2("abcde", "", {})
    let res = true

    try
    {
        mySHA.setK()
    }
    catch(TypeError)
    {
        res = false
    }

    expect(res).toBe(false)
})

//hmac

test("sha2 class is defined and has correct values",  () => {
    const mySHA = new HMACsha2("abcde", "", { key: "SOME LONG 256 BIT KEY RIGHT HERE" })

    expect(mySHA).toBeDefined()
    expect(mySHA.getAttr("p", "c", "k")).toStrictEqual({ 
        "c": "",
        "p": "abcde",
        "k": "SOME LONG 256 BIT KEY RIGHT HERE"
    })
})


test("hash method works correctly", () => {
    const mySHA = new HMACsha2("A", "", { key: "SOME LONG 256 BIT KEY RIGHT HERE" })
    expect(mySHA.hash()).toStrictEqual({
        "c": "80dd25d01d97fc4a03b5d92b08680fdcae3fae4c5a3489a589e3e85e6e34d5fc",
        "p": "A",
        "errors": []
    })

    mySHA.setP("Hi There")
    mySHA.setK("0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b", "hex")
    expect(mySHA.hash("utf8", "hex")).toStrictEqual({
        "c": "198a607eb44bfbc69903a0f1cf2bbdc5ba0aa3f3d9ae3c1c7a3b1696a0b68cf7",
        "p": "Hi There",
        "errors": []
    })

    mySHA.setK("4a6566654a6566654a6566654a6566654a6566654a6566654a6566654a656665")
    mySHA.setP("what do ya want for nothing?")
    expect(mySHA.hash("utf8", "hex")).toStrictEqual({
        "c": "167f928588c5cc2eef8e3093caa0e87c9ff566a14794aa61648d81621a2a40c6",
        "p": "what do ya want for nothing?",
        "errors": []
    })

    mySHA.setP("dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd")
    mySHA.setK("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    expect(mySHA.hash("hex", "hex")).toStrictEqual({
        "c": "cdcb1220d1ecccea91e53aba3092f962e549fe6ce9ed7fdc43191fbde45c30b0",
        "p": "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd",
        "errors": []
    })
})