const utils = require("./rsa_util")
const bigInt = require("big-integer")

const keyGen = size => {
    const { p, q } = utils.generatePrimesRSA(size)

    const n = p.multiply(q)
    const l = lcm(p.minus(1), q.minus(1))

    const e = 65537
    const d = bigInt(e).modInv(l)

    return { n, l, e, d }
}

const encrypt = (n, e, plaintext) => {
    // plaintext shouldn't be greater than nlen
    const blocks = []
}

