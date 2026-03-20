const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname, "..", ".env")
});

function readEnv(name, fallback = "") {
  return process.env[name] || fallback;
}

module.exports = {
  port: Number(readEnv("PORT", 5000)),
  frontendUrl: readEnv("FRONTEND_URL", "http://localhost:5173"),
  mongoUri: readEnv("MONGODB_URI"),
  jwtSecret: readEnv("JWT_SECRET"),
  adminEmail: readEnv("ADMIN_EMAIL"),
  adminPassword: readEnv("ADMIN_PASSWORD"),
  cloudinaryCloudName: readEnv("CLOUDINARY_CLOUD_NAME"),
  cloudinaryApiKey: readEnv("CLOUDINARY_API_KEY"),
  cloudinaryApiSecret: readEnv("CLOUDINARY_API_SECRET")
};
