const axios = require("axios");

const request = (url, method, req, res, next, headers) => {
    return axios({
        headers: headers,
        method: method,
        url: url, 
        data: req.body
    })
    .then((data) => {
        if (!data.statusCode) {
            data.statusCode = 200;
        }
        res.status(data.statusCode).send(data.data);
    })
    .catch((err) => {
        // send status 500 if error, go to error handler in server.js
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        const data = err.response.data;
        res.send(data);
    });
}

module.exports = request