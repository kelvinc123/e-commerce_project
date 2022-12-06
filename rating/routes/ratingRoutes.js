const express = require("express")
const router = express.Router()
const { getRatings, addRating } = require("../controllers/ratingController")
const { protect } = require("../middleware/authMiddleware")

router.get("/", getRatings)

router.post("/", protect, addRating)

module.exports = router
