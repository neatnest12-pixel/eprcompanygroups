const express = require("express");
const { requireStaffOrAdmin } = require("../middleware/auth");
const { upload, isCloudinaryConfigured } = require("../middleware/upload");
const {
  listSubmissions,
  createSubmission,
  updateSubmission
} = require("../services/submissionService");
const { createProperty } = require("../services/propertyService");

const router = express.Router();

function buildImageList(request) {
  const uploadedImages = Array.isArray(request.files)
    ? request.files
        .map((file) => file.path || file.secure_url || file.url)
        .filter(Boolean)
    : [];

  const bodyImages =
    typeof request.body.images === "string"
      ? request.body.images
          .split(/\n|,/)
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  return uploadedImages.length ? uploadedImages : bodyImages;
}

router.get("/", requireStaffOrAdmin, async (request, response, next) => {
  try {
    const items = await listSubmissions();
    response.json(items);
  } catch (error) {
    next(error);
  }
});

router.post("/", upload.array("images", 10), async (request, response, next) => {
  try {
    const hasUploads = Array.isArray(request.files) && request.files.length > 0;
    if (hasUploads && !isCloudinaryConfigured) {
      return response.status(500).json({
        message:
          "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
      });
    }

    const submission = await createSubmission({
      name: request.body.name?.trim() || "",
      mobile: request.body.mobile?.trim() || "",
      propertyDetails: request.body.propertyDetails?.trim() || "",
      location: request.body.location?.trim() || "",
      videoUrl: request.body.videoUrl?.trim() || "",
      images: buildImageList(request),
      status: "pending"
    });

    response.status(201).json(submission);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/approve", requireStaffOrAdmin, async (request, response, next) => {
  try {
    const submission = await updateSubmission(request.params.id, {
      status: "approved"
    });

    if (!submission) {
      return response.status(404).json({
        message: "Submission not found."
      });
    }

    const title =
      request.body.title?.trim() ||
      `Owner Property - ${submission.location || submission.name || "Chennai"}`;

    const property = await createProperty({
      title,
      price: Number(request.body.price || 0),
      location: request.body.location?.trim() || submission.location || "Chennai",
      category: request.body.category?.trim() || "Owner Listing",
      size: request.body.size?.trim() || "Size on request",
      propertyType: request.body.propertyType?.trim() || "Owner Listing",
      area: Number(request.body.area || 0),
      bedrooms: Number(request.body.bedrooms || 0),
      bathrooms: Number(request.body.bathrooms || 0),
      description: request.body.description?.trim() || submission.propertyDetails,
      facing: request.body.facing?.trim() || "",
      transactionType: request.body.transactionType?.trim() || "sale",
      featured: false,
      verified: false,
      hotDeal: false,
      contactNumber: submission.mobile || "7299007799",
      agentName: "ERP Group Company",
      agentPhone: submission.mobile || "7299007799",
      mapQuery: submission.location || "Chennai",
      videoUrl: request.body.videoUrl?.trim() || submission.videoUrl || "",
      amenities: (request.body.amenities || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      images: submission.images
    });

    return response.json({
      submission,
      property
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
