const express = require("express")

const ratingController = require("../controllers/rating.controller")
const router = express.Router()

router.get("/ratings", ratingController.getRatings)

router.post("/ratings", ratingController.addRating)

module.exports = router
