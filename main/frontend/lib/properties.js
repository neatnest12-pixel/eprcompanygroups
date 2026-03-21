const gallery = {
  landA:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  landB:
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
  landC:
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  flatA:
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  flatB:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  flatC:
    "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
  interiorA:
    "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?auto=format&fit=crop&w=1200&q=80",
  interiorB:
    "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1200&q=80",
  commercial:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
};

function plotFaq(location) {
  return [
    {
      question: `Why is ${location} attractive for buyers?`,
      answer:
        `${location} continues to attract buyers because it combines location growth, visibility, and stronger future resale confidence.`
    },
    {
      question: "Is this good for long-term appreciation?",
      answer:
        "Yes. Well-located plotted assets generally work well for buyers who want flexibility, future construction control, and capital growth."
    },
    {
      question: "Do you support the paperwork and registration flow?",
      answer:
        "Yes. We help buyers from inquiry to site visit, documentation review, booking, and registration coordination."
    },
    {
      question: "Can I book a site visit quickly?",
      answer:
        "Yes. Serious buyers can arrange visits and next-step discussions directly with our team."
    },
    {
      question: "Will you explain the market comparison clearly?",
      answer:
        "Yes. We help buyers understand what makes the entry price strong compared to surrounding market activity."
    }
  ];
}

function rentalFaq(typeLabel) {
  return [
    {
      question: `Is this ${typeLabel.toLowerCase()} suitable for immediate move-in?`,
      answer:
        "Yes. We can help confirm current readiness, furnishing level, and visit timing before you proceed."
    },
    {
      question: "Can you arrange a viewing?",
      answer:
        "Yes. Viewings can be coordinated around current occupancy or owner availability."
    },
    {
      question: "Will rental terms be explained clearly?",
      answer:
        "Yes. We help clarify rent, advance, and agreement-stage expectations before commitment."
    },
    {
      question: "Is this better for families or professionals?",
      answer:
        "That depends on the exact inventory, but we help match the property to your lifestyle, commute, and space needs."
    },
    {
      question: "Can I compare multiple options in the same area?",
      answer:
        "Yes. We can help shortlist the strongest available options for your budget and preference."
    }
  ];
}

function buildTags({ featured, verified, hotDeal, isNew }) {
  const tags = [];
  if (featured) tags.push("FEATURED");
  if (verified) tags.push("VERIFIED");
  if (hotDeal) tags.push("HOT DEAL");
  if (isNew) tags.push("NEW");
  return tags;
}

function property({
  id,
  title,
  location,
  type,
  listingMode,
  budgetBucket,
  featured = false,
  verified = false,
  hotDeal = false,
  isNew = false,
  price,
  sizeLabel,
  sqft,
  beds = "-",
  baths = "-",
  facing,
  useCase,
  dealLabel,
  benefits,
  investmentPotential,
  overview,
  keyFeatures,
  amenities,
  locationAdvantages,
  legalDetails,
  pricingBreakdown,
  faq,
  images
}) {
  return {
    id,
    title,
    location,
    type,
    listingMode,
    budgetBucket,
    featured,
    verified,
    hotDeal,
    isNew,
    tags: buildTags({ featured, verified, hotDeal, isNew }),
    price,
    sizeLabel,
    plotSize: sizeLabel,
    sqft,
    beds,
    baths,
    facing,
    useCase,
    dealLabel,
    benefits,
    description: benefits[0],
    investmentPotential,
    overview,
    keyFeatures,
    amenities,
    locationAdvantages,
    legalDetails,
    pricingBreakdown,
    faq,
    images
  };
}

export const properties = [
  property({
    id: "omr-3-plots-10800",
    title: "Residential Land – 3 Plots (23, 24, 25)",
    location: "OMR, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "above-100",
    featured: true,
    verified: true,
    hotDeal: true,
    isNew: true,
    price: "Rs. 4.96 Crore",
    sizeLabel: "10,800 sqft | Plots 23, 24, 25",
    sqft: "10800",
    beds: "-",
    baths: "-",
    facing: "North | 33 ft road | Frontage 135 ft",
    useCase: "Premium investment and development",
    dealLabel: "Very Lowest Price",
    benefits: [
      "Very lowest rate in OMR",
      "Premium investment opportunity",
      "North-facing 33 ft road access"
    ],
    investmentPotential:
      "A large-format parcel with strong frontage, premium OMR positioning, and long-term appreciation potential.",
    overview:
      "Total area 10,800 sqft across plots 23, 24, and 25 with north-facing orientation and 33 feet road access.",
    keyFeatures: ["Plots 23-25 combined", "Frontage 135 feet", "Size 135 x 80"],
    amenities: ["Wide 33 ft road", "Clear frontage", "North-facing layout"],
    locationAdvantages: ["OMR growth corridor", "High buyer demand", "Main road connectivity"],
    legalDetails: "Documentation guidance and verification support available.",
    pricingBreakdown: ["Rate Rs. 4,600 per sqft", "Total Rs. 4.96 Crore", "Commission Rs. 10 Lakhs"],
    faq: plotFaq("OMR"),
    images: [gallery.landB, gallery.landA, gallery.landC]
  }),
  property({
    id: "flat-semmanchery",
    title: "Flat – Semmanchery",
    location: "Semmanchery, Chennai",
    type: "Flat",
    listingMode: "sale",
    budgetBucket: "above-100",
    featured: true,
    verified: true,
    isNew: true,
    price: "Rs. 1.4 Crore",
    sizeLabel: "3 BHK | 1600 sqft",
    sqft: "1600",
    beds: "3",
    baths: "2",
    facing: "11th Floor | East facing | 13 floors",
    useCase: "Premium family residence",
    dealLabel: "100+ amenities",
    benefits: [
      "Semi furnished",
      "11th floor east-facing unit",
      "100+ amenities available"
    ],
    investmentPotential:
      "A premium apartment in Semmanchery with strong end-user demand and resale potential.",
    overview:
      "3 BHK apartment with 1600 sqft layout, semi furnished interiors, and premium amenities.",
    keyFeatures: ["3 BHK layout", "1600 sqft", "East facing"],
    amenities: ["Lift", "Security", "Amenity access"],
    locationAdvantages: ["OMR connectivity", "Schools nearby", "Retail convenience"],
    legalDetails: "Clear title and buyer support through documentation.",
    pricingBreakdown: ["Price Rs. 1.4 Crore", "Registration charges as applicable"],
    faq: plotFaq("Semmanchery"),
    images: [gallery.flatA, gallery.flatB, gallery.flatC]
  }),
  property({
    id: "land-siruseri-850",
    title: "Land – Siruseri (850 sqft)",
    location: "Siruseri, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "50-100",
    verified: true,
    hotDeal: true,
    price: "Rs. 51 Lakhs",
    sizeLabel: "850 sqft (30 x 28)",
    sqft: "850",
    beds: "-",
    baths: "-",
    facing: "East + Corner | Near bus route",
    useCase: "Compact investment entry",
    dealLabel: "Corner plot",
    benefits: ["East-facing corner plot", "Near bus route", "Strong entry price"],
    investmentPotential:
      "Siruseri remains a high-attention corridor with steady appreciation and buyer demand.",
    overview:
      "850 sqft corner plot with east-facing orientation and bus route proximity.",
    keyFeatures: ["Corner plot", "30 x 28 size", "Bus route access"],
    amenities: ["Approach road", "Clear plot marking"],
    locationAdvantages: ["IT corridor presence", "OMR connectivity", "Residential demand"],
    legalDetails: "Approval and documentation assistance provided.",
    pricingBreakdown: ["Total Rs. 51 Lakhs"],
    faq: plotFaq("Siruseri"),
    images: [gallery.landA, gallery.landB, gallery.landC]
  }),
  property({
    id: "land-sembakkam",
    title: "Land – Sembakkam",
    location: "Sembakkam, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "below-50",
    verified: true,
    hotDeal: true,
    isNew: true,
    price: "Rs. 27.5 Lakhs onwards",
    sizeLabel: "2100 sqft (30 x 70) | Total 8600 sqft",
    sqft: "2100 - 8600",
    beds: "-",
    baths: "-",
    facing: "North facing",
    useCase: "Flexible land banking",
    dealLabel: "Multiple plots",
    benefits: ["2100 sqft plot option", "Total 8600 sqft available", "North facing"],
    investmentPotential:
      "Affordable entry in Sembakkam with flexible plot sizing and strong residential demand.",
    overview:
      "North-facing plots with 2100 sqft options and total 8600 sqft availability.",
    keyFeatures: ["2100 sqft option", "Total 8600 sqft", "North facing"],
    amenities: ["Road access", "Plot marking"],
    locationAdvantages: ["Neighborhood convenience", "Schools nearby", "Transit access"],
    legalDetails: "Pricing and documentation shared on enquiry.",
    pricingBreakdown: ["Rs. 27.5 Lakhs onwards"],
    faq: plotFaq("Sembakkam"),
    images: [gallery.landC, gallery.landA, gallery.landB]
  }),
  property({
    id: "land-vyasarpadi",
    title: "Land – Vyasarpadi",
    location: "Vyasarpadi, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "above-100",
    verified: true,
    price: "Rs. 1.2 Crore",
    sizeLabel: "2600 sqft (36 x 70)",
    sqft: "2600",
    beds: "-",
    baths: "-",
    facing: "North facing",
    useCase: "Urban land holding",
    dealLabel: "City-side land",
    benefits: ["North facing", "Large 2600 sqft parcel", "City-side connectivity"],
    investmentPotential:
      "Vyasarpadi offers urban proximity and a strong buyer base for premium land assets.",
    overview:
      "2600 sqft north-facing land parcel with strong access and connectivity.",
    keyFeatures: ["36 x 70 size", "North facing", "Urban access"],
    amenities: ["Main road connectivity", "Clear access"],
    locationAdvantages: ["Public transport", "Established neighborhood", "City convenience"],
    legalDetails: "Documentation support available during enquiry.",
    pricingBreakdown: ["Total Rs. 1.2 Crore"],
    faq: plotFaq("Vyasarpadi"),
    images: [gallery.landB, gallery.landC, gallery.landA]
  }),
  property({
    id: "land-kelambakkam",
    title: "Land – Kelambakkam",
    location: "Kelambakkam, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "50-100",
    verified: true,
    hotDeal: true,
    price: "Rs. 75 Lakhs",
    sizeLabel: "1800 sqft (30 x 60)",
    sqft: "1800",
    beds: "-",
    baths: "-",
    facing: "North facing",
    useCase: "OMR growth corridor buy",
    dealLabel: "OMR growth belt",
    benefits: ["North facing", "OMR growth belt", "Strong value entry"],
    investmentPotential:
      "Kelambakkam continues to grow as OMR expands, supporting steady demand for plotted assets.",
    overview:
      "North-facing 1800 sqft plot with strong OMR corridor access.",
    keyFeatures: ["30 x 60 size", "North facing", "OMR access"],
    amenities: ["Approach roads", "Residential surroundings"],
    locationAdvantages: ["OMR expansion", "Transit accessibility", "Future value"],
    legalDetails: "Documentation and approval guidance on request.",
    pricingBreakdown: ["Total Rs. 75 Lakhs"],
    faq: plotFaq("Kelambakkam"),
    images: [gallery.landA, gallery.landB, gallery.landC]
  }),
  property({
    id: "land-siruseri-2600",
    title: "Land – Siruseri (2600 sqft)",
    location: "Siruseri, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "above-100",
    verified: true,
    price: "Rs. 1.2 Crore",
    sizeLabel: "2600 sqft (40 x 64)",
    sqft: "2600",
    beds: "-",
    baths: "-",
    facing: "West road",
    useCase: "Large-format land banking",
    dealLabel: "West road plot",
    benefits: ["Large 2600 sqft plot", "West road access", "Build north layout"],
    investmentPotential:
      "Larger plots in Siruseri offer flexibility for premium construction and long-term holding.",
    overview:
      "2600 sqft land parcel with west road access and strong corridor visibility.",
    keyFeatures: ["40 x 64 size", "West road", "Build north"],
    amenities: ["Wide access", "Clear plot marking"],
    locationAdvantages: ["IT corridor demand", "OMR link", "Residential growth"],
    legalDetails: "All documentation support available.",
    pricingBreakdown: ["Total Rs. 1.2 Crore"],
    faq: plotFaq("Siruseri"),
    images: [gallery.landC, gallery.landA, gallery.landB]
  }),
  property({
    id: "flat-urbanrise-padur",
    title: "Flat – Urbanrise Padur",
    location: "Padur, Chennai",
    type: "Flat",
    listingMode: "sale",
    budgetBucket: "50-100",
    verified: true,
    price: "Rs. 65 Lakhs",
    sizeLabel: "2 BHK | 900 sqft",
    sqft: "900",
    beds: "2",
    baths: "2",
    facing: "15th floor",
    useCase: "Lifestyle apartment ownership",
    dealLabel: "Amenities available",
    benefits: ["2 BHK layout", "15th floor", "Premium amenities"],
    investmentPotential:
      "Amenity-led apartments in Padur remain relevant to both end-use buyers and investors.",
    overview:
      "2 BHK apartment with amenities and strong OMR connectivity.",
    keyFeatures: ["2 BHK", "900 sqft", "Amenities"],
    amenities: ["Security", "Lift", "Community facilities"],
    locationAdvantages: ["Padur connectivity", "OMR access", "Lifestyle community"],
    legalDetails: "Documentation support available.",
    pricingBreakdown: ["Total Rs. 65 Lakhs"],
    faq: plotFaq("Padur"),
    images: [gallery.flatB, gallery.flatA, gallery.flatC]
  }),
  property({
    id: "flat-perumbakkam",
    title: "Flat – Perumbakkam",
    location: "Perumbakkam, Chennai",
    type: "Flat",
    listingMode: "sale",
    budgetBucket: "below-50",
    verified: true,
    hotDeal: true,
    price: "Rs. 41 Lakhs",
    sizeLabel: "1 BHK | 650 sqft",
    sqft: "650",
    beds: "1",
    baths: "1",
    facing: "3rd floor",
    useCase: "Compact apartment buy",
    dealLabel: "Compact 1 BHK",
    benefits: ["1 BHK layout", "Affordable entry", "3rd floor"],
    investmentPotential:
      "Compact flats near residential pockets remain attractive for first-time buyers and investors.",
    overview:
      "1 BHK apartment with a compact layout and strong entry pricing.",
    keyFeatures: ["1 BHK", "650 sqft", "Affordable entry"],
    amenities: ["Lift access", "Parking"],
    locationAdvantages: ["Residential neighborhood", "School access", "Transit links"],
    legalDetails: "Documentation support available.",
    pricingBreakdown: ["Total Rs. 41 Lakhs"],
    faq: plotFaq("Perumbakkam"),
    images: [gallery.flatC, gallery.flatA, gallery.flatB]
  }),
  property({
    id: "rent-flats-padur",
    title: "Flats – Padur",
    location: "Padur, Chennai",
    type: "Flat",
    listingMode: "rent",
    budgetBucket: "rental",
    verified: true,
    isNew: true,
    price: "Rs. 30,000 – 40,000 / month",
    sizeLabel: "3 BHK | 1500–2000 sqft",
    sqft: "1500 - 2000",
    beds: "3",
    baths: "2",
    facing: "Semi / fully furnished",
    useCase: "Premium OMR rental",
    dealLabel: "Advance 5 months",
    benefits: ["Semi / fully furnished", "Advance 5 months", "OMR connectivity"],
    investmentPotential:
      "Padur rentals remain active with steady demand from families and professionals.",
    overview:
      "3 BHK rental inventory with furnished options and gated community access.",
    keyFeatures: ["3 BHK", "1500-2000 sqft", "Gated community"],
    amenities: ["Security", "Lift", "Community facilities"],
    locationAdvantages: ["OMR commute", "Popular rental catchment", "Family-friendly locality"],
    legalDetails: "Rental agreement guidance and visit scheduling available.",
    pricingBreakdown: ["Rent Rs. 30,000 – 40,000", "Advance 5 months"],
    faq: rentalFaq("flat"),
    images: [gallery.interiorA, gallery.flatA, gallery.flatB]
  }),
  property({
    id: "rent-house-kanathur",
    title: "House – Kanathur ECR",
    location: "Kanathur, Chennai",
    type: "House",
    listingMode: "rent",
    budgetBucket: "rental",
    verified: true,
    isNew: true,
    price: "Rs. 40,000 / month",
    sizeLabel: "4 BHK | 2000 sqft",
    sqft: "2000",
    beds: "4",
    baths: "3",
    facing: "Duplex",
    useCase: "Family rental",
    dealLabel: "ECR duplex",
    benefits: ["Duplex layout", "ECR location", "Spacious 2000 sqft"],
    investmentPotential:
      "ECR rentals remain attractive for families seeking space and lifestyle comfort.",
    overview:
      "4 BHK duplex house rental with spacious interiors and ECR access.",
    keyFeatures: ["4 BHK", "Duplex", "2000 sqft"],
    amenities: ["Parking", "Private space"],
    locationAdvantages: ["ECR connectivity", "Residential calm", "Beach corridor access"],
    legalDetails: "Rental terms shared on request.",
    pricingBreakdown: ["Rent Rs. 40,000 / month"],
    faq: rentalFaq("house"),
    images: [gallery.interiorB, gallery.flatB, gallery.flatA]
  }),
  property({
    id: "rent-commercial-pudhupakkam",
    title: "Commercial Land – Pudhupakkam",
    location: "Pudhupakkam, Chennai",
    type: "Commercial Land",
    listingMode: "rent",
    budgetBucket: "rental",
    verified: true,
    isNew: true,
    price: "Rs. 5,00,000 / month",
    sizeLabel: "50 cents | 100 ft frontage",
    sqft: "21780",
    beds: "-",
    baths: "-",
    facing: "Main road",
    useCase: "Commercial leasing",
    dealLabel: "Main road frontage",
    benefits: ["Main road exposure", "50 cents parcel", "100 ft frontage"],
    investmentPotential:
      "Main road commercial parcels offer strong visibility and business access.",
    overview:
      "Commercial land parcel with main road frontage and high visibility for leasing.",
    keyFeatures: ["50 cents", "100 ft frontage", "Main road access"],
    amenities: ["Vehicle access", "Frontage visibility"],
    locationAdvantages: ["OMR proximity", "Business exposure", "Growth corridor"],
    legalDetails: "Lease terms and usage clarity provided on enquiry.",
    pricingBreakdown: ["Rent Rs. 5,00,000 / month"],
    faq: rentalFaq("commercial land"),
    images: [gallery.commercial, gallery.landB, gallery.landA]
  })
];
