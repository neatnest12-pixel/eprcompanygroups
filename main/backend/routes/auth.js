const express = require("express");
const jwt = require("jsonwebtoken");
const {
  adminEmail,
  adminPassword,
  adminUsername,
  staffUsername,
  staffPassword,
  jwtSecret
} = require("../config/env");

const router = express.Router();

router.post("/login", (request, response) => {
  const { username, email, password } = request.body || {};
  const identity = `${username || email || ""}`.trim().toLowerCase();

  if (!adminPassword || !jwtSecret) {
    return response.status(500).json({
      message:
        "Login credentials or JWT secret are missing. Configure the server environment variables first."
    });
  }

  const users = [
    {
      username: (adminUsername || "admin").toLowerCase(),
      email: (adminEmail || "").toLowerCase(),
      password: adminPassword,
      role: "admin"
    },
    {
      username: (staffUsername || "staff").toLowerCase(),
      email: "",
      password: staffPassword,
      role: "staff"
    }
  ];

  const matchedUser = users.find((user) => {
    const sameIdentity = identity === user.username || (user.email && identity === user.email);
    return sameIdentity && password === user.password;
  });

  if (!matchedUser) {
    return response.status(401).json({
      message: "Invalid username or password."
    });
  }

  const token = jwt.sign(
    {
      email: matchedUser.email || matchedUser.username,
      username: matchedUser.username,
      role: matchedUser.role
    },
    jwtSecret,
    {
      expiresIn: "7d"
    }
  );

  return response.json({
    token,
    user: {
      email: matchedUser.email || matchedUser.username,
      username: matchedUser.username,
      role: matchedUser.role
    }
  });
});

module.exports = router;
