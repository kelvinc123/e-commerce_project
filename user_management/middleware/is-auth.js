const jwt = require('jsonwebtoken');

const JWT_SECRET = "supersecret";

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, JWT_SECRET);
    } catch (err){
        err.statusCode = 500;
        throw err;
    }
    // if token is not verified
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }

    // from here, the token is valid
    req.username = decodedToken.username;  // store user info on the request
    req.first_name = decodedToken.first_name;
    req.last_name = decodedToken.last_name;
    req.address = decodedToken.address;
    next();
};