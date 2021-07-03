const { sha2 } = require('../ciphers/sha2')

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