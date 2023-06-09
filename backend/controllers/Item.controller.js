const ApiError = require("../errors/ApiError")
const Item = require("../models/Item.model")
const uuid = require("uuid")
const path = require("path")


class ItemController {
  async createItem(req, res, next) {
    try {
      const {name, cost, categoryName} = req.body
      const {image} = req.files
      const fileName = uuid.v4() + ".jpg"
      image.mv(path.resolve(__dirname, '..', 'static', fileName));
      const item = await Item.create({name, cost, categoryName, picture: fileName})
      return res.json(item)
    } catch (error) {
      next(ApiError.badRequest("error"))
    }
  }

  async getItemsByCategory(req, res, next) {
    const {categoryName} = req.params
    try {
      const items = await Item.find({categoryName: categoryName});
      return res.json(items)
    } catch (error) {
      next(ApiError.badRequest("error"))
    }
  }
}

module.exports = new ItemController()