const { randomUUID } = require("crypto");
const { seedProperties } = require("./seedProperties");

let properties = [];

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

module.exports = {
  listProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty
};
