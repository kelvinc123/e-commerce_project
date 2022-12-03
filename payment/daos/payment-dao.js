const model = require('../models/payment-model');

const add = (payment) =>
    model.create(payment);

module.exports = {
    add,
};
