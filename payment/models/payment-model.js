const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    products: [{
        id : {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],
    cardNumber: {
        type: String,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
}, {collection: 'Transaction'});

module.exports = mongoose.model("Payment", PaymentSchema);
