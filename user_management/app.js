const express = require("express"); // call express
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// username and password for MongoDB
const username = "main_user";
const password = "cs6650123456";

// connection settings
var db = mongoose.connection;
let port = 4373;

// import routes
const userRoutes = require("./routes/user.routes");

// assign API
app.use("/", userRoutes);

// For handling error, passed by calling next on above routes (alerts, status, etc)
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// DB connection & run the app
mongoose
  .connect(
    `mongodb+srv://${username}:${password}@cluster0.haxd9of.mongodb.net/User?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
    }
  )
  .then((result) => {
    console.log("Successfully connected to the database");
    app.listen(port, () => {
      console.log("Running on port " + port);
    });
  })
  .catch((err) => {
    console.log("Could not connect to the database. Error...", err);
    process.exit();
  });

module.exports = app;
