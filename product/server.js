const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
const mongoose = require("mongoose");

const required = ['PORT', 'DB_USER', 'DB_PASSWORD'];
const missing = [];
required.forEach(e => {
    if (e in process.env) {
    } else {
        missing.push(e);
    }
});
if (missing.length > 0) {
    console.log("Missing environment variables:\n" + missing.join("\n"));
    process.exit();
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

require('./services/product-service')(app);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.haxd9of.mongodb.net/Product?retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
        }
    )
    .then(() => {
      console.log("Successfully connected to the database");
      const port = process.env.PORT;
      app.listen(port, () => {
        console.log("Running on port " + port);
      });
    })
    .catch((err) => {
      console.log("Could not connect to the database. Error...", err);
      process.exit();
    });
