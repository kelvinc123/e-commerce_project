const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")

const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    res.status(401)
    throw new Error("Not authenticated, no token")
  }

  try {
    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    // store user info on the request
    req.userId = decodedToken.userId
    req.username = decodedToken.username
    req.first_name = decodedToken.first_name
    req.last_name = decodedToken.last_name
    req.address = decodedToken.address

    next()
  } catch (error) {
    console.log(error)
    res.status(401)
    throw new Error("Not authorized, some error")
  }
})

module.exports = {
  protect,
}
