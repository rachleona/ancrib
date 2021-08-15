const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator")

const { apiError, argError } = require("../utils/errors")
const info = require("../info.json")

// @route GET /desc
// @desc get description of an algo
router.get(
    "/:algo",
    async (req, res) => {
      try {
        const algo = req.params.algo

        if (!info[algo]) {
            return res
                .status(400)
                .json({
                errors: [
                    new argError("Couldn't find the algorithm you're looking for!"),
                ],
            })
        }

        res.send(info[algo].description)

      } catch (err) {
        console.error(err.message)
        res.status(500).json({ errors: [new apiError()] })
      }
    }
)

module.exports = router