const express = require("express");
const { body } = require("express-validator"); // for validating the input

const purchaseController = require("../controllers/purchase.controller");

const router = express.Router();
const isAuth = require("../middleware/is-auth");

router.use(isAuth);
router.post(
  "/purchase",
  [
    body("products")
      .not()
      .isEmpty()
      .withMessage("Please enter the list of items purchased to the JSON body"),
    body("cardNumber")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Please enter the credit card number")
      .isLength({ min: 16, max: 16 })
      .withMessage("Invalid credit card number!"),
  ],
  purchaseController.purchase
);

module.exports = router;
