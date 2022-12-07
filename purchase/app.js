const express = require("express"); // call express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
app.use(cors());

// username and password for MongoDB
const username = "main_user";
const password = "cs6650123456";

// import routes
const purchaseRoutes = require("./routes/purchase.routes");

// assign API
app.use("/api", purchaseRoutes);

// For handling error, passed by calling next on above routes (alerts, status, etc)
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).send({ message: message, data: data });
});

// Run the app
const appPort = 7100;
app.listen(appPort, () => {
  console.log("Purchase server running on port " + appPort);
});
