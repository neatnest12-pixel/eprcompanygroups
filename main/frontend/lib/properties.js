const gallery = {
  landA:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  landB:
    "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
  landC:
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=80",
  flatA:
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
  flatB:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  flatC:
    "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1200&q=80",
  villaA:
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  road:
    "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80"
};

function plotFaq(location) {
  return [
    {
      question: `Why is ${location} attractive for buyers?`,
      answer:
        `${location} continues to attract buyers because it combines location growth, search visibility, and stronger future resale confidence.`
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

function property({
  id,
  title,
  location,
  type,
  listingMode,
  budgetBucket,
  featured = false,
  price,
  sizeLabel,
  sqft,
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
    price,
    sizeLabel,
    plotSize: sizeLabel,
    sqft,
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
    id: "tambaram-grand-enclave",
    title: "Tambaram Grand Enclave",
    location: "Tambaram, Chennai",
    type: "DTCP Plot",
    listingMode: "sale",
    budgetBucket: "50-100",
    featured: true,
    price: "Rs 52 Lakhs onwards",
    sizeLabel: "900 - 1500 sq.ft",
    sqft: "1500",
    facing: "Premium facings available",
    useCase: "Future home and land banking",
    dealLabel: "Trusted Tambaram plotted address",
    benefits: [
      "Close to Tambaram transport hub and family demand",
      "Suitable for own use and long-term hold",
      "High location familiarity improves resale confidence"
    ],
    investmentPotential:
      "Tambaram remains one of Chennai's strongest end-user led markets, which supports long-term confidence for plotted buyers.",
    overview:
      "A trusted plotted layout for buyers who want a known suburban market with strong transport links and everyday convenience.",
    keyFeatures: [
      "Well-marked plots",
      "Road access",
      "End-user friendly positioning"
    ],
    amenities: ["Blacktop roads", "Street lighting", "Structured layout planning"],
    locationAdvantages: [
      "Rail and bus connectivity",
      "Schools and retail nearby",
      "Strong buyer recognition"
    ],
    legalDetails:
      "Positioned for buyers who want better documentation comfort before taking the next step.",
    pricingBreakdown: [
      "Starts from Rs 52 Lakhs onwards",
      "Final value varies by size and facing",
      "Registration charges apply separately"
    ],
    faq: plotFaq("Tambaram"),
    images: [gallery.landA, gallery.landB, gallery.landC]
  }),
  property({
    id: "guduvanchery-growth-corridor",
    title: "Guduvanchery Growth Corridor Plots",
    location: "Guduvanchery, Chennai",
    type: "DTCP Plot",
    listingMode: "sale",
    budgetBucket: "below-50",
    featured: true,
    price: "Rs 34 Lakhs onwards",
    sizeLabel: "800 - 1400 sq.ft",
    sqft: "1400",
    facing: "Multiple facing options",
    useCase: "Affordable plotted entry",
    dealLabel: "DTCP-focused value zone",
    benefits: [
      "Affordable entry point for first-time investors",
      "Popular among buyers searching for DTCP plots",
      "Growth story linked to the southern corridor"
    ],
    investmentPotential:
      "Guduvanchery remains one of the most searched land markets because it still offers relatively accessible entry with future upside.",
    overview:
      "A practical plotted option for buyers who want Chennai growth potential without entering at a premium price point.",
    keyFeatures: ["Investor-friendly pricing", "Practical sizes", "Southern corridor visibility"],
    amenities: ["Road access", "Layout planning", "Residential growth surroundings"],
    locationAdvantages: ["GST Road influence", "High search demand", "Strong affordability story"],
    legalDetails:
      "DTCP awareness and document clarity are central for Guduvanchery buyers, and that support is part of our process.",
    pricingBreakdown: [
      "Starts from Rs 34 Lakhs onwards",
      "Final value depends on exact plot and road position",
      "Registration and statutory charges apply separately"
    ],
    faq: plotFaq("Guduvanchery"),
    images: [gallery.landB, gallery.road, gallery.landC]
  }),
  property({
    id: "vandalur-golden-acre",
    title: "Vandalur Golden Acre",
    location: "Vandalur, Chennai",
    type: "Premium Plot",
    listingMode: "sale",
    budgetBucket: "50-100",
    featured: true,
    price: "Rs 41 Lakhs onwards",
    sizeLabel: "900 - 1800 sq.ft",
    sqft: "1800",
    facing: "Premium-facing options",
    useCase: "Premium suburban ownership",
    dealLabel: "Fast-moving suburban layout",
    benefits: [
      "Strong family-buyer appeal",
      "Good fit for future villa construction",
      "Visible market confidence in Vandalur"
    ],
    investmentPotential:
      "Vandalur's improving connectivity and buyer visibility continue to support medium- and long-term appreciation.",
    overview:
      "A premium plotted option in a corridor that balances present accessibility with future value potential.",
    keyFeatures: ["Premium layout feel", "Flexible sizes", "Recognized suburban market"],
    amenities: ["Access roads", "Layout support", "Residential surroundings"],
    locationAdvantages: ["Growing route access", "Family visibility", "Better suburban pricing"],
    legalDetails:
      "Ideal for buyers who want a location-led deal with cleaner transaction support from the start.",
    pricingBreakdown: [
      "Starts from Rs 41 Lakhs onwards",
      "Price changes by exact plot specification",
      "Closing charges depend on final booking value"
    ],
    faq: plotFaq("Vandalur"),
    images: [gallery.landC, gallery.villaA, gallery.landB]
  }),
  property({
    id: "chengalpattu-future-city",
    title: "Chengalpattu Future City Plots",
    location: "Chengalpattu, Chennai",
    type: "Investment Plot",
    listingMode: "sale",
    budgetBucket: "below-50",
    featured: true,
    price: "Rs 29 Lakhs onwards",
    sizeLabel: "1000 - 2400 sq.ft",
    sqft: "2400",
    facing: "Flexible inventory",
    useCase: "Long-hold investment",
    dealLabel: "Large-size value entry",
    benefits: [
      "Attractive for patient investors",
      "Larger plot options in a growth corridor",
      "Strong future-value narrative"
    ],
    investmentPotential:
      "Chengalpattu suits buyers who want to enter early in a market before broader price acceleration deepens.",
    overview:
      "A long-term land strategy option for buyers who want scale, affordability, and future market upside.",
    keyFeatures: ["Large plot formats", "Outer-belt growth story", "Value-led entry pricing"],
    amenities: ["Road access", "Open layout planning", "Development-ready positioning"],
    locationAdvantages: ["Emerging growth belt", "Better size-to-cost ratio", "Investor interest rising"],
    legalDetails:
      "Long-hold investors still need documentation clarity, and that support remains part of our service model.",
    pricingBreakdown: [
      "Starts from Rs 29 Lakhs onwards",
      "Larger plots available within the layout",
      "Registration charges vary by final plot choice"
    ],
    faq: plotFaq("Chengalpattu"),
    images: [gallery.landA, gallery.road, gallery.flatC]
  }),
  property({
    id: "omr-discount-land-deal",
    title: "OMR Discount Land Deal",
    location: "OMR Corridor, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "above-100",
    featured: true,
    price: "Rs 4,700 / sq.ft | Total Rs 1.2 Cr",
    sizeLabel: "2600 sq.ft (36 x 70)",
    sqft: "2600",
    facing: "North Facing | Near Bus Route",
    useCase: "Premium plotted investment",
    dealLabel: "Market Rs 6,000 - discount deal",
    benefits: [
      "Large-size premium parcel",
      "Below nearby market comparison",
      "Better bus-route accessibility"
    ],
    investmentPotential:
      "Large-format land parcels with below-market entry can create stronger upside when corridor demand continues to mature.",
    overview:
      "A premium OMR-side land opportunity for buyers who want a sharper entry point in a high-attention corridor.",
    keyFeatures: ["2600 sq.ft size", "36 x 70 dimension", "North-facing layout"],
    amenities: ["Approach road access", "Bus-route proximity", "Build-friendly parcel depth"],
    locationAdvantages: ["OMR market visibility", "Transport access", "Premium site-visit appeal"],
    legalDetails:
      "Best suited for buyers who want a direct deal with better process clarity before a higher-ticket commitment.",
    pricingBreakdown: [
      "Rate fixed at Rs 4,700 per sq.ft",
      "Total approximately Rs 1.2 Cr",
      "Nearby comparison quoted around Rs 6,000 per sq.ft"
    ],
    faq: plotFaq("the OMR corridor"),
    images: [gallery.landA, gallery.road, gallery.landC]
  }),
  property({
    id: "padur-rental-flats",
    title: "Flats for Rent - Padur (OMR)",
    location: "Padur, Chennai",
    type: "Flat",
    listingMode: "rent",
    budgetBucket: "rental",
    featured: true,
    price: "Rent Rs 30K - Rs 40K",
    sizeLabel: "3 BHK | 1500 - 2000 sq.ft",
    sqft: "1500 - 2000",
    facing: "Semi / Fully Furnished | Gated Community",
    useCase: "Premium family rental",
    dealLabel: "Advance 5 months",
    benefits: [
      "3 BHK rental inventory on OMR",
      "Semi-furnished and fully furnished options",
      "Gated community comfort"
    ],
    investmentPotential:
      "Padur rentals remain active because OMR professionals and families consistently search for larger gated-community apartments.",
    overview:
      "A premium Padur rental shortlist for families and professionals who want space, community, and OMR access.",
    keyFeatures: ["3 BHK layouts", "1500 to 2000 sq.ft", "Gated community lifestyle"],
    amenities: ["Security", "Lift", "Community-ready living"],
    locationAdvantages: ["OMR commute convenience", "Popular rental catchment", "Family-friendly locality"],
    legalDetails:
      "Rental support includes guidance on advance, furnishing expectations, and agreement-stage clarity.",
    pricingBreakdown: [
      "Rent between Rs 30,000 and Rs 40,000",
      "Advance around 5 months",
      "Final rent depends on furnishing and community specification"
    ],
    faq: rentalFaq("flat"),
    images: [gallery.flatA, gallery.flatB, gallery.flatC]
  }),
  property({
    id: "pudhupakkam-commercial-land",
    title: "Commercial Land - Pudhupakkam",
    location: "Pudhupakkam, Chennai",
    type: "Commercial Land",
    listingMode: "rent",
    budgetBucket: "rental",
    price: "Rent Rs 5 Lakhs",
    sizeLabel: "50 cents | 100 ft frontage",
    sqft: "21780",
    facing: "Main Road",
    useCase: "Commercial leasing",
    dealLabel: "High-visibility frontage deal",
    benefits: [
      "50 cents of commercial land",
      "100 ft frontage for visibility",
      "Direct main-road access"
    ],
    investmentPotential:
      "Commercial frontage sites in visible road positions can attract premium tenant and operator interest.",
    overview:
      "A scale commercial frontage opportunity for operators who need exposure, access, and flexible land use.",
    keyFeatures: ["50 cents size", "100 ft frontage", "Main-road commercial profile"],
    amenities: ["Direct road exposure", "Vehicle-friendly access", "Commercial visibility"],
    locationAdvantages: ["Expanding corridor relevance", "Useful for branded presence", "Better inspection appeal"],
    legalDetails:
      "Commercial leasing needs clearer conversation around use case, frontage, and tenure, and we help structure that process.",
    pricingBreakdown: [
      "Quoted rent at Rs 5 Lakhs",
      "Terms depend on intended commercial use",
      "Final lease structure can be discussed post visit"
    ],
    faq: rentalFaq("commercial land"),
    images: [gallery.road, gallery.landB, gallery.flatC]
  }),
  property({
    id: "kelambakkam-land-deal",
    title: "Land - Kelambakkam (OMR)",
    location: "Kelambakkam, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "50-100",
    featured: true,
    price: "Rs 4,200 / sq.ft | Rs 75 Lakhs",
    sizeLabel: "1800 sq.ft (30 x 60)",
    sqft: "1800",
    facing: "North Facing | Near Bus Terminus",
    useCase: "Lowest-entry OMR land buy",
    dealLabel: "Nearby Rs 7,000 - very low price",
    benefits: [
      "Bus-terminus proximity",
      "North-facing plot dimensions",
      "Low entry against nearby market rate"
    ],
    investmentPotential:
      "Kelambakkam continues to attract buyers because better-value entries can reprice quickly as OMR demand deepens.",
    overview:
      "A value-led OMR-side plot for buyers who want premium corridor access without paying nearby market benchmarks.",
    keyFeatures: ["1800 sq.ft size", "30 x 60 dimension", "North-facing plot"],
    amenities: ["Transport-linked access", "Build-friendly size", "Good entry-point psychology"],
    locationAdvantages: ["OMR growth story", "Better accessibility", "Value against surrounding price points"],
    legalDetails:
      "Suitable for buyers who want a price-led opportunity backed by straightforward process support.",
    pricingBreakdown: [
      "Rate at Rs 4,200 per sq.ft",
      "Total approximately Rs 75 Lakhs",
      "Nearby comparison indicated around Rs 7,000 per sq.ft"
    ],
    faq: plotFaq("Kelambakkam"),
    images: [gallery.landB, gallery.road, gallery.landC]
  }),
  property({
    id: "siruseri-large-plot",
    title: "Land - Siruseri (Large Plot)",
    location: "Siruseri, Chennai",
    type: "Land",
    listingMode: "sale",
    budgetBucket: "above-100",
    price: "Rs 4,600 / sq.ft | Total Rs 1.2 Cr",
    sizeLabel: "2600 sq.ft (40 x 64)",
    sqft: "2600",
    facing: "West Road | Build North Facing",
    useCase: "Premium OMR land banking",
    dealLabel: "Large-format premium plot",
    benefits: [
      "Large plot for premium construction",
      "Strong Siruseri corridor visibility",
      "Useful for both build and hold strategies"
    ],
    investmentPotential:
      "Siruseri remains a premium OMR-linked zone where larger plots can appeal strongly to investors and villa buyers.",
    overview:
      "A larger-format plotted asset for buyers who want more size, more flexibility, and a more premium position inside the OMR ecosystem.",
    keyFeatures: ["2600 sq.ft parcel", "40 x 64 dimension", "North-build planning advantage"],
    amenities: ["Road-linked access", "Premium site feel", "Good construction flexibility"],
    locationAdvantages: ["IT-corridor influence", "Premium buyer visibility", "Long-term corridor strength"],
    legalDetails:
      "Higher-ticket plotted deals need better process confidence, so documentation and transaction clarity remain key.",
    pricingBreakdown: [
      "Rate at Rs 4,600 per sq.ft",
      "Total value around Rs 1.2 Cr",
      "Final structuring depends on due diligence and booking terms"
    ],
    faq: plotFaq("Siruseri"),
    images: [gallery.landA, gallery.villaA, gallery.landC]
  }),
  property({
    id: "urbanrise-padur-flat",
    title: "Flat - Urbanrise Padur",
    location: "Padur, Chennai",
    type: "Flat",
    listingMode: "sale",
    budgetBucket: "50-100",
    price: "Rs 65 Lakhs",
    sizeLabel: "2 BHK | 900 sq.ft",
    sqft: "900",
    facing: "15th Floor of 19 | 100+ amenities",
    useCase: "Lifestyle apartment ownership",
    dealLabel: "High-amenity apartment buy",
    benefits: [
      "Urbanrise community appeal",
      "2 BHK compact ownership",
      "Strong Padur lifestyle positioning"
    ],
    investmentPotential:
      "Amenity-led apartments in Padur remain relevant to both end-use buyers and investors targeting OMR-linked demand.",
    overview:
      "A lifestyle apartment option for buyers who want a branded residential environment with practical OMR connectivity.",
    keyFeatures: ["2 BHK configuration", "900 sq.ft size", "15th-floor placement"],
    amenities: ["100+ community amenities", "Security", "Lift convenience"],
    locationAdvantages: ["Padur rental and resale visibility", "OMR access", "Brand-led buyer confidence"],
    legalDetails:
      "Flat buyers are supported with clarity on pricing, community positioning, and transaction-stage expectations.",
    pricingBreakdown: [
      "Quoted at Rs 65 Lakhs",
      "Registration and maintenance vary by project terms",
      "Final numbers can be reviewed with the current unit owner or channel"
    ],
    faq: plotFaq("Padur"),
    images: [gallery.flatA, gallery.flatB, gallery.flatC]
  }),
  property({
    id: "kanathur-duplex-rental",
    title: "House for Rent - Kanathur (ECR)",
    location: "Kanathur, Chennai",
    type: "House for Rent",
    listingMode: "rent",
    budgetBucket: "rental",
    price: "Rs 40,000 / month",
    sizeLabel: "4 BHK Duplex | 2000 sq.ft",
    sqft: "2000",
    facing: "Semi Furnished",
    useCase: "Premium family rental",
    dealLabel: "ECR duplex lifestyle rental",
    benefits: [
      "4 BHK duplex format",
      "Semi-furnished family-ready layout",
      "ECR-side premium living feel"
    ],
    investmentPotential:
      "Larger duplex rentals in lifestyle corridors remain attractive for families wanting more space than a standard apartment can offer.",
    overview:
      "A premium rental home for families who want a more spacious, more private ECR-side living experience.",
    keyFeatures: ["4 BHK duplex", "2000 sq.ft area", "Semi-furnished setup"],
    amenities: ["Independent-home style space", "Family room count", "Lifestyle corridor access"],
    locationAdvantages: ["ECR desirability", "Useful for family tenants", "Better premium perception"],
    legalDetails:
      "Rental coordination includes move-in clarity, furnishing expectations, and agreement-stage support.",
    pricingBreakdown: [
      "Monthly rent Rs 40,000",
      "Advance and agreement terms on request",
      "Visit slots available by appointment"
    ],
    faq: rentalFaq("house"),
    images: [gallery.villaA, gallery.flatB, gallery.landA]
  }),
  property({
    id: "perumbakkam-compact-flat",
    title: "Flat - Perumbakkam",
    location: "Perumbakkam, Chennai",
    type: "Flat",
    listingMode: "sale",
    budgetBucket: "below-50",
    price: "Rs 41 Lakhs",
    sizeLabel: "1 BHK | 650 sq.ft",
    sqft: "650",
    facing: "3rd Floor | Opposite International School",
    useCase: "Compact apartment investment",
    dealLabel: "Accessible first-buy flat",
    benefits: [
      "Compact 1 BHK apartment",
      "Opposite international school",
      "Useful first apartment or rental investment"
    ],
    investmentPotential:
      "Compact flats near schools and residential pockets often remain easier to position for both owner-users and smaller investors.",
    overview:
      "A practical apartment-buying option for first-time buyers who want a manageable ticket size with everyday convenience.",
    keyFeatures: ["1 BHK plan", "650 sq.ft size", "3rd-floor placement"],
    amenities: ["School-facing convenience", "Compact budget", "Usable apartment layout"],
    locationAdvantages: ["Perumbakkam family relevance", "School access", "Better entry affordability"],
    legalDetails:
      "Apartment purchase guidance includes owner-side coordination, title clarity, and transaction-stage assistance.",
    pricingBreakdown: [
      "Quoted at Rs 41 Lakhs",
      "Registration charges apply separately",
      "Final structure depends on owner-side terms"
    ],
    faq: plotFaq("Perumbakkam"),
    images: [gallery.flatA, gallery.flatC, gallery.flatB]
  })
];
