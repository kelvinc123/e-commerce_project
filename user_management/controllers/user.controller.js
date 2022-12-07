const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const JWT_SECRET = "supersecret";

exports.signup = (req, res, next) => {
  const errors = validationResult(req); // validation defined from the routes
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  // We have parsed this from server.js (request body)
  const username = req.body.username;
  const password = req.body.password;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const address = req.body.address;

  bcrypt // bcrypt is for encrypting the password
    .hash(password, 12) // number 12 is like the has power, the higher means slower but more secure
    .then((hashedPw) => {
      const user = new User({
        username: username,
        password: hashedPw,
        first_name: first_name,
        last_name: last_name,
        address: address,
      });
      return user.save(); // save to mongodb
    })
    .then((data) => {
      res.status(201).send({
        message: "Successfully created user!",
        username: username,
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

exports.login = (req, res, next) => {
  const errors = validationResult(req); // validation defined from the routes
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  // from request body
  const username = req.body.username;
  const password = req.body.password;

  let loadedUser;
  User.findOne({ username: username }) // check if the email is registered in our db
    .then((result) => {
      if (!result) {
        const error = new Error("A user with this username could not be found.");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = result;
      return bcrypt.compare(password, result.password); // compare the password
    })
    .then((isEqual) => {
      if (!isEqual) {
        // case when the password doesn't match
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      // if the password match, create token
      const token = jwt.sign(
        {
          userId: loadedUser._id,
          username: loadedUser.username,
          first_name: loadedUser.first_name,
          last_name: loadedUser.last_name,
          address: loadedUser.address
        },
        JWT_SECRET, // another input for jwt function
        { expiresIn: "5d" } // specify the expired token time
      );
      res.status(200).json({
        access_token: token,
        username: loadedUser.username,
      });
    })
    .catch((err) => {
      // catch error
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
