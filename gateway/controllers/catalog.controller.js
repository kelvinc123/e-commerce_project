
const request = require("../helpers/request");

const CATALOG_URL = "http://localhost:6000/api/products/";
const HEADERS = {
    'Content-Type': 'application/json'
}

exports.getProduct = (req, res, next) => {
    const _id = req.params.id;
    const URL = CATALOG_URL + _id;
    const METHOD = "get";
    return request(URL, METHOD, req, res, next, HEADERS);
}

exports.getAll = (req, res, next) => {
    const METHOD = "get";
    return request(CATALOG_URL, METHOD, req, res, next, HEADERS);
}

exports.decreaseQuantity = (req, res, next) => {
    const _id = req.params.id;
    const URL = CATALOG_URL + _id + "/decrease"
    const METHOD = "put";
    return request(URL, METHOD, req, res, next, HEADERS);
}