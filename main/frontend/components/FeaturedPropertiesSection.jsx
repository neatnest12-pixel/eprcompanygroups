"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { company, featuredPropertiesIntro } from "../lib/content";
import { getStoredProperties } from "../lib/propertyStore";

export default function FeaturedPropertiesSection() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    const syncProperties = () => {
      const nextFeatured = getStoredProperties()
        .filter((property) => property.featured)
        .slice(0, 6);
      setFeatured(nextFeatured);
    };

    syncProperties();
    window.addEventListener("erp-properties-updated", syncProperties);

    return () => window.removeEventListener("erp-properties-updated", syncProperties);
  }, []);

  return (
    <section className="section-shell">
      <div className="container-shell space-y-8">
        <div>
          <p className="section-subtitle">Featured Properties</p>
          <h2 className="section-title">Featured properties, rentals, and lowest-price opportunities</h2>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#6B7280]">
            {featuredPropertiesIntro}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((property) => (
            <div key={property.id} className="card-white overflow-hidden hover-lift group">
              <img
                src={property.images[0]}
                alt={`${property.title} in ${property.location}`}
                className="h-56 w-full object-cover transition duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="p-6">
                {property.dealLabel ? (
                  <span className="inline-flex rounded-full bg-[#C9A24A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A24A]">
                    {property.dealLabel}
                  </span>
                ) : null}
                <p className="mt-3 text-sm font-medium text-[#2E7D32]">{property.location}</p>
                <h3 className="mt-2 text-xl font-semibold text-[#1E3A5F]">{property.title}</h3>
                <p className="mt-2 text-sm font-semibold text-[#C9A24A]">{property.price}</p>
                <p className="mt-4 text-sm leading-7 text-[#6B7280]">
                  {property.benefits[0]}. {property.benefits[1]}. Size: {property.sizeLabel}.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <Link href="/properties" className="link-pill text-center">
                    View Full Details
                  </Link>
                  <a href={company.phoneHref} className="link-pill text-center">
                    Call for Site Visit
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
