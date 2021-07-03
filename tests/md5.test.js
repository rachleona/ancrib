const { md5 } = require('../ciphers/md5')

test("md5 class is defined and has correct values",  () => {
    const myMD = new md5("abcde", "", {})

    expect(myMD).toBeDefined()
    expect(myMD.getAttr("p", "c")).toStrictEqual({ 
        "c": "",
        "p": "abcde"
    })
})


test("hash method works correctly", () => {
    const myMD = new md5("", "", {})
    expect(myMD.hash()).toStrictEqual({
        "c": "d41d8cd98f00b204e9800998ecf8427e",
        "p": "",
        "errors": []
    })

    myMD.setP("abc")
    expect(myMD.hash()).toStrictEqual({
        "c": "900150983cd24fb0d6963f7d28e17f72",
        "p": "abc",
        "errors": []
    })

    myMD.setP("message digest")
    expect(myMD.hash()).toStrictEqual({
        "c": "f96b697d7cb7938d525a2f31aaf161d0",
        "p": "message digest",
        "errors": []
    })

    myMD.setP("12345678901234567890123456789012345678901234567890123456789012345678901234567890")
    expect(myMD.hash()).toStrictEqual({
        "c": "57edf4a22be3c955ac49da2e2107b67a",
        "p": "12345678901234567890123456789012345678901234567890123456789012345678901234567890",
        "errors": []
    })
})

test("md5 has no setK method",  () => {
    const myMD = new md5("abcde", "", {})
    let res = true

    try
    {
        myMD.setK()
    }
    catch(TypeError)
    {
        res = false
    }

    expect(res).toBe(false)
})