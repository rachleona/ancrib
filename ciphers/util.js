const intToBytes = (int, size) => {
    const res = Buffer.allocUnsafe(size)
    for(let i = 0; i < size; i++)
    {
        res[i] = int >>> (8 * i) & 255
    }
    return res
}

