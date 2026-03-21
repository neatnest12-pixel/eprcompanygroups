"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Bath, BedDouble, Ruler } from "lucide-react";

function tagClass(tag) {
  switch (tag) {
    case "FEATURED":
      return "bg-[#C9A24A]/15 text-[#C9A24A]";
    case "VERIFIED":
      return "bg-[#2E7D32]/15 text-[#2E7D32]";
    case "HOT DEAL":
      return "bg-[#F97316]/15 text-[#F97316]";
    case "NEW":
      return "bg-[#1E3A5F]/12 text-[#1E3A5F]";
    default:
      return "bg-[#1E3A5F]/8 text-[#1E3A5F]";
  }
}

export default function PropertyCard({ property, variant = "standard" }) {
  const isLarge = variant === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="card-white overflow-hidden hover-lift group"
    >
      <div className={`relative ${isLarge ? "h-64" : "h-52"}`}>
        <img
          src={property.images[0]}
          alt={`${property.title} in ${property.location}`}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {(property.tags || []).map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] ${tagClass(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className={`p-6 ${isLarge ? "space-y-4" : "space-y-3"}`}>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#2E7D32]">
            {property.location}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-[#1E3A5F]">{property.title}</h3>
          <p className="mt-2 text-lg font-semibold text-[#C9A24A]">{property.price}</p>
          {property.dealLabel ? (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#F97316]">
              {property.dealLabel}
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-[#6B7280]">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F7FA] px-3 py-2">
            <Ruler className="h-4 w-4 text-[#1E3A5F]" />
            {property.sqft} sqft
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F7FA] px-3 py-2">
            <BedDouble className="h-4 w-4 text-[#1E3A5F]" />
            {property.beds ?? "-"} beds
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F7FA] px-3 py-2">
            <Bath className="h-4 w-4 text-[#1E3A5F]" />
            {property.baths ?? "-"} baths
          </span>
        </div>
        <div className="flex flex-wrap gap-3 pt-1">
          <button type="button" className="btn-outline">
            Compare
          </button>
          <Link href={`/properties/${property.id}`} className="btn-orange">
            View details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
