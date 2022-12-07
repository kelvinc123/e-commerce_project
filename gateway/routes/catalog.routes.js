const express = require("express");

const catalogController = require("../controllers/catalog.controller");
const router = express.Router();

router.get("/products/:id", catalogController.getProduct);
router.get("/products", catalogController.getAll);
router.put("/products/:id/decrease", catalogController.decreaseQuantity);

module.exports = router;
