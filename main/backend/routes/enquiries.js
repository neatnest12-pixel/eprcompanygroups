const express = require("express");
const {
  listEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry
} = require("../services/enquiryService");
const { requireStaffOrAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/", requireStaffOrAdmin, async (request, response, next) => {
  try {
    const items = await listEnquiries();
    response.json(items);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const enquiry = await createEnquiry({
      propertyId: request.body.propertyId?.trim() || "",
      propertyTitle: request.body.propertyTitle?.trim() || "",
      location: request.body.location?.trim() || "",
      price: request.body.price?.trim() || "",
      size: request.body.size?.trim() || "",
      name: request.body.name?.trim() || "",
      mobile: request.body.mobile?.trim() || "",
      email: request.body.email?.trim() || "",
      message: request.body.message?.trim() || "",
      status: "new"
    });

    response.status(201).json(enquiry);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", requireStaffOrAdmin, async (request, response, next) => {
  try {
    const enquiry = await updateEnquiry(request.params.id, {
      status: request.body.status?.trim() || "contacted"
    });

    if (!enquiry) {
      return response.status(404).json({
        message: "Enquiry not found."
      });
    }

    return response.json(enquiry);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireStaffOrAdmin, async (request, response, next) => {
  try {
    const enquiry = await deleteEnquiry(request.params.id);

    if (!enquiry) {
      return response.status(404).json({
        message: "Enquiry not found."
      });
    }

    return response.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
