const ApiError = require("../errors/ApiError")
const Category = require("../models/category.model")

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const {title} = req.body
      const category = await Category.create({title})
      return res.json(category)
    } catch (error) {
      next(ApiError.badRequest("error"))
    }
  }

  async getCategories(req, res, next) {
    try {
      const categories = await Category.find();
      return res.json(categories)
    } catch (error) {
      next(ApiError.badRequest("error"))
    }
  }
}

module.exports = new CategoryController()