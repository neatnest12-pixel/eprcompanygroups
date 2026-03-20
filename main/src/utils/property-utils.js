const DAY_IN_MS = 24 * 60 * 60 * 1000;

export const FURNISHING_OPTIONS = [
  "Unfurnished",
  "Semi Furnished",
  "Fully Furnished"
];

export const PROPERTY_TYPE_OPTIONS = [
  "Residential Land",
  "Apartment",
  "Duplex House",
  "Villa",
  "Commercial Space",
  "Farm Land"
];

export const AMENITY_OPTIONS = [
  "Gated access",
  "OMR connectivity",
  "Wide road frontage",
  "CMDA-ready locality",
  "Lift",
  "Security",
  "Clubhouse",
  "Covered parking",
  "Rental ready",
  "Car parking",
  "Balcony",
  "Semi furnished",
  "24x7 water",
  "Near main road"
];

export const MAP_AREAS = [
  {
    id: "omr",
    name: "OMR Corridor",
    mapQuery: "Old Mahabalipuram Road Chennai",
    bounds: {
      latMin: 12.78,
      latMax: 12.89,
      lngMin: 80.20,
      lngMax: 80.24
    }
  },
  {
    id: "padur",
    name: "Padur",
    mapQuery: "Padur Chennai",
    bounds: {
      latMin: 12.84,
      latMax: 12.88,
      lngMin: 80.21,
      lngMax: 80.24
    }
  },
  {
    id: "ecr",
    name: "ECR",
    mapQuery: "East Coast Road Chennai",
    bounds: {
      latMin: 12.79,
      latMax: 12.83,
      lngMin: 80.24,
      lngMax: 80.27
    }
  },
  {
    id: "navallur",
    name: "Navallur",
    mapQuery: "Navallur Chennai",
    bounds: {
      latMin: 12.81,
      latMax: 12.84,
      lngMin: 80.21,
      lngMax: 80.24
    }
  }
];

export const SEO_LOCATION_PAGES = [
  {
    slug: "plots-for-sale-in-omr",
    title: "Plots for Sale in OMR | ERP Group Company",
    description:
      "Explore verified plots for sale in OMR with ERP Group Company, including investment-ready land options near Chennai's fastest-growing corridor.",
    locationKeyword: "OMR",
    category: "Plots",
    heading: "Plots for Sale in OMR"
  },
  {
    slug: "flats-for-sale-in-padur",
    title: "Flats for Sale in Padur | ERP Group Company",
    description:
      "Browse flats for sale in Padur with ERP Group Company, including compact and family homes close to IT hubs and education corridors.",
    locationKeyword: "Padur",
    category: "Apartments",
    heading: "Flats for Sale in Padur"
  },
  {
    slug: "villas-in-ecr",
    title: "Villas in ECR | ERP Group Company",
    description:
      "Find premium villas in ECR through ERP Group Company with beachside connectivity, spacious layouts, and premium neighbourhood access.",
    locationKeyword: "ECR",
    category: "Villas",
    heading: "Villas in ECR"
  },
  {
    slug: "plots-in-siruseri",
    title: "Plots in Siruseri | ERP Group Company",
    description:
      "Discover residential plots in Siruseri with ERP Group Company, ideal for investment and custom home construction in Chennai's growth corridor.",
    locationKeyword: "Siruseri",
    category: "Plots",
    heading: "Plots in Siruseri"
  }
];

export function getPropertyStatusLabels(property) {
  const labels = [];

  if (property.featured) {
    labels.push("Featured");
  }

  if (property.verified) {
    labels.push("Verified");
  }

  if (property.hotDeal) {
    labels.push("Hot Deal");
  }

  if (new Date(property.createdAt).getTime() >= Date.now() - 14 * DAY_IN_MS) {
    labels.push("New");
  }

  return labels;
}

export function isPropertyInBounds(property, bounds) {
  if (!bounds || !property.latitude || !property.longitude) {
    return true;
  }

  return (
    property.latitude >= bounds.latMin &&
    property.latitude <= bounds.latMax &&
    property.longitude >= bounds.lngMin &&
    property.longitude <= bounds.lngMax
  );
}

export function filterProperties(properties, filters) {
  return properties.filter((property) => {
    const keyword = filters.keywords?.trim().toLowerCase() || "";
    const matchesKeyword =
      !keyword ||
      [
        property.title,
        property.description,
        property.location,
        property.category,
        property.propertyType
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);

    const matchesLocation =
      !filters.location ||
      property.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesCategory = !filters.category || property.category === filters.category;
    const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    const matchesArea = !filters.area || property.area >= Number(filters.area);
    const matchesBedrooms =
      !filters.bedrooms || property.bedrooms >= Number(filters.bedrooms);
    const matchesBathrooms =
      !filters.bathrooms || property.bathrooms >= Number(filters.bathrooms);
    const matchesFurnishing =
      !filters.furnishing || property.furnishing === filters.furnishing;
    const matchesPropertyType =
      !filters.propertyType || property.propertyType === filters.propertyType;
    const matchesAmenities =
      !filters.amenities?.length ||
      filters.amenities.every((amenity) => property.amenities.includes(amenity));

    return (
      matchesKeyword &&
      matchesLocation &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesArea &&
      matchesBedrooms &&
      matchesBathrooms &&
      matchesFurnishing &&
      matchesPropertyType &&
      matchesAmenities
    );
  });
}

export function getSeoLocationPage(slug) {
  return SEO_LOCATION_PAGES.find((page) => page.slug === slug) ?? null;
}

export function getMapArea(areaId) {
  return MAP_AREAS.find((area) => area.id === areaId) ?? MAP_AREAS[0];
}
