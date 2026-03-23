const { randomUUID } = require("crypto");
const { seedProperties } = require("./seedProperties");

let properties = [];
let enquiries = [];
let submissions = [];

function nowIso() {
  return new Date().toISOString();
}

function normalizeMemoryProperty(property) {
  return {
    id: property.id || randomUUID(),
    title: property.title,
    price: Number(property.price || 0),
    location: property.location,
    category: property.category,
    size: property.size || (property.area ? `${property.area} sqft` : ""),
    propertyType: property.propertyType || "Apartment",
    area: Number(property.area || 0),
    bedrooms: Number(property.bedrooms || 0),
    bathrooms: Number(property.bathrooms || 0),
    description: property.description,
    facing: property.facing || "",
    transactionType: property.transactionType || "sale",
    featured: Boolean(property.featured),
    verified: property.verified !== false,
    hotDeal: Boolean(property.hotDeal),
    contactNumber: property.contactNumber || "8939427799",
    agentName: property.agentName || "ERP Group Company",
    agentPhone: property.agentPhone || property.contactNumber || "8939427799",
    mapQuery: property.mapQuery || property.location || "",
    videoUrl: property.videoUrl || "",
    amenities: Array.isArray(property.amenities) ? property.amenities : [],
    images: Array.isArray(property.images) ? property.images : [],
    createdAt: property.createdAt || nowIso(),
    updatedAt: nowIso()
  };
}

function normalizeEnquiry(enquiry) {
  return {
    id: enquiry.id || randomUUID(),
    propertyId: enquiry.propertyId || "",
    propertyTitle: enquiry.propertyTitle || "",
    location: enquiry.location || "",
    price: enquiry.price || "",
    size: enquiry.size || "",
    name: enquiry.name || "",
    mobile: enquiry.mobile || "",
    email: enquiry.email || "",
    message: enquiry.message || "",
    status: enquiry.status || "new",
    createdAt: enquiry.createdAt || nowIso(),
    updatedAt: nowIso()
  };
}

function normalizeSubmission(submission) {
  return {
    id: submission.id || randomUUID(),
    name: submission.name || "",
    mobile: submission.mobile || "",
    propertyDetails: submission.propertyDetails || "",
    location: submission.location || "",
    videoUrl: submission.videoUrl || "",
    images: Array.isArray(submission.images) ? submission.images : [],
    status: submission.status || "pending",
    createdAt: submission.createdAt || nowIso(),
    updatedAt: nowIso()
  };
}

function ensureSeeded() {
  if (!properties.length) {
    properties = seedProperties.map(normalizeMemoryProperty);
  }
}

function listProperties() {
  ensureSeeded();
  return [...properties].sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
  );
}

function getPropertyById(id) {
  ensureSeeded();
  return properties.find((property) => property.id === id) || null;
}

function createProperty(payload) {
  ensureSeeded();
  const property = normalizeMemoryProperty(payload);
  properties.unshift(property);
  return property;
}

function updateProperty(id, payload) {
  ensureSeeded();
  const existing = getPropertyById(id);
  if (!existing) {
    return null;
  }

  const nextProperty = normalizeMemoryProperty({
    ...existing,
    ...payload,
    id,
    createdAt: existing.createdAt
  });

  properties = properties.map((property) =>
    property.id === id ? nextProperty : property
  );

  return nextProperty;
}

function deleteProperty(id) {
  ensureSeeded();
  const existing = getPropertyById(id);
  properties = properties.filter((property) => property.id !== id);
  return existing;
}

function listEnquiries() {
  return [...enquiries].sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
  );
}

function createEnquiry(payload) {
  const enquiry = normalizeEnquiry(payload);
  enquiries.unshift(enquiry);
  return enquiry;
}

function updateEnquiry(id, payload) {
  const existing = enquiries.find((item) => item.id === id);
  if (!existing) {
    return null;
  }

  const nextEnquiry = normalizeEnquiry({
    ...existing,
    ...payload,
    id,
    createdAt: existing.createdAt
  });

  enquiries = enquiries.map((item) => (item.id === id ? nextEnquiry : item));
  return nextEnquiry;
}

function deleteEnquiry(id) {
  const existing = enquiries.find((item) => item.id === id) || null;
  enquiries = enquiries.filter((item) => item.id !== id);
  return existing;
}

function listSubmissions() {
  return [...submissions].sort(
    (left, right) => new Date(right.createdAt) - new Date(left.createdAt)
  );
}

function createSubmission(payload) {
  const submission = normalizeSubmission(payload);
  submissions.unshift(submission);
  return submission;
}

function updateSubmission(id, payload) {
  const existing = submissions.find((item) => item.id === id);
  if (!existing) {
    return null;
  }

  const nextSubmission = normalizeSubmission({
    ...existing,
    ...payload,
    id,
    createdAt: existing.createdAt
  });

  submissions = submissions.map((item) => (item.id === id ? nextSubmission : item));
  return nextSubmission;
}

module.exports = {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  listEnquiries,
  createEnquiry,
  updateEnquiry,
  deleteEnquiry,
  listSubmissions,
  createSubmission,
  updateSubmission
};
