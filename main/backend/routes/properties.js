const express = require("express");
const {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
} = require("../services/propertyService");
const { requireAdmin, requireStaffOrAdmin } = require("../middleware/auth");
const { upload, isCloudinaryConfigured } = require("../middleware/upload");

const router = express.Router();

function toNumber(value) {
  const nextValue = Number(value);
  return Number.isFinite(nextValue) ? nextValue : 0;
}

function buildPropertyPayload(request) {
  const images = Array.isArray(request.files)
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
      : Array.isArray(request.body.images)
        ? request.body.images.filter(Boolean)
        : [];

  return {
    title: request.body.title?.trim(),
    price: toNumber(request.body.price),
    location: request.body.location?.trim(),
    category: request.body.category?.trim(),
    size:
      request.body.size?.trim() ||
      (request.body.area ? `${request.body.area} sqft` : ""),
    propertyType: request.body.propertyType?.trim() || "Apartment",
    area: toNumber(request.body.area),
    bedrooms: toNumber(request.body.bedrooms),
    bathrooms: toNumber(request.body.bathrooms),
    description: request.body.description?.trim(),
    facing: request.body.facing?.trim() || "",
    transactionType: request.body.transactionType?.trim() || "sale",
    contactNumber: request.body.contactNumber?.trim() || "8939427799",
    featured: request.body.featured === true || request.body.featured === "true",
    verified: request.body.verified !== false && request.body.verified !== "false",
    hotDeal: request.body.hotDeal === true || request.body.hotDeal === "true",
    agentName: request.body.agentName?.trim() || "ERP Group Company",
    agentPhone: request.body.agentPhone?.trim() || request.body.contactNumber?.trim() || "8939427799",
    mapQuery: request.body.mapQuery?.trim() || request.body.location?.trim() || "",
    videoUrl: request.body.videoUrl?.trim() || "",
    amenities: (request.body.amenities || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    images: images.length ? images : bodyImages
  };
}

router.get("/", async (request, response, next) => {
  try {
    const properties = await listProperties();
    response.json(properties);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (request, response, next) => {
  try {
    const property = await getPropertyById(request.params.id);

    if (!property) {
      return response.status(404).json({
        message: "Property not found."
      });
    }

    return response.json(property);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  requireStaffOrAdmin,
  upload.array("images", 10),
  async (request, response, next) => {
    try {
      const hasUploads = Array.isArray(request.files) && request.files.length > 0;
      if (hasUploads && !isCloudinaryConfigured) {
        return response.status(500).json({
          message:
            "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
        });
      }

      const payload = buildPropertyPayload(request);
      const property = await createProperty(payload);
      return response.status(201).json(property);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  requireStaffOrAdmin,
  upload.array("images", 10),
  async (request, response, next) => {
    try {
      const payload = buildPropertyPayload(request);
      const hasNewImages = payload.images.length > 0;
      const property = await updateProperty(request.params.id, {
        ...payload,
        images: hasNewImages
          ? payload.images
          : (request.body.existingImages || "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
      });

      if (!property) {
        return response.status(404).json({
          message: "Property not found."
        });
      }

      return response.json(property);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", requireAdmin, async (request, response, next) => {
  try {
    const property = await deleteProperty(request.params.id);

    if (!property) {
      return response.status(404).json({
        message: "Property not found."
      });
    }

    return response.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
