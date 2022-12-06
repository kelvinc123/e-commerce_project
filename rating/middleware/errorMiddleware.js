const errorHandler = (err, req, res, next) => {
  const statusCodeToUse = res.statusCode ? res.statusCode : 500
  res.status(statusCodeToUse).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

module.exports = {
  errorHandler,
}
