const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}]
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;