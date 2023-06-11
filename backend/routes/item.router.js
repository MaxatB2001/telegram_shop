const Router = require("express");
const itemController = require("../controllers/Item.controller");

const itemRouter = new Router();

itemRouter.post('/', itemController.createItem)
itemRouter.get("/one/:id", itemController.getItemById)
itemRouter.post("/review/:id", itemController.addReviewToItem)
itemRouter.get("/:categoryName", itemController.getItemsByCategory)

module.exports = itemRouter;