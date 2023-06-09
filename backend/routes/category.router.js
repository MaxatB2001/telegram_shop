const Router = require("express");
const categoryController = require("../controllers/category.controller");

const categoryRouter = new Router();

categoryRouter.post('/', categoryController.createCategory)
categoryRouter.get("/", categoryController.getCategories)

module.exports = categoryRouter;