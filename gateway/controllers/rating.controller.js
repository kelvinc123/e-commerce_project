const request = require("../helpers/request")

exports.getRatings = (req, res, next) => {
  const HEADERS = {
    "Content-Type": "application/json",
  }
  const URL = "http://localhost:9000/api/ratings"
  const METHOD = "get"
  return request(URL, METHOD, req, res, next, HEADERS)
}

exports.addRating = (req, res, next) => {
  const HEADERS = {
    "Content-Type": "application/json",
    Authorization: req.headers.authorization,
  }
  const URL = "http://localhost:9000/api/ratings"
  const METHOD = "post"
  return request(URL, METHOD, req, res, next, HEADERS)
}
