// @PARAMS
// * INT int = integer to be turned to bytes buffer
// * INT size = length of buffer desired in number of bytes
// * BOOL endian = 1 is big endian, 0 is small endian
// @RETURNS
// * BUFFER ur int in bytes of course
const intToBytes = (int, size, endian = 1) => {
  const res = Buffer.alloc(size)
  for (let i = 0; i < size; i++) {
    res[endian ? size - i - 1 : i] = (int >>> (8 * i)) & 255
    if (int < Math.pow(2, 8 * i)) break
  }
  return res
}

// @PARAMS
// * STR string = string to be turned to bytes array
// @RETURNS
// * ARRAY ur str in bytes of course but NOT A BUFFER
const strToBytes = (string) => {
  const bytes = []
  for (let i = 0; i < string.length; i++) {
    let code = string.codePointAt(i)
    let arr = []
    while (code > 0xff) {
      arr.unshift(code & 0xff)
      code = code >>> 8
    }
    arr.unshift(code & 0xff)
    bytes.push(...arr)
  }

  return bytes
}

// copied from https://github.com/crypto-browserify/buffer-xor/blob/master/index.js
// @PARAMS
// * BUFFER buf1, buf2 = buffers to be xored
// @RETURNS
// * BUFFER the result of course
const xorBytes = (buf1, buf2) => {
  const len = Math.max(buf1.length, buf2.length)
  const res = Buffer.allocUnsafe(len)
  for (let n = 0; n < len; n++) {
    res[n] = buf1[n] ^ buf2[n]
  }

  return res
}

// @PARAMS
// * BUFFER bytes = array of bytes
// * INT size = the size of each block in number of bytes
// @RETURNS
// * ARRAY blocks of specified size from bytes
const makeBlocks = (bytes, size = 16) => {
  let blocks = []
  for (let i = 0; i < bytes.length; i += size) {
    let data = Buffer.alloc(size)
    bytes.copy(data, 0, i)
    blocks.push(data)
  }

  return blocks
}

// @PARAMS
// * ARRAY blocks = array of block matrices
// * INT size = the size of each block in number of bytes
// @RETURNS
// * BUFFER unified buffer from all the blocks
const unBlock = (blocks, size = 16) => {
  let res = Buffer.alloc(size * blocks.length)
  blocks.forEach((block, i) => {
    block.forEach((buf, j) => {
      buf.copy(res, i * size + j * 4)
    })
  })

  return res
}

// @PARAMS
// * INT word = 32-bit words in number form
// * INT num = the number of bits to be rotated
// @RETURNS
// * INT rotated word
const leftRotate = (word, num, size = 32) =>
  ((word << num) | (word >>> (size - num))) & (Math.pow(2, size) - 1)

  
module.exports = {
  intToBytes,
  strToBytes,
  xorBytes,
  makeBlocks,
  unBlock,
  leftRotate,
}
