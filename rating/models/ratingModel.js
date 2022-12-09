const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "please add a rating value (from rating schema)"],
    },
  },
  { collection: "Rating" }
)

module.exports = mongoose.model("Rating", ratingSchema)
