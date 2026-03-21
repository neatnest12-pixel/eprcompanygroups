"use client";

import { useEffect, useMemo, useState } from "react";
import PropertyCard from "./PropertyCard";
import { getStoredProperties } from "../lib/propertyStore";

const categoryOptions = [
  "All Categories",
  "Plots",
  "Houses",
  "Villas",
  "Apartments",
  "Commercial",
  "Farm lands"
];

const bedroomOptions = ["Any", "1", "2", "3", "4+"];

const amenityOptions = ["Parking", "Security", "Lift", "Gated", "Main road"];

function mapTypeToCategory(type) {
  const value = (type || "").toLowerCase();
  if (value.includes("flat") || value.includes("apartment")) return "Apartments";
  if (value.includes("house")) return "Houses";
  if (value.includes("commercial")) return "Commercial";
  if (value.includes("villa")) return "Villas";
  if (value.includes("farm")) return "Farm lands";
  return "Plots";
}

function parsePriceToLakh(price) {
  if (!price) return 0;
  const value = price.toLowerCase().replace(/,/g, "");
  const number = parseFloat(value.match(/[\d.]+/)?.[0] || "0");
  if (value.includes("crore")) {
    return number * 100;
  }
  if (value.includes("lakh")) {
    return number;
  }
  if (value.includes("/ month")) {
    return number / 100000;
  }
  return number;
}

export default function PropertiesCatalog() {
  const [allProperties, setAllProperties] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [category, setCategory] = useState("All Categories");
  const [maxPrice, setMaxPrice] = useState(500);
  const [bedrooms, setBedrooms] = useState("Any");
  const [amenities, setAmenities] = useState([]);

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

  const maxDatasetPrice = useMemo(() => {
    const values = allProperties.map((property) => parsePriceToLakh(property.price));
    return Math.max(100, ...values);
  }, [allProperties]);

  useEffect(() => {
    if (maxPrice > maxDatasetPrice) {
      setMaxPrice(Math.ceil(maxDatasetPrice));
    }
  }, [maxDatasetPrice, maxPrice]);

  const filtered = useMemo(() => {
    return allProperties.filter((property) => {
      const search = keyword.trim().toLowerCase();
      const textMatch =
        !search ||
        property.title.toLowerCase().includes(search) ||
        property.location.toLowerCase().includes(search) ||
        property.type.toLowerCase().includes(search);

      const locationOk = location === "All Locations" || property.location === location;
      const categoryOk =
        category === "All Categories" || mapTypeToCategory(property.type) === category;

      const priceOk = parsePriceToLakh(property.price) <= Number(maxPrice);

      const bedsValue = String(property.beds || "");
      const bedsNumber = parseInt(bedsValue, 10);
      const bedroomOk =
        bedrooms === "Any" ||
        (bedrooms === "4+" ? bedsNumber >= 4 : bedsValue === bedrooms);

      const amenitiesOk = amenities.length
        ? amenities.every((item) =>
            property.amenities?.some((amenity) =>
              amenity.toLowerCase().includes(item.toLowerCase())
            )
          )
        : true;

      return textMatch && locationOk && categoryOk && priceOk && bedroomOk && amenitiesOk;
    });
  }, [allProperties, keyword, location, category, maxPrice, bedrooms, amenities]);

  const toggleAmenity = (value) => {
    setAmenities((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
      <aside className="card-white h-fit p-6">
        <h2 className="text-lg font-semibold text-[#1E3A5F]">Filters</h2>
        <div className="mt-6 space-y-4">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Keyword"
            className="form-input"
          />

          <select value={location} onChange={(event) => setLocation(event.target.value)} className="form-input">
            {locations.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select value={category} onChange={(event) => setCategory(event.target.value)} className="form-input">
            {categoryOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <div>
            <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]">
              Max price (₹ Lakhs)
            </label>
            <input
              type="range"
              min="0"
              max={Math.ceil(maxDatasetPrice)}
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              className="mt-3 w-full accent-[#F97316]"
            />
            <p className="mt-2 text-sm text-[#6B7280]">Up to {Number(maxPrice).toFixed(1)} Lakhs</p>
          </div>

          <select value={bedrooms} onChange={(event) => setBedrooms(event.target.value)} className="form-input">
            {bedroomOptions.map((item) => (
              <option key={item}>{item} Bedrooms</option>
            ))}
          </select>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1E3A5F]">Amenities</p>
            <div className="mt-3 space-y-2">
              {amenityOptions.map((item) => (
                <label key={item} className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <input
                    type="checkbox"
                    checked={amenities.includes(item)}
                    onChange={() => toggleAmenity(item)}
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div className="space-y-6">
        <p className="text-sm font-semibold text-[#1E3A5F]">
          {filtered.length} properties found
        </p>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
