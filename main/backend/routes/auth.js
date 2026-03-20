const express = require("express");
const jwt = require("jsonwebtoken");
const { adminEmail, adminPassword, jwtSecret } = require("../config/env");

const router = express.Router();

router.post("/login", (request, response) => {
  const { email, password } = request.body || {};

  if (!adminEmail || !adminPassword || !jwtSecret) {
    return response.status(500).json({
      message:
        "Admin credentials or JWT secret are missing. Configure the server environment variables first."
    });
  }

  if (email !== adminEmail || password !== adminPassword) {
    return response.status(401).json({
      message: "Invalid admin email or password."
    });
  }

  const token = jwt.sign(
    {
      email: adminEmail,
      role: "admin"
    },
    jwtSecret,
    {
      expiresIn: "7d"
    }
  );

  return response.json({
    token,
    user: {
      email: adminEmail,
      role: "admin"
    }
  });
});

module.exports = router;
