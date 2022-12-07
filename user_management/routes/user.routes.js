const express = require("express");
const { body } = require("express-validator"); // for validating the input

const userController = require("../controllers/user.controller");
const User = require("../models/user.model");

const router = express.Router();

router.post(
  "/signup",
  [
    body("username")
      .isEmail()
      .withMessage("Please enter a valid username!")
      .custom((value, { req }) => {
        return User.findOne({ username: value }).then(
          (user_same_email) => {
            if (user_same_email) {
              return Promise.reject("Username address already exists!");
            }
          }
        );
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Invalid password, minumum length: 6"),
    body("first_name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("The first_name cannot be empty"),
    body("last_name")
      .trim()
      .not()
      .isEmpty()
      .withMessage("The last_name cannot be empty"),
    body("address")
      .trim()
      .not()
      .isEmpty()
      .withMessage("The address cannot be empty"),
  ],
  userController.signup
);

router.post(
  "/login",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Please enter the username to the JSON body"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("Please enter the password to the JSON body"),
  ],
  userController.login
);

module.exports = router;
