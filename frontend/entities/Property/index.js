export const defaultProperty = {
  id: "",
  title: "",
  description: "",
  price: 0,
  priceLabel: "",
  category: "Plots",
  location: "",
  area: 0,
  bedrooms: 0,
  bathrooms: 0,
  facing: "",
  images: [],
  videoUrl: "",
  amenities: [],
  nearby: [],
  commission: "",
  contactNumber: "7299007799",
  furnishing: "Unfurnished",
  propertyType: "",
  verified: false,
  hotDeal: false,
  latitude: 0,
  longitude: 0,
  agentSlug: "epr-groups",
  agentName: "EPR Groups",
  agentPhone: "7299007799",
  mapQuery: "",
  transactionType: "sale",
  featured: false,
  createdAt: new Date().toISOString()
};

export function normalizeProperty(property) {
  return {
    ...defaultProperty,
    ...property,
    area: Number(property?.area || 0),
    bedrooms: Number(property?.bedrooms || 0),
    bathrooms: Number(property?.bathrooms || 0),
    price: Number(property?.price || 0),
    latitude: Number(property?.latitude || 0),
    longitude: Number(property?.longitude || 0),
    images: Array.isArray(property?.images) ? property.images : [],
    videoUrl: property?.videoUrl || "",
    amenities: Array.isArray(property?.amenities) ? property.amenities : [],
    nearby: Array.isArray(property?.nearby) ? property.nearby : []
  };
}
