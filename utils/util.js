const intToBytes = (int, size) => {
    const res = Buffer.allocUnsafe(size)
    for(let i = 0; i < size; i++)
    {
        res[i] = int >>> (8 * i) & 255
    }
    return res
}

const strToBytes =  string => {
    const bytes = []
    for(let i = 0; i < string.length; i++)
    {
        let code = string.codePointAt(i)
        let arr = []
        while(code > 0xFF)
        {
            arr.unshift(code & 0xFF)
            code = code >>> 8
        }
        arr.unshift(code & 0xFF)
        bytes.push(...arr)
    }

    return bytes
}
