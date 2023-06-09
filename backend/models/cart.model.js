const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    items: [{type: mongoose.Schema.Types.ObjectId, ref: "Item"}]
  },
  {
    minimize: false,
    timestamps: true,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;