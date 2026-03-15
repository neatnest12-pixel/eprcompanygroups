import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProperties } from "../api";
import PropertyAlertForm from "../components/property/PropertyAlertForm";
import PropertyFilters from "../components/property/PropertyFilters";
import PropertyCard from "../components/property/PropertyCard";
import EmptyState from "../components/ui/EmptyState";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import SectionHeading from "../components/ui/SectionHeading";
import { useCompare } from "../hooks/useCompare";
import { filterProperties } from "../utils/property-utils";

const defaultFilters = {
  keywords: "",
  location: "",
  category: "",
  minPrice: 0,
  maxPrice: 15000000,
  maxPriceCap: 15000000,
  area: "",
  bedrooms: "",
  bathrooms: "",
  furnishing: "",
  propertyType: "",
  amenities: []
};

export default function Properties() {
  const [searchParams] = useSearchParams();
  const searchKey = searchParams.toString();
  const [filters, setFilters] = useState(defaultFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { compareIds } = useCompare();

  useEffect(() => {
    getProperties()
      .then(setProperties)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setFilters({
      ...defaultFilters,
      keywords: searchParams.get("keywords") || "",
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || ""
    });
  }, [searchKey]);

  const locations = useMemo(
    () => [...new Set(properties.map((property) => property.location.split(",")[0]))],
    [properties]
  );

  const filteredProperties = useMemo(() => {
    return filterProperties(properties, filters);
  }, [filters, properties]);

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Browse Listings"
        title="Search across ERP Group Company properties with detailed filters."
        description="Filter by location, category, price, area, bedrooms, and keywords to shortlist the right opportunity."
      />

      <div className="mt-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 hidden w-full max-w-[320px] space-y-4 self-start lg:sticky lg:top-20 lg:col-span-3 lg:block">
          <PropertyFilters
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            locations={locations}
          />
          <PropertyAlertForm />
        </div>

        <div className="col-span-12 min-w-0 lg:col-span-9">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              {filteredProperties.length} properties found
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 md:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>
              <Link
                to="/map-search"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
              >
                Map Search
              </Link>
              <Link
                to="/compare"
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
              >
                Compare ({compareIds.length})
              </Link>
            </div>
          </div>

          {loading ? (
            <LoadingSpinner label="Loading properties..." />
          ) : filteredProperties.length ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No properties match these filters"
              description="Try broadening the search criteria or reset the filters to explore all available listings."
              actionLabel="Reset filters"
              onAction={() => setFilters(defaultFilters)}
            />
          )}
        </div>
      </div>

      {filtersOpen ? (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            onClick={() => setFiltersOpen(false)}
            aria-label="Close filters"
          />
          <div className="relative h-full w-[85%] max-w-sm overflow-y-auto bg-white px-6 pb-6 pt-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-lg font-semibold text-slate-900">Filters</p>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="rounded-lg border border-slate-200 p-2 text-slate-700"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <PropertyFilters
              filters={filters}
              onChange={setFilters}
              onReset={() => setFilters(defaultFilters)}
              locations={locations}
              className="border-0 p-0 shadow-none"
            />
            <PropertyAlertForm />
          </div>
        </div>
      ) : null}
    </section>
  );
}
