const Router = require("express");
const itemController = require("../controllers/Item.controller");

const itemRouter = new Router();

itemRouter.post('/', itemController.createItem)
itemRouter.get("/:categoryName", itemController.getItemsByCategory)

module.exports = itemRouter;