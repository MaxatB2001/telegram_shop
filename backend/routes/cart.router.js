const Router = require("express");
const cartController = require("../controllers/cart.controller");

const cartRouter = new Router();

cartRouter.post('/:userName', cartController.addToCart)
cartRouter.get("/:userName", cartController.getUserCart)
cartRouter.post("/delete-item/:userName", cartController.deleteItemFromCart)

module.exports = cartRouter;