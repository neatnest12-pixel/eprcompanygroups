"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { company } from "../lib/content";
import { properties } from "../lib/properties";

const locations = [
  "All Locations",
  "Tambaram, Chennai",
  "Guduvanchery, Chennai",
  "Vandalur, Chennai",
  "Chengalpattu, Chennai"
];
const types = ["All Types", "DTCP Plot", "Residential Plot", "Investment Plot", "Premium Plot", "Corner Plot"];
const budgets = ["All Budgets", "Below Rs 40 Lakh", "Rs 40 Lakh - Rs 55 Lakh", "Above Rs 55 Lakh"];

function matchesBudget(price, budget) {
  if (budget === "All Budgets") return true;
  if (budget === "Below Rs 40 Lakh") return price.includes("29") || price.includes("31") || price.includes("34") || price.includes("36") || price.includes("39");
  if (budget === "Rs 40 Lakh - Rs 55 Lakh") return price.includes("41") || price.includes("44") || price.includes("47") || price.includes("52");
  if (budget === "Above Rs 55 Lakh") return price.includes("58");
  return true;
}

export default function PropertiesCatalog() {
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");
  const [budget, setBudget] = useState("All Budgets");

  const filtered = useMemo(
    () =>
      properties.filter((property) => {
        const locationOk = location === "All Locations" || property.location === location;
        const typeOk = type === "All Types" || property.type === type;
        const budgetOk = matchesBudget(property.price, budget);
        return locationOk && typeOk && budgetOk;
      }),
    [location, type, budget]
  );

  return (
    <>
      <div className="card-white p-8">
        <h2 className="text-2xl font-semibold text-emerald-950">How to use the filters</h2>
        <p className="mt-4 text-base leading-8 text-emerald-800">
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
            className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 focus:outline-none"
          >
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={budget}
            onChange={(event) => setBudget(event.target.value)}
            className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 focus:outline-none"
          >
            {budgets.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={type}
            onChange={(event) => setType(event.target.value)}
            className="rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 focus:outline-none"
          >
            {types.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((property) => (
          <div key={property.id} className="card-white overflow-hidden hover-lift">
            <img
              src={property.images[0]}
              alt={`${property.title} in ${property.location}`}
              className="h-52 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <p className="text-sm font-medium text-emerald-700">{property.location}</p>
              <h3 className="mt-2 text-xl font-semibold text-emerald-950">{property.title}</h3>
              <div className="mt-3 flex flex-wrap gap-3 text-sm text-emerald-800">
                <span className="rounded-full bg-emerald-50 px-3 py-1">{property.price}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1">{property.plotSize}</span>
                <span className="rounded-full bg-emerald-50 px-3 py-1">{property.type}</span>
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-sm leading-7 text-emerald-800">
                  <span className="font-semibold text-emerald-950">Benefits:</span>{" "}
                  {property.benefits.join(". ")}.
                </p>
                <p className="text-sm leading-7 text-emerald-800">
                  <span className="font-semibold text-emerald-950">Investment note:</span>{" "}
                  {property.investmentPotential}
                </p>
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  href={`/properties/${property.id}`}
                  className="rounded-full border border-emerald-200 px-4 py-2 text-center text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
                >
                  View Details
                </Link>
                <a
                  href={company.phoneHref}
                  className="rounded-full border border-emerald-200 px-4 py-2 text-center text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
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
