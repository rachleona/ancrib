const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const { apiError, argError } = require("../utils/errors")
// ciphers
const { caesar } = require("../ciphers/caesar")
const { columnar, scytale } = require("../ciphers/columnar")
const { vigenere, autokey } = require("../ciphers/vigenere")
const { vernam } = require("../ciphers/vernam")
const { enigma } = require("../ciphers/enigma")
const { md5, HMACmd5 } = require("../ciphers/md5")
const { sha2, HMACsha2 } = require("../ciphers/sha2")
const { rijndael } = require("../ciphers/aes")
const { lucifer, triple } = require("../ciphers/des")

const algos = {
  caesar,
  columnar,
  scytale,
  vigenere,
  autokey,
  vernam,
  enigma,
  md5,
  HMACmd5,
  sha2,
  HMACsha2,
  rijndael,
  lucifer,
  triple,
}

const hashes = ["md5", "sha2", "HMACmd5", "HMACsha2"]

// @route POST /encrypt
// @desc Encrypt msg by chosen algorithm
router.post(
  "/encrypt",
  [
    check("algo", "Algorithm is requried").not().isEmpty(),
    check("p", "Plaintext must be a string").isString(),
    check("c", "Ciphertext must be a string").isString(),
    check("options", "Options is requried").isObject(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const arr = errors.array().map( err => new argError(err.msg, err.param))
        return res.status(400).json({ errors: arr })
      }

      const { algo, p, c, options } = req.body

      if (!algos[algo]) {
        return res
          .status(400)
          .json({
            errors: [
              new argError("Couldn't find the algorithm you're looking for!"),
            ],
          })
      }

      const myCipher = new algos[algo](p, c, options)

      if (hashes.includes(algo)) {
        return res.json(myCipher.hash())
      }

      return res.json(myCipher.encrypt())
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ errors: [new apiError()] })
    }
  }
)

// @route POST /decrypt
// @desc Decrypt msg by chosen algorithm
router.post(
  "/decrypt",
  [
    check("algo", "Algorithm is requried").not().isEmpty(),
    check("p", "Plaintext must be a string").isString(),
    check("c", "Ciphertext must be a string").isString(),
    check("options", "Options is requried").isObject(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const arr = errors.array().map( err => new argError(err.msg, err.param))
        return res.status(400).json({ errors: arr })
      }

      const { algo, p, c, options } = req.body

      if (!algos[algo]) {
        return res
          .status(400)
          .json({
            errors: [
              new argError("Couldn't find the algorithm you're looking for!"),
            ],
          })
      }

      const myCipher = new algos[algo](p, c, options)

      if (hashes.includes(algo)) {
        return res
          .status(400)
          .json({ errors: [new argError("Hashes cannot be decrypted!")] })
      }

      return res.json(myCipher.decrypt())
    } catch (err) {
      console.error(err.message)
      res.status(500).json({ errors: [new apiError()] })
    }
  }
)

module.exports = router
