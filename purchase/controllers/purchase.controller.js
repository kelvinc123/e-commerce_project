const axios = require("axios");
const { validationResult } = require("express-validator");
const publish = require("../helpers/publisher");

const PRODUCT_URL = "http://localhost:6000/api/products";

exports.purchase = (req, res, next) => {
  const errors = validationResult(req); // validation defined from the routes
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const userId = req.userId;
  const username = req.username;
  const first_name = req.first_name;
  const last_name = req.last_name;
  const address = req.address;
  const cardNumber = req.body.cardNumber;
  const products = req.body.products;
  const productIds = products.map((product) => product.id);

  let availableProducts;
  let purchaseData;
  return axios
    .get(PRODUCT_URL)
    .then((response) => {
      availableProducts = response.data.filter((product) =>
        productIds.includes(product._id)
      );
      let purchasedQuantity;
      let purchasedProducts = [];
      let totalAmount = 0;

      availableProducts.forEach((product) => {
        purchasedQuantity = products.filter((el) => el.id == product._id)[0]
          .quantity;
        // verify quantity
        if (purchasedQuantity > product.quantity) {
          res.send({
            message: "Purchased quantity exceed available quantity",
            productId: product._id,
            productName: product.title,
            purchasedQuantity: purchasedQuantity,
            availableQuantity: product.quantity,
          });
        }
        // add desired result
        purchasedProducts.push({
          id: product._id,
          price: product.price,
          quantity: purchasedQuantity,
        });
        // total amount
        totalAmount =
          totalAmount + Number(product.price) * Number(purchasedQuantity);
      });
      purchaseData = {
        user: userId,
        username: username,
        first_name: first_name,
        last_name: last_name,
        address: address,
        cardNumber: cardNumber,
        products: purchasedProducts,
        totalAmount: totalAmount,
      };
      // send to queue
      publish(purchaseData);

      // send response back to user
      res.status(200).send({
        message: "Successfully purchased the product",
        purchaseData: purchaseData,
      });
    })
    .catch((err) => {
      // send status 500 if error, go to error handler in server.js
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
