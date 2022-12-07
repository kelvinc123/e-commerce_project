
const request = require("../helpers/request");

const HEADERS = {
    'Content-Type': 'application/json'
}

exports.signup = (req, res, next) => {
    const URL = "http://localhost:8000/signup";
    const METHOD = "put";
    return request(URL, METHOD, req, res, next, HEADERS);
}

exports.login = (req, res, next) => {
    const URL = "http://localhost:8000/login";
    const METHOD = "post";
    return request(URL, METHOD, req, res, next, HEADERS);
}