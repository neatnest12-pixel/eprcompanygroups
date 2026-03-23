const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/env");

function readToken(request) {
  const authorization = request.headers.authorization || "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
}

function requireRole(roles) {
  return (request, response, next) => {
    const token = readToken(request);

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
      if (!roles.includes(payload.role)) {
        return response.status(403).json({
          message: `${roles.join(" or ")} access is required.`
        });
      }

      request.user = payload;
      return next();
    } catch (error) {
      return response.status(401).json({
        message: "Invalid or expired authorization token."
      });
    }
  };
}

function requireAdmin(request, response, next) {
  return requireRole(["admin"])(request, response, next);
}

function requireStaffOrAdmin(request, response, next) {
  return requireRole(["admin", "staff"])(request, response, next);
}

function readAuthenticatedUser(request, response, next) {
  const token = readToken(request);
  if (!token) {
    request.user = null;
    return next();
  }

  if (!jwtSecret) {
    return response.status(500).json({
      message: "JWT secret is not configured on the server."
    });
  }

  try {
    request.user = jwt.verify(token, jwtSecret);
    return next();
  } catch (error) {
    return response.status(401).json({
      message: "Invalid or expired authorization token."
    });
  }
}

module.exports = {
  requireAdmin,
  requireStaffOrAdmin,
  readAuthenticatedUser
};
