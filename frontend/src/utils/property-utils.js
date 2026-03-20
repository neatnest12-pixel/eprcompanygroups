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
    title: "Plots for Sale in OMR Chennai | ERP Group Company",
    description:
      "Explore OMR plots, Chennai real estate opportunities, and investment property options with ERP Group Company in the fast-growing OMR corridor.",
    keywords:
      "OMR plots, Chennai real estate, investment property, plots for sale in OMR, land in OMR Chennai",
    locationKeyword: "OMR",
    category: "Plots",
    heading: "Plots for Sale in OMR Chennai",
    shortLocation: "OMR",
    nearbyLocations: ["Navalur", "Siruseri", "Sholinganallur", "Padur"]
  },
  {
    slug: "flats-for-sale-in-padur",
    title: "Flats for Sale in Padur Chennai | ERP Group Company",
    description:
      "Find flats for sale in Padur with ERP Group Company, featuring Chennai real estate options near SIPCOT, OMR, and leading education hubs.",
    keywords:
      "flats in Padur, Chennai real estate, investment property, apartments in Padur, homes near OMR",
    locationKeyword: "Padur",
    category: "Apartments",
    heading: "Flats for Sale in Padur Chennai",
    shortLocation: "Padur",
    nearbyLocations: ["Kelambakkam", "Navalur", "OMR", "Siruseri"]
  },
  {
    slug: "villas-for-sale-in-ecr",
    title: "Villas for Sale in ECR Chennai | ERP Group Company",
    description:
      "Discover villas for sale in ECR through ERP Group Company with premium Chennai real estate options and long-term investment property value.",
    keywords:
      "villas in ECR, Chennai real estate, investment property, villas for sale in ECR, beachside homes Chennai",
    locationKeyword: "ECR",
    category: "Villas",
    heading: "Villas for Sale in ECR Chennai",
    shortLocation: "ECR",
    nearbyLocations: ["Kanathur", "Injambakkam", "Uthandi", "Neelankarai"]
  },
  {
    slug: "plots-in-siruseri",
    title: "Plots in Siruseri Chennai | ERP Group Company",
    description:
      "Browse plots in Siruseri with ERP Group Company for Chennai real estate buyers seeking strong investment property potential near OMR.",
    keywords:
      "plots in Siruseri, Chennai real estate, investment property, Siruseri land, OMR plots",
    locationKeyword: "Siruseri",
    category: "Plots",
    heading: "Plots in Siruseri Chennai",
    shortLocation: "Siruseri",
    nearbyLocations: ["Navalur", "Kelambakkam", "Padur", "OMR"]
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
