"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { properties } from "../../lib/properties";

const locations = ["All", "ECR, Chennai", "OMR, Chennai", "Siruseri, Chennai", "Padur, Chennai"];
const types = ["All", "Villa", "Apartment", "Plot"];
const budgets = ["All", "Under Rs 60 Lakh", "Rs 60L - Rs 1Cr", "Rs 1Cr+"];

function matchesBudget(price, budget) {
  if (budget === "All") return true;
  if (budget === "Under Rs 60 Lakh") return price.includes("45") || price.includes("55");
  if (budget === "Rs 60L - Rs 1Cr") return price.includes("78") || price.includes("92");
  if (budget === "Rs 1Cr+") return price.includes("1.25");
  return true;
}

export default function PropertiesPage() {
  const [location, setLocation] = useState("All");
  const [type, setType] = useState("All");
  const [budget, setBudget] = useState("All");

  const filtered = useMemo(
    () =>
      properties.filter((property) => {
        const matchLocation = location === "All" || property.location === location;
        const matchType = type === "All" || property.type === type;
        const matchBudget = matchesBudget(property.price, budget);
        return matchLocation && matchType && matchBudget;
      }),
    [location, type, budget]
  );

  return (
    <section className="container-shell section-shell">
      <div className="flex flex-col gap-10">
        <div>
          <p className="section-subtitle">Properties</p>
          <h1 className="section-title mt-3">Verified Listings</h1>
        </div>

        <div className="glass-panel grid gap-4 p-6 md:grid-cols-3">
          <select
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none"
          >
            {locations.map((item) => (
              <option key={item} className="text-[#0B5D3B]">
                {item}
              </option>
            ))}
          </select>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none"
          >
            {types.map((item) => (
              <option key={item} className="text-[#0B5D3B]">
                {item}
              </option>
            ))}
          </select>
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none"
          >
            {budgets.map((item) => (
              <option key={item} className="text-[#0B5D3B]">
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((property) => (
            <div key={property.id} className="glass-panel overflow-hidden">
              <img
                src={property.images[0]}
                alt={`${property.title} property`}
                className="h-52 w-full object-cover"
                loading="lazy"
              />
              <div className="p-5">
                <p className="text-sm text-white/70">{property.location}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{property.title}</h3>
                <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                  <span>{property.type}</span>
                  <span className="font-semibold">{property.price}</span>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href={`/properties/${property.id}`}
                    className="w-full rounded-full border border-white/30 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    View Details
                  </Link>
                  <a
                    href="tel:+918939427799"
                    className="w-full rounded-full border border-white/30 px-4 py-2 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
