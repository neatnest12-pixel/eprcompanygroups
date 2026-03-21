"use client";

import { useEffect, useMemo, useState } from "react";
import { company } from "../lib/content";
import { getStoredProperties } from "../lib/propertyStore";

const budgets = [
  { label: "All Budgets", value: "all" },
  { label: "Below Rs 50 Lakh", value: "below-50" },
  { label: "Rs 50 Lakh - Rs 1 Cr", value: "50-100" },
  { label: "Above Rs 1 Cr", value: "above-100" },
  { label: "Rental Deals", value: "rental" }
];

function matchesBudget(value, budget) {
  return budget === "all" || value === budget;
}

export default function PropertiesCatalog() {
  const [allProperties, setAllProperties] = useState([]);
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [budget, setBudget] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const syncProperties = () => {
      setAllProperties(getStoredProperties());
    };

    syncProperties();
    window.addEventListener("erp-properties-updated", syncProperties);

    return () => window.removeEventListener("erp-properties-updated", syncProperties);
  }, []);

  const locations = useMemo(
    () => ["All Locations", ...new Set(allProperties.map((property) => property.location))],
    [allProperties]
  );

  const types = useMemo(
    () => ["All Types", ...new Set(allProperties.map((property) => property.type))],
    [allProperties]
  );

  const filtered = useMemo(
    () =>
      allProperties.filter((property) => {
        const locationOk = location === "All Locations" || property.location === location;
        const typeOk = type === "All Types" || property.type === type;
        const budgetOk = matchesBudget(property.budgetBucket, budget);
        return locationOk && typeOk && budgetOk;
      }),
    [allProperties, location, type, budget]
  );

  return (
    <>
      <div className="card-white p-8">
        <h2 className="text-2xl font-semibold text-[#1E3A5F]">How to use the filters</h2>
        <p className="mt-4 text-base leading-8 text-[#6B7280]">
          Use location if you already have a preferred growth belt such as Tambaram or
          Guduvanchery. Use budget if you want to compare what is realistically available in your
          comfort range. Use property type if you are specifically looking for plots, flats,
          rentals, or commercial inventory. Filtering helps narrow the search, but our team can
          still help you compare options that may not be obvious from the screen alone.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <select value={location} onChange={(event) => setLocation(event.target.value)} className="form-input">
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select value={budget} onChange={(event) => setBudget(event.target.value)} className="form-input">
            {budgets.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select value={type} onChange={(event) => setType(event.target.value)} className="form-input">
            {types.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((property) => (
          <div key={property.id} className="card-white overflow-hidden hover-lift group">
            <img
              src={property.images[0]}
              alt={`${property.title} in ${property.location}`}
              className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#1E3A5F]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3A5F]">
                  {property.listingMode === "rent" ? "For Rent" : "For Sale"}
                </span>
                {property.dealLabel ? (
                  <span className="rounded-full bg-[#C9A24A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A24A]">
                    {property.dealLabel}
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm font-medium text-[#2E7D32]">{property.location}</p>
              <h3 className="mt-2 text-xl font-semibold text-[#1E3A5F]">{property.title}</h3>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-[#6B7280]">
                <span className="rounded-full bg-[#F5F7FA] px-3 py-1 text-[#C9A24A]">{property.price}</span>
                <span className="rounded-full bg-[#F5F7FA] px-3 py-1">{property.sizeLabel}</span>
                <span className="rounded-full bg-[#F5F7FA] px-3 py-1">{property.type}</span>
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-sm leading-7 text-[#6B7280]">
                  <span className="font-semibold text-[#1E3A5F]">Benefits:</span>{" "}
                  {property.benefits.join(". ")}.
                </p>
                <p className="text-sm leading-7 text-[#6B7280]">
                  <span className="font-semibold text-[#1E3A5F]">Facing / highlights:</span>{" "}
                  {property.facing}
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <button type="button" onClick={() => setSelectedProperty(property)} className="link-pill text-center">
                  View Details
                </button>
                <a href={company.phoneHref} className="link-pill text-center">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProperty ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1E3A5F]/65 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-auto rounded-[28px] bg-white shadow-[0_28px_80px_rgba(30,58,95,0.24)]">
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E5EAF1] bg-white px-6 py-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-[#C9A24A]">Property Detail</p>
                <h3 className="mt-1 text-2xl font-semibold text-[#1E3A5F]">{selectedProperty.title}</h3>
              </div>
              <button type="button" onClick={() => setSelectedProperty(null)} className="link-pill">
                Close
              </button>
            </div>

            <div className="grid gap-8 p-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="space-y-4">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  className="h-72 w-full rounded-[24px] object-cover"
                />
                <div className="grid gap-4 md:grid-cols-2">
                  {selectedProperty.images.slice(1, 3).map((image) => (
                    <img key={image} src={image} alt={selectedProperty.title} className="h-40 w-full rounded-[20px] object-cover" />
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#1E3A5F]/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3A5F]">
                      {selectedProperty.listingMode === "rent" ? "For Rent" : "For Sale"}
                    </span>
                    {selectedProperty.dealLabel ? (
                      <span className="rounded-full bg-[#C9A24A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A24A]">
                        {selectedProperty.dealLabel}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm font-medium text-[#2E7D32]">{selectedProperty.location}</p>
                  <p className="mt-3 text-2xl font-semibold text-[#C9A24A]">{selectedProperty.price}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="surface-soft p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#2E7D32]">Size</p>
                    <p className="mt-2 font-semibold text-[#1E3A5F]">{selectedProperty.sizeLabel}</p>
                  </div>
                  <div className="surface-soft p-4">
                    <p className="text-xs uppercase tracking-[0.16em] text-[#2E7D32]">Facing / format</p>
                    <p className="mt-2 font-semibold text-[#1E3A5F]">{selectedProperty.facing}</p>
                  </div>
                </div>

                <p className="text-base leading-8 text-[#6B7280]">{selectedProperty.overview}</p>
                <p className="text-base leading-8 text-[#6B7280]">
                  <span className="font-semibold text-[#1E3A5F]">Best use:</span> {selectedProperty.useCase}
                </p>
                <p className="text-base leading-8 text-[#6B7280]">
                  <span className="font-semibold text-[#1E3A5F]">Investment potential:</span>{" "}
                  {selectedProperty.investmentPotential}
                </p>

                <div>
                  <h4 className="text-lg font-semibold text-[#1E3A5F]">Key highlights</h4>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {selectedProperty.keyFeatures.map((item) => (
                      <span key={item} className="pill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={company.phoneHref} className="btn-gold">
                    Call {company.phone}
                  </a>
                  <a href={company.whatsappHref} className="btn-outline">
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
