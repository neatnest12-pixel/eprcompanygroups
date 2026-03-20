const express = require("express");
const cors = require("cors");
const { frontendUrl } = require("./config/env");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    origin: frontendUrl,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use(errorHandler);

module.exports = app;
