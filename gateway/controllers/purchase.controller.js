
const request = require("../helpers/request");

const PURCHASE_URL = "http://localhost:7100/api/purchase";

exports.purchase = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const HEADERS = {
        'Content-Type': 'application/json',
        'Authorization': authHeader
    }
    const METHOD = "post";
    return request(PURCHASE_URL, METHOD, req, res, next, HEADERS);
}