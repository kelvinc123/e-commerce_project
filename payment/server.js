const mongoose = require("mongoose");

const required = ['PORT', 'DB_USER', 'DB_PASSWORD', 'PRODUCT_PORT'];
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

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.haxd9of.mongodb.net/Transaction?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
        }
    )
    .then(() => {
        console.log("Successfully connected to the database");
        const payment = require('./services/payment-service');
        payment.consume();
        console.log("Running on port " + process.env.PORT);
    })
    .catch((err) => {
        console.log("Could not connect to the database. Error...", err);
        process.exit();
    });
