"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { company } from "../lib/content";
import { properties } from "../lib/properties";

const locations = ["All Locations", ...new Set(properties.map((property) => property.location))];
const types = ["All Types", ...new Set(properties.map((property) => property.type))];
const budgets = [
  { label: "All Budgets", value: "all" },
  { label: "Below Rs 50 Lakh", value: "below-50" },
  { label: "Rs 50 Lakh - Rs 1 Cr", value: "50-100" },
  { label: "Above Rs 1 Cr", value: "above-100" },
  { label: "Rental Deals", value: "rental" }
];

function matchesBudget(price, budget) {
  return budget === "all" || price === budget;
}

export default function PropertiesCatalog() {
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [budget, setBudget] = useState("all");

  const filtered = useMemo(
    () =>
      properties.filter((property) => {
        const locationOk = location === "All Locations" || property.location === location;
        const typeOk = type === "All Types" || property.type === type;
        const budgetOk = matchesBudget(property.budgetBucket, budget);
        return locationOk && typeOk && budgetOk;
      }),
    [location, type, budget]
  );

  return (
    <>
      <div className="card-white p-8">
        <h2 className="text-2xl font-semibold text-[#1E3A5F]">How to use the filters</h2>
        <p className="mt-4 text-base leading-8 text-[#6B7280]">
          Use location if you already have a preferred growth belt such as Tambaram or
          Guduvanchery. Use budget if you want to compare what is realistically available in your
          comfort range. Use property type if you are specifically looking for DTCP plots,
          residential plots, or long-term investment layouts. Filtering helps narrow the search,
          but our team can also help you compare options that may not be obvious from the screen
          alone.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="form-input"
          >
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="form-input"
          >
            {budgets.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="form-input"
          >
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
              <p className="text-sm font-medium text-[#2E7D32]">{property.location}</p>
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
                <p className="text-sm leading-7 text-[#6B7280]">
                  <span className="font-semibold text-[#1E3A5F]">Investment note:</span>{" "}
                  {property.investmentPotential}
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href={`/properties/${property.id}`}
                  className="link-pill text-center"
                >
                  View Details
                </Link>
                <a
                  href={company.phoneHref}
                  className="link-pill text-center"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
