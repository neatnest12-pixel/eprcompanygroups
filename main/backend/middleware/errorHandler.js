function errorHandler(error, request, response, next) {
  if (response.headersSent) {
    return next(error);
  }

  if (error.name === "MulterError") {
    return response.status(400).json({
      message: error.message
    });
  }

  return response.status(error.statusCode || 500).json({
    message: error.message || "Internal server error."
  });
}

module.exports = {
  errorHandler
};
