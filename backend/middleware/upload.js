const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary, isCloudinaryConfigured } = require("../config/cloudinary");

const storage = isCloudinaryConfigured
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "erp-group-company/properties",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
      }
    })
  : multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10
  }
});

module.exports = {
  upload,
  isCloudinaryConfigured
};
