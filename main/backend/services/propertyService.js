const Property = require("../models/Property");
const {
  listProperties: listMemoryProperties,
  getPropertyById: getMemoryPropertyById,
  createProperty: createMemoryProperty,
  updateProperty: updateMemoryProperty,
  deleteProperty: deleteMemoryProperty
} = require("../data/inMemoryStore");
const { seedProperties } = require("../data/seedProperties");
const { shouldUseInMemoryStore } = require("../config/database");

function normalizeDocument(document) {
  if (!document) {
    return null;
  }

  return {
    id: String(document._id || document.id),
    title: document.title,
    price: Number(document.price || 0),
    location: document.location,
    category: document.category,
    size: document.size || (document.area ? `${document.area} sqft` : ""),
    propertyType: document.propertyType || "Apartment",
    area: Number(document.area || 0),
    bedrooms: Number(document.bedrooms || 0),
    bathrooms: Number(document.bathrooms || 0),
    description: document.description,
    facing: document.facing || "",
    transactionType: document.transactionType || "sale",
    featured: Boolean(document.featured),
    verified: document.verified !== false,
    hotDeal: Boolean(document.hotDeal),
    contactNumber: document.contactNumber || "8939427799",
    agentName: document.agentName || "ERP Group Company",
    agentPhone: document.agentPhone || document.contactNumber || "8939427799",
    mapQuery: document.mapQuery || document.location || "",
    videoUrl: document.videoUrl || "",
    amenities: Array.isArray(document.amenities) ? document.amenities : [],
    images: Array.isArray(document.images) ? document.images : [],
    createdAt: document.createdAt,
    updatedAt: document.updatedAt
  };
}

async function seedPropertiesIfNeeded() {
  if (shouldUseInMemoryStore()) {
    listMemoryProperties();
    return;
  }

  const count = await Property.countDocuments();
  if (!count) {
    await Property.insertMany(seedProperties);
  }
}

async function listProperties() {
  if (shouldUseInMemoryStore()) {
    return listMemoryProperties();
  }

  const documents = await Property.find().sort({ createdAt: -1 }).lean();
  return documents.map(normalizeDocument);
}

async function getPropertyById(id) {
  if (shouldUseInMemoryStore()) {
    return getMemoryPropertyById(id);
  }

  const document = await Property.findById(id).lean();
  return normalizeDocument(document);
}

async function createProperty(payload) {
  if (shouldUseInMemoryStore()) {
    return createMemoryProperty(payload);
  }

  const document = await Property.create(payload);
  return normalizeDocument(document.toObject());
}

async function updateProperty(id, payload) {
  if (shouldUseInMemoryStore()) {
    return updateMemoryProperty(id, payload);
  }

  const document = await Property.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true
  }).lean();

  return normalizeDocument(document);
}

async function deleteProperty(id) {
  if (shouldUseInMemoryStore()) {
    return deleteMemoryProperty(id);
  }

  const document = await Property.findByIdAndDelete(id).lean();
  return normalizeDocument(document);
}

module.exports = {
  seedPropertiesIfNeeded,
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
