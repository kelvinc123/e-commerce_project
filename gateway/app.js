const express = require("express"); // call express
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// cors
app.use(cors());

// import routes
const userManagementRoutes = require("./routes/user.routes");
const catalogRoutes = require("./routes/catalog.routes");
const purchaseRoutes = require("./routes/purchase.routes");
// const ratingRoutes = require("./routes/rating.routes");

// assign API
app.use("/", userManagementRoutes);
app.use("/api", catalogRoutes);
app.use("/api", purchaseRoutes);
// app.use("/", ratingRoutes);

const PORT = 3000;
app.listen(PORT);
console.log('Gateway running on port ' + PORT);

