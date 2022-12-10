const asyncHandler = require("express-async-handler")
const ratingModel = require("../models/ratingModel")

// @desc    Get ratings
// @route   GET /api/ratings
// @access  Public
const getRatings = asyncHandler(async (req, res) => {
  const ratings = await ratingModel.find({})
  res.status(200).json(ratings)
})

// @desc    Add rating
// @route   POST /api/ratings
// @access  Private
const addRating = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400)
    throw new Error("Please add a body (productId, userId, rating)") // userId will be given by authmiddleware?
  }

  const rating = await ratingModel.create({
    // user: req.body.userId,
    user: req.userId,
    product: req.body.productId,
    rating: req.body.rating,
  })

  res.status(200).json(rating)
})

module.exports = {
  getRatings,
  addRating,
}
