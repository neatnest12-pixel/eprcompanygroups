const express = require("express");
const cors = require("cors");
const { frontendUrl } = require("./config/env");
const authRoutes = require("./routes/auth");
const propertyRoutes = require("./routes/properties");
const enquiryRoutes = require("./routes/enquiries");
const submissionRoutes = require("./routes/submissions");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = frontendUrl
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowAllOrigins = allowedOrigins.length === 0 || allowedOrigins.includes("*");

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowAllOrigins || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`CORS blocked origin ${origin}. Allowing due to fallback.`);
      return callback(null, true);
    },
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
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/submissions", submissionRoutes);
app.use(errorHandler);

module.exports = app;
