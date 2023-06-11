const ApiError = require("../errors/ApiError")
const Cart = require("../models/cart.model")

class CartController {

  async addToCart(req, res, next) {
    const {userName} = req.params
    const {item} = req.body
    console.log(item);
    try {
      let cart = await Cart.findOne({userName});
      if (!cart) {
        cart = await Cart.create({userName})
      }
      // if (cart.items.includes(item._id)) {
      //   return res.json(cart)  
      // }
      cart.items.push(item)
      cart.save()
      return res.json(cart)
    } catch (error) {
      next(ApiError.badRequest("error"))
    }
  }

  async getUserCart(req, res, next) {
    const {userName} = req.params
    try {
      let cart = await Cart.findOne({userName}).populate("items");
      console.log(cart);
      return res.json(cart)
    } catch (error) {
      next(ApiError.badRequest("error"))
    }
  }

  async deleteItemFromCart(req, res, next) {
    const {itemId} = req.body
    try {
      const {userName} = req.params
      let cart = await Cart.findOne({userName}).populate("items");
      cart.items = cart.items.filter(item => item._id != itemId)
      await cart.save()
      return res.json(cart)
    } catch (error) {
      
    }
  }
}

module.exports = new CartController()