const mongoose = require("mongoose")

const ratingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel", // get the model name
      required: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "productModel", // get the model name
      required: true,
    },

    rating: {
      type: Number,
      required: [true, "please add a rating value (from rating schema)"],
    },
  },

  {
    timestamps: true,
  }
)

module.exports = mongoose.model("ratingModel", ratingSchema)
