import { properties as defaultProperties } from "./properties";

export const PROPERTY_STORAGE_KEY = "erp-properties";

export function createSlug(value = "") {
  const cleaned = value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return cleaned || `property-${Date.now()}`;
}

export function parseMultiline(value = "") {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function stringifyMultiline(value = []) {
  return Array.isArray(value) ? value.join("\n") : "";
}

export function buildDefaultFaq(title, location, type) {
  return [
    {
      question: `Why consider ${title}?`,
      answer:
        `${title} in ${location} is positioned for buyers who want a stronger combination of location, value, and decision clarity.`
    },
    {
      question: `Is this ${type.toLowerCase()} suitable for serious buyers?`,
      answer:
        `Yes. This listing is structured for buyers who want clear highlights, practical sizing, and a better understanding of the opportunity before they proceed.`
    },
    {
      question: "Can I get help with the next step?",
      answer:
        "Yes. We can help with the call, site visit, shortlist review, and process guidance after your interest is confirmed."
    },
    {
      question: "Is the pricing explained clearly?",
      answer:
        "Yes. Key pricing points, value signals, and important decision details are surfaced before you move forward."
    },
    {
      question: "Can I compare this with other listings?",
      answer:
        "Yes. We can help compare this property against nearby options based on price, use case, and growth potential."
    }
  ];
}

export function getStoredProperties() {
  if (typeof window === "undefined") {
    return defaultProperties;
  }

  const stored = window.localStorage.getItem(PROPERTY_STORAGE_KEY);

  if (!stored) {
    return defaultProperties;
  }

  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProperties;
  } catch {
    return defaultProperties;
  }
}

export function saveStoredProperties(items) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(PROPERTY_STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("erp-properties-updated"));
}

export function resetStoredProperties() {
  saveStoredProperties(defaultProperties);
}

export function makePropertyPayload(formState) {
  const title = formState.title.trim();
  const location = formState.location.trim();
  const type = formState.type.trim();
  const sizeLabel = formState.sizeLabel.trim();

  return {
    id: formState.id?.trim() || createSlug(`${title}-${location}`),
    title,
    location,
    type,
    listingMode: formState.listingMode,
    budgetBucket: formState.budgetBucket,
    featured: Boolean(formState.featured),
    price: formState.price.trim(),
    sizeLabel,
    plotSize: sizeLabel,
    sqft: formState.sqft.trim(),
    facing: formState.facing.trim(),
    useCase: formState.useCase.trim(),
    dealLabel: formState.dealLabel.trim(),
    benefits: parseMultiline(formState.benefits),
    description: parseMultiline(formState.benefits)[0] || "",
    investmentPotential: formState.investmentPotential.trim(),
    overview: formState.overview.trim(),
    keyFeatures: parseMultiline(formState.keyFeatures),
    amenities: parseMultiline(formState.amenities),
    locationAdvantages: parseMultiline(formState.locationAdvantages),
    legalDetails: formState.legalDetails.trim(),
    pricingBreakdown: parseMultiline(formState.pricingBreakdown),
    faq: buildDefaultFaq(title, location, type),
    images: parseMultiline(formState.images)
  };
}

export function getEmptyPropertyForm() {
  return {
    id: "",
    title: "",
    location: "",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "below-50",
    featured: false,
    price: "",
    sizeLabel: "",
    sqft: "",
    facing: "",
    useCase: "",
    dealLabel: "",
    benefits: "",
    investmentPotential: "",
    overview: "",
    keyFeatures: "",
    amenities: "",
    locationAdvantages: "",
    legalDetails: "",
    pricingBreakdown: "",
    images: ""
  };
}

export function propertyToForm(property) {
  return {
    id: property.id || "",
    title: property.title || "",
    location: property.location || "",
    type: property.type || "Land",
    listingMode: property.listingMode || "sale",
    budgetBucket: property.budgetBucket || "below-50",
    featured: Boolean(property.featured),
    price: property.price || "",
    sizeLabel: property.sizeLabel || property.plotSize || "",
    sqft: property.sqft || "",
    facing: property.facing || "",
    useCase: property.useCase || "",
    dealLabel: property.dealLabel || "",
    benefits: stringifyMultiline(property.benefits),
    investmentPotential: property.investmentPotential || "",
    overview: property.overview || "",
    keyFeatures: stringifyMultiline(property.keyFeatures),
    amenities: stringifyMultiline(property.amenities),
    locationAdvantages: stringifyMultiline(property.locationAdvantages),
    legalDetails: property.legalDetails || "",
    pricingBreakdown: stringifyMultiline(property.pricingBreakdown),
    images: stringifyMultiline(property.images)
  };
}
