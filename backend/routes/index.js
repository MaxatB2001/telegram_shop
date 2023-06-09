const Router = require("express");
const categoryRouter = require("./category.router")
const cartRouter = require("./cart.router")
const itemRouter = require("./item.router")
const router = new Router();

router.use("/category", categoryRouter)
router.use("/item", itemRouter)
router.use("/cart", cartRouter)


module.exports = router;