const info = require("../info.json")
const protocipher = require("../utils/prototype")
const { intToBytes, xorBytes, makeBlocks, leftRotate } = require("../utils/util")

function lucifer(plaintext, ciphertext, options) {
  protocipher.call(
    this,
    plaintext,
    ciphertext,
    options.key,
    info.lucifer.modes.pure,
    options.kEnc,
    options.pEnc,
    options.cEnc
  )

  const IP = [
    [57, 49, 41, 33, 25, 17, 9, 1],
    [59, 51, 43, 35, 27, 19, 11, 3],
    [61, 53, 45, 37, 29, 21, 13, 5],
    [63, 55, 47, 39, 31, 23, 15, 7],
    [56, 48, 40, 32, 24, 16, 8, 0],
    [58, 50, 42, 34, 26, 18, 10, 2],
    [60, 52, 44, 36, 28, 20, 12, 4],
    [62, 54, 46, 38, 30, 22, 14, 6],
  ]

  const IPi = [
    [39, 7, 47, 15, 55, 23, 63, 31],
    [38, 6, 46, 14, 54, 22, 62, 30],
    [37, 5, 45, 13, 53, 21, 61, 29],
    [36, 4, 44, 12, 52, 20, 60, 28],
    [35, 3, 43, 11, 51, 19, 59, 27],
    [34, 2, 42, 10, 50, 18, 58, 26],
    [33, 1, 41, 9, 49, 17, 57, 25],
    [32, 0, 40, 8, 48, 16, 56, 24],
  ]

  const shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1]

  const PC1 = [
    [56, 48, 40, 32, 24, 16, 8, 0],
    [57, 49, 41, 33, 25, 17, 9, 1],
    [58, 50, 42, 34, 26, 18, 10, 2],
    [59, 51, 43, 35, 62, 54, 46, 38],
    [30, 22, 14, 6, 61, 53, 45, 37],
    [29, 21, 13, 5, 60, 52, 44, 36],
    [28, 20, 12, 4, 27, 19, 11, 3],
  ]

  const PC2 = [
    [13, 16, 10, 23, 0, 4],
    [2, 27, 14, 5, 20, 9],
    [22, 18, 11, 3, 25, 7],
    [15, 6, 26, 19, 12, 1],
    [40, 51, 30, 36, 46, 54],
    [29, 39, 50, 44, 32, 47],
    [43, 48, 38, 55, 33, 52],
    [45, 41, 49, 35, 28, 31],
  ]

  const S = [
    [
      [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13],
    ],
    [
      [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
      [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
      [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
      [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
    ],
    [
      [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
      [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
      [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
      [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
    ],
    [
      [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
      [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
      [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
      [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
    ],
    [
      [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
      [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
      [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
      [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
    ],
    [
      [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
      [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
      [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
      [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
    ],
    [
      [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
      [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
      [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
      [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
    ],
    [
      [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
      [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
      [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
      [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
    ],
  ]

  const E = [
    [31, 0, 1, 2, 3, 4],
    [3, 4, 5, 6, 7, 8],
    [7, 8, 9, 10, 11, 12],
    [11, 12, 13, 14, 15, 16],
    [15, 16, 17, 18, 19, 20],
    [19, 20, 21, 22, 23, 24],
    [23, 24, 25, 26, 27, 28],
    [27, 28, 29, 30, 31, 0],
  ]

  const P = [
    [15, 6, 19, 20, 28, 11, 27, 16],
    [0, 14, 22, 25, 4, 17, 30, 9],
    [1, 7, 23, 13, 31, 26, 2, 8],
    [18, 12, 29, 5, 21, 10, 3, 24],
  ]

  const getBit = (bytes, i) => {
    const byte = bytes[Math.floor(i / 8)]
    return byte & (2 ** (7 - (i % 8))) ? 1 : 0
  }

  const makeSubKeys = (key, format = "utf8") => {
    const k = Buffer.from(key, format)
    const kp = Array(7)
    PC1.map((byte, i) => {
      let num = 0x00
      byte.map((v, j) => {
        num += getBit(k, v) * Math.pow(2, 7 - j)
      })
      kp[i] = num
    })

    const roundKeys = Array(16)
      .fill(0)
      .reduce((res, a, i) => {
        let prev

        if (i == 0) {
          const A = kp
            .slice(0, 3)
            .reduce((num, v, j) => num + v * Math.pow(256, 2 - j), 0x000000)
          const B = kp
            .slice(3)
            .reduce((num, v, j) => num + v * Math.pow(256, 3 - j), 0x00000000)
          prev = {
            C: (A * 16) | ((B & 0xf0000000) >>> 28),
            D: (B << 4) >>> 4,
          }
        } else {
          prev = res[i - 1]
        }

        const C = leftRotate(prev.C, shifts[i], 28)
        const D = leftRotate(prev.D, shifts[i], 28)

        return [...res, { C, D }]
      }, [])
      .map(({ C, D }) => {
        const pair = Buffer.concat([
          intToBytes(C * 16 + ((D & 0xf000000) >>> 24), 4),
          intToBytes(D & (Math.pow(2, 24) - 1), 3),
        ])

        const newKey = PC2.map((sextet) => {
          let num = 0b000000
          sextet.map((v, j) => {
            num += getBit(pair, v) * Math.pow(2, 5 - j)
          })
          return num
        })

        return newKey
      })

    return roundKeys
  }

  const f = (r, k) => {
    const expanded = E.map((word) => {
      let num = 0b000000
      word.map((x, j) => {
        num += getBit(r, x) * Math.pow(2, 5 - j)
      })
      return num
    })

    const xored = expanded.map((v, i) => v ^ k[i])

    const shrunk = intToBytes(
      xored
        .map((v, i) => {
          const row = ((v & 0b100000) >>> 4) | (v & 0b000001)
          const col = (v >>> 1) & 0b1111

          return S[i][row][col]
        })
        .reduce((total, cur, i) => {
          return total + cur * Math.pow(16, 7 - i)
        }, 0x00000000),
      4
    )

    const res = Buffer.alloc(4)

    P.map((byte, i) => {
      let num = 0x00
      byte.map((v, j) => {
        num += getBit(shrunk, v) * Math.pow(2, 7 - j)
      })
      res[i] = num
    })

    return res
  }

  const round = (l, r, k) => {
    const nextL = r
    const nextR = xorBytes(l, f(r, k))

    return { l: nextL, r: nextR }
  }

  const cipher = (
    plaintext,
    key,
    rev = false,
    pformat = "utf8",
    kformat = "utf8",
    rformat = "utf8"
  ) => {
    const keys = rev
      ? makeSubKeys(key, kformat).reverse()
      : makeSubKeys(key, kformat)
    const p = Buffer.from(plaintext, pformat)
    const pad = Buffer.alloc((8 - (p.length % 8)) % 8)
    let blocks = makeBlocks(Buffer.concat([p, pad]), 8).map((block) => {
      const buf = Buffer.alloc(8)
      IP.map((byte, i) => {
        let num = 0x00
        byte.map((v, j) => {
          num += getBit(block, v) * Math.pow(2, 7 - j)
        })
        buf[i] = num
      })
      return buf
    })

    for (let i = 0; i < 16; i++) {
      const k = keys[i]
      blocks = blocks.map((v) => {
        const L = v.slice(0, 4)
        const R = v.slice(4)
        const { l, r } = round(L, R, k)
        return i == 15 ? Buffer.concat([r, l]) : Buffer.concat([l, r])
      })
    }

    const res = Buffer.concat(
      blocks.map((block) => {
        const buf = Buffer.alloc(8)
        IPi.map((byte, i) => {
          let num = 0x00
          byte.map((v, j) => {
            num += getBit(block, v) * Math.pow(2, 7 - j)
          })
          buf[i] = num
        })
        return buf
      })
    )

    if (rev) {
      const x = res.indexOf(0x00)
      return x == -1 ? res.toString(rformat) : res.slice(0, x).toString(rformat)
    }

    return res.toString(rformat)
  }

  this.encrypt = () => {
    const { k, p, errors } = this.getAttr("k", "p", "errors")
    if (errors.length == 0)
      this.setC(cipher(p, k, 0, options.pEnc, options.kEnc, options.cEnc))

    return this.getAttr("p", "c", "errors")
  }

  this.decrypt = () => {
    const { k, c, errors } = this.getAttr("k", "c", "errors")
    if (errors.length == 0)
      this.setP(cipher(c, k, 1, options.cEnc, options.kEnc, options.pEnc))

    return this.getAttr("p", "c", "errors")
  }
}

function triple(plaintext, ciphertext, options) {
  protocipher.call(
    this,
    plaintext,
    ciphertext,
    options.key,
    info.lucifer.modes.triple
  )

  const encrypt = (
    plaintext,
    key,
    pformat = "utf8",
    kformat = "utf8",
    rformat = "utf8"
  ) => {
    const k = Buffer.from(key, kformat)
    const k1 = k.slice(0, 8)

    const DES = new lucifer(plaintext, "", { key: k1 })

    const first = DES.encrypt(pformat, "utf8", "hex")
    if (first.errors.length !== 0) return first

    DES.setC(first.c)
    DES.setK(k.slice(8, 16))
    const second = DES.decrypt("hex", "utf8", "hex")
    if (second.errors.length !== 0) return first

    DES.setP(second.p)
    DES.setK(k1)
    const third = DES.encrypt("hex", "utf8", rformat)

    return third.c
  }

  const decrypt = (
    ciphertext,
    key,
    pformat = "utf8",
    kformat = "utf8",
    rformat = "utf8"
  ) => {
    const k = Buffer.from(key, kformat)
    const k1 = k.slice(0, 8)

    const DES = new lucifer("", ciphertext, { key: k1 })

    const first = DES.decrypt(pformat, "utf8", "hex")
    if (first.errors.length !== 0) return first

    DES.setP(first.p)
    DES.setK(k.slice(8, 16))
    const second = DES.encrypt("hex", "utf8", "hex")
    if (second.errors.length !== 0) return first

    DES.setC(second.c)
    DES.setK(k1)
    const third = DES.decrypt("hex", "utf8", rformat)

    return third.p
  }

  this.encrypt = () => {
    const { k, p, errors } = this.getAttr("k", "p", "errors")
    if (errors.length == 0) this.setC(encrypt(p, k, options.pEnc, options.kEnc, options.cEnc))

    return this.getAttr("p", "c", "errors")
  }

  this.decrypt = () => {
    const { k, c, errors } = this.getAttr("k", "c", "errors")
    if (errors.length == 0) this.setP(decrypt(c, k, options.cEnc, options.kEnc, options.pEnc))

    return this.getAttr("p", "c", "errors")
  }
}

module.exports = { lucifer, triple }
