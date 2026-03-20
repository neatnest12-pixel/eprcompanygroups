const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

function requireAdmin(request, response, next) {
  const authorization = request.headers.authorization || "";
  const token = authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : "";

  if (!token) {
    return response.status(401).json({
      message: "Authorization token is required."
    });
  }

  if (!jwtSecret) {
    return response.status(500).json({
      message: "JWT secret is not configured on the server."
    });
  }

  try {
    const payload = jwt.verify(token, jwtSecret);
    if (payload.role !== "admin") {
      return response.status(403).json({
        message: "Admin access is required."
      });
    }

    request.user = payload;
    next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid or expired authorization token."
    });
  }
}

module.exports = {
  requireAdmin
};
