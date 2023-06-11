const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    }
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;