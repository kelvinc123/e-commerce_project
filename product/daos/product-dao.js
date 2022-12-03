const model = require('../models/product-model');

const getOne = (id) =>
    model.findOne({_id: id}, '_id title description category image price quantity');

const getAll = () =>
    model.find({}, '_id title description category image price quantity');

const decreaseQuantity = (id, quantity) =>
    model.updateOne({_id: id}, {$inc: {quantity: -quantity}});

module.exports = {
    getOne,
    getAll,
    decreaseQuantity,
};
