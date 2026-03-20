import { motion } from "framer-motion";
import { BedDouble, GitCompareArrows, Heart, MapPin, Maximize, ShowerHead, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { useCompare } from "../../hooks/useCompare";
import { cn, formatCurrency } from "../../lib/utils";
import { getPropertyStatusLabels } from "../../utils/property-utils";
import Button from "../ui/Button";

export default function PropertyCard({ property, horizontal = false }) {
  const { user, toggleFavorite } = useAuth();
  const { compareIds, toggleCompare } = useCompare();
  const isFavorite = Boolean(user?.favorites?.includes(property.id));
  const isCompared = compareIds.includes(property.id);
  const statusLabels = getPropertyStatusLabels(property);
  const priceText = property.priceLabel || formatCurrency(property.price);
  const sizeText = property.size || (property.area ? `${property.area} sqft` : "");

  const handleFavorite = () => {
    try {
      toggleFavorite(property.id);
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleWhatsAppEnquiry = () => {
    const message = `
Hello ERP Group Company,

I am interested in this property.

Property: ${property.title}
Location: ${property.location}
Price: ${priceText}
Size: ${sizeText}

Please share more details.
`;

    const whatsappUrl = `https://wa.me/918939427799?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.article
      className={cn(
        "group min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl md:min-w-[320px]",
        horizontal ? "grid gap-0 lg:grid-cols-[240px_1fr]" : ""
      )}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={property.images?.[0]}
          alt={property.title}
          loading="lazy"
          className={cn(
            "w-full object-cover transition-transform duration-500 group-hover:scale-110",
            horizontal ? "h-full min-h-[220px]" : "aspect-[4/3] rounded-t-xl"
          )}
        />
        <button
          type="button"
          onClick={handleFavorite}
          className="absolute right-4 top-4 rounded-full bg-white/95 p-3 text-slate-900 shadow-sm transition-all duration-300 hover:scale-105"
          aria-label="Save property"
        >
          <Heart className={cn("h-4 w-4", isFavorite ? "fill-current text-red-500" : "")} />
        </button>
        {statusLabels.length ? (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {statusLabels.map((label) => (
              <span
                key={label}
                className="rounded-full bg-slate-900/85 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white"
              >
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.28em] text-orange-600">
            {property.category}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-gray-500">
            <Tag className="h-4 w-4" />
            {property.transactionType === "rent" ? "For Rent" : "For Sale"}
          </span>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {property.title}
        </h3>
        <p className="inline-flex items-center gap-2 text-sm text-gray-500 leading-relaxed">
          <MapPin className="h-4 w-4" />
          {property.location}
        </p>
        <p className="text-lg font-bold text-orange-600">
          {property.priceLabel || formatCurrency(property.price)}
        </p>

        <div className="flex flex-wrap gap-4 pt-1 text-sm text-gray-500">
          <span className="inline-flex items-center gap-2">
            <Maximize className="h-4 w-4" />
            {property.area} sqft
          </span>
          {property.bedrooms ? (
            <span className="inline-flex items-center gap-2">
              <BedDouble className="h-4 w-4" />
              {property.bedrooms} Beds
            </span>
          ) : null}
          {property.bathrooms ? (
            <span className="inline-flex items-center gap-2">
              <ShowerHead className="h-4 w-4" />
              {property.bathrooms} Baths
            </span>
          ) : null}
        </div>

        <p className="line-clamp-3 text-sm text-gray-500 leading-relaxed">
          {property.description}
        </p>

        <div className="mt-3 grid gap-3">
          <button
            type="button"
            onClick={() => toggleCompare(property.id)}
            className={`inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition ${
              isCompared
                ? "border-orange-200 bg-orange-50 text-orange-600"
                : "border-slate-200 text-slate-700 hover:bg-gray-50"
            }`}
          >
            <GitCompareArrows className="h-4 w-4" />
            {isCompared ? "Added to Compare" : "Compare"}
          </button>
          <button
            type="button"
            onClick={handleWhatsAppEnquiry}
            className="w-full rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            WhatsApp Enquiry
          </button>
          <Link to={`/properties/${property.id}`} className="block">
            <Button className="mt-3 w-full md:w-auto">View details</Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
