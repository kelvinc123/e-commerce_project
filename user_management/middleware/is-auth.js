const jwt = require('jsonwebtoken');

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
        decodedToken = jwt.verify(token, 'supersecret');
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
    req.communityId = decodedToken.community_id;  // store userId on the request
    next();
};