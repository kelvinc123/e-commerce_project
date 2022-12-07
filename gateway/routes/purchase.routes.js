const express = require("express");

const purchaseController = require("../controllers/purchase.controller");
const router = express.Router();

router.post(
  "/purchase",
  purchaseController.purchase
);

module.exports = router;
