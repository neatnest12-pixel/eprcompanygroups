const fallbackImages = [
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
];

const LAKH = 100000;
const CRORE = 10000000;

function formatPrice(value, transactionType = "sale") {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    return "Price on request";
  }

  if (transactionType === "rent") {
    return `Rs. ${amount.toLocaleString("en-IN")} / month`;
  }

  if (amount >= CRORE) {
    return `Rs. ${(amount / CRORE).toFixed(2)} Crore`;
  }

  if (amount >= LAKH) {
    return `Rs. ${(amount / LAKH).toFixed(1)} Lakhs`;
  }

  return `Rs. ${amount.toLocaleString("en-IN")}`;
}

function getAreaFromSize(size) {
  if (!size) return 0;
  const match = `${size}`.match(/[\d,.]+/);
  return match ? Number(match[0].replace(/,/g, "")) : 0;
}

function buildTags({ featured, verified, hotDeal, isNew }) {
  const tags = [];
  if (featured) tags.push("FEATURED");
  if (verified) tags.push("VERIFIED");
  if (hotDeal) tags.push("HOT DEAL");
  if (isNew) tags.push("NEW");
  return tags;
}

function isRecent(createdAt) {
  if (!createdAt) return false;
  const created = new Date(createdAt).getTime();
  return Number.isFinite(created) && Date.now() - created < 1000 * 60 * 60 * 24 * 30;
}

function isYouTube(url = "") {
  return /youtube\.com|youtu\.be/i.test(url);
}

function getEmbedUrl(url = "") {
  if (!url) return "";
  if (isYouTube(url)) {
    const short = url.match(/youtu\.be\/([^?&/]+)/i)?.[1];
    const long = url.match(/[?&]v=([^?&/]+)/i)?.[1];
    const id = short || long;
    return id ? `https://www.youtube.com/embed/${id}` : "";
  }
  return "";
}

function buildFaq(title, location, type) {
  return [
    {
      question: `Why consider ${title}?`,
      answer: `${title} in ${location} offers strong positioning for buyers who want location clarity and future value.`
    },
    {
      question: `Is this ${type.toLowerCase()} suitable for immediate discussion?`,
      answer: "Yes. We can share site visit timing, documentation guidance, and next-step details."
    },
    {
      question: "Can I send an enquiry directly?",
      answer: "Yes. Use the enquiry form to share your name and mobile number and we will follow up."
    }
  ];
}

export function mapApiProperty(property) {
  const sizeLabel = property.size || (property.area ? `${property.area} sqft` : "On request");
  const sqft = property.area || getAreaFromSize(property.size) || "-";
  const type = property.propertyType || property.category || "Property";
  const description =
    property.description ||
    "Verified listing with documentation support, location guidance, and visit coordination.";
  const amenities = Array.isArray(property.amenities) ? property.amenities : [];
  const tags = buildTags({
    featured: property.featured,
    verified: property.verified,
    hotDeal: property.hotDeal,
    isNew: isRecent(property.createdAt)
  });

  return {
    id: property.id,
    title: property.title,
    location: property.location,
    type,
    listingMode: property.transactionType || "sale",
    featured: Boolean(property.featured),
    verified: property.verified !== false,
    hotDeal: Boolean(property.hotDeal),
    isNew: isRecent(property.createdAt),
    tags,
    price: formatPrice(property.price, property.transactionType),
    numericPrice: Number(property.price || 0),
    sizeLabel,
    plotSize: sizeLabel,
    sqft,
    beds: property.bedrooms ? String(property.bedrooms) : "-",
    baths: property.bathrooms ? String(property.bathrooms) : "-",
    facing: property.facing || "",
    useCase: type,
    dealLabel: property.hotDeal ? "Hot Deal" : "",
    benefits: amenities.length ? amenities.slice(0, 3) : [description],
    description,
    investmentPotential: description,
    overview: description,
    keyFeatures: amenities.length ? amenities : ["Verified documentation", "Location guidance", "Site visit support"],
    amenities: amenities.length ? amenities : ["Documentation support", "Visit coordination"],
    locationAdvantages: [
      property.location || "Chennai growth corridor",
      "Strong buyer demand",
      "Easy access and connectivity"
    ],
    legalDetails: "Documentation and verification support available on request.",
    pricingBreakdown: [
      property.transactionType === "rent"
        ? `Rent ${formatPrice(property.price, "rent")}`
        : `Price ${formatPrice(property.price, "sale")}`,
      sizeLabel
    ],
    faq: buildFaq(property.title, property.location, type),
    images:
      Array.isArray(property.images) && property.images.length ? property.images : fallbackImages,
    videoUrl: property.videoUrl || "",
    videoEmbedUrl: getEmbedUrl(property.videoUrl || ""),
    agentName: property.agentName || "ERP Group Company",
    agentPhone: property.agentPhone || property.contactNumber || "7299007799",
    contactNumber: property.contactNumber || "7299007799"
  };
}

function parseNumberInput(value) {
  if (!value) return 0;
  const cleaned = `${value}`.toLowerCase().replace(/,/g, "");
  const number = parseFloat(cleaned.match(/[\d.]+/)?.[0] || "0");
  if (cleaned.includes("crore")) return number * CRORE;
  if (cleaned.includes("lakh")) return number * LAKH;
  return Number.isFinite(number) ? number : 0;
}

export function toApiPayload(formState) {
  return {
    title: formState.title?.trim(),
    price: parseNumberInput(formState.price),
    location: formState.location?.trim(),
    category: formState.type?.trim() || "Land",
    size: formState.sizeLabel?.trim(),
    propertyType: formState.type?.trim() || "Land",
    area: parseNumberInput(formState.sqft),
    bedrooms: parseNumberInput(formState.bedrooms),
    bathrooms: parseNumberInput(formState.bathrooms),
    description:
      formState.overview?.trim() ||
      formState.investmentPotential?.trim() ||
      formState.benefits?.split("\n")[0]?.trim() ||
      "Details available on request.",
    facing: formState.facing?.trim() || "",
    transactionType: formState.listingMode || "sale",
    featured: Boolean(formState.featured),
    hotDeal: Boolean(formState.dealLabel),
    amenities: (formState.amenities || "").split("\n").join(","),
    images: (formState.images || "").split("\n").join(","),
    imageFiles: formState.imageFiles || [],
    videoUrl: formState.videoUrl?.trim() || "",
    contactNumber: formState.contactNumber?.trim() || "7299007799",
    agentPhone: formState.agentPhone?.trim() || "7299007799",
    agentName: formState.agentName?.trim() || "ERP Group Company"
  };
}

export function toFormState(property) {
  return {
    id: property.id || "",
    title: property.title || "",
    location: property.location || "",
    type: property.propertyType || property.category || "Land",
    listingMode: property.transactionType || "sale",
    budgetBucket: "below-50",
    featured: Boolean(property.featured),
    price: property.price ? formatPrice(property.price, property.transactionType) : "",
    sizeLabel: property.size || (property.area ? `${property.area} sqft` : ""),
    sqft: property.area ? String(property.area) : "",
    bedrooms: property.bedrooms ? String(property.bedrooms) : "",
    bathrooms: property.bathrooms ? String(property.bathrooms) : "",
    facing: property.facing || "",
    useCase: "",
    dealLabel: property.hotDeal ? "Hot Deal" : "",
    benefits: "",
    investmentPotential: property.description || "",
    overview: property.description || "",
    keyFeatures: "",
    amenities: Array.isArray(property.amenities) ? property.amenities.join("\n") : "",
    locationAdvantages: "",
    legalDetails: "",
    pricingBreakdown: "",
    images: Array.isArray(property.images) ? property.images.join("\n") : "",
    imageFiles: [],
    videoUrl: property.videoUrl || "",
    contactNumber: property.contactNumber || "7299007799",
    agentPhone: property.agentPhone || property.contactNumber || "7299007799",
    agentName: property.agentName || "ERP Group Company"
  };
}

export function buildPropertyEnquiryMessage(property, values) {
  return [
    "Hello ERP Group Company,",
    "",
    "I am interested in this property.",
    "",
    `Property: ${property.title}`,
    `Location: ${property.location}`,
    `Price: ${property.price}`,
    `Size: ${property.sizeLabel}`,
    "",
    "My Details:",
    `Name: ${values.name}`,
    `Mobile: ${values.mobile}`,
    "",
    "Please share more details."
  ].join("\n");
}

export function buildWhatsAppUrl(message) {
  return `https://wa.me/917299007799?text=${encodeURIComponent(message)}`;
}
