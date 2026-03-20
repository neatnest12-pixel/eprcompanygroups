import { SlidersHorizontal } from "lucide-react";
import { PROPERTY_CATEGORIES } from "../../data/seed";
import {
  AMENITY_OPTIONS,
  FURNISHING_OPTIONS,
  PROPERTY_TYPE_OPTIONS
} from "../../utils/property-utils";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function PropertyFilters({
  filters,
  onChange,
  onReset,
  locations = [],
  className = ""
}) {
  const update = (key, value) => onChange({ ...filters, [key]: value });
  const updateAmenity = (amenity) => {
    const nextAmenities = filters.amenities.includes(amenity)
      ? filters.amenities.filter((item) => item !== amenity)
      : [...filters.amenities, amenity];
    update("amenities", nextAmenities);
  };

  return (
    <aside className={`glass-panel h-fit w-full rounded-xl p-6 ${className}`}>
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-orange-50 p-3 text-orange-500">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Filters</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Refine the property search quickly.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Keywords or landmark"
          value={filters.keywords}
          onChange={(event) => update("keywords", event.target.value)}
        />
        <div>
          <Input
            list="location-suggestions"
            placeholder="Search location"
            value={filters.location}
            onChange={(event) => update("location", event.target.value)}
          />
          <datalist id="location-suggestions">
            {locations.map((location) => (
              <option key={location} value={location} />
            ))}
          </datalist>
        </div>
        <Select
          value={filters.category}
          onChange={(event) => update("category", event.target.value)}
        >
          <option value="">All categories</option>
          {PROPERTY_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-900">Price range</p>
            <p className="text-xs text-gray-500">
              Rs. {Number(filters.minPrice || 0).toLocaleString("en-IN")} - Rs.{" "}
              {Number(filters.maxPrice || filters.maxPriceCap).toLocaleString("en-IN")}
            </p>
          </div>
          <div className="mt-4 space-y-4">
            <input
              type="range"
              min="0"
              max={filters.maxPriceCap}
              step="50000"
              value={filters.minPrice}
              onChange={(event) => update("minPrice", event.target.value)}
              className="w-full accent-orange-500"
            />
            <input
              type="range"
              min="0"
              max={filters.maxPriceCap}
              step="50000"
              value={filters.maxPrice}
              onChange={(event) => update("maxPrice", event.target.value)}
              className="w-full accent-orange-500"
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            type="number"
            min="0"
            placeholder="Min price"
            value={filters.minPrice}
            onChange={(event) => update("minPrice", event.target.value)}
          />
          <Input
            type="number"
            min="0"
            placeholder="Max price"
            value={filters.maxPrice}
            onChange={(event) => update("maxPrice", event.target.value)}
          />
        </div>
        <Input
          type="number"
          min="0"
          placeholder="Minimum area (sqft)"
          value={filters.area}
          onChange={(event) => update("area", event.target.value)}
        />
        <Select
          value={filters.bedrooms}
          onChange={(event) => update("bedrooms", event.target.value)}
        >
          <option value="">Any bedrooms</option>
          <option value="1">1 BHK+</option>
          <option value="2">2 BHK+</option>
          <option value="3">3 BHK+</option>
          <option value="4">4 BHK+</option>
        </Select>
        <Select
          value={filters.bathrooms}
          onChange={(event) => update("bathrooms", event.target.value)}
        >
          <option value="">Any bathrooms</option>
          <option value="1">1 Bath+</option>
          <option value="2">2 Bath+</option>
          <option value="3">3 Bath+</option>
        </Select>
        <Select
          value={filters.furnishing}
          onChange={(event) => update("furnishing", event.target.value)}
        >
          <option value="">Any furnishing</option>
          {FURNISHING_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select
          value={filters.propertyType}
          onChange={(event) => update("propertyType", event.target.value)}
        >
          <option value="">Any property type</option>
          {PROPERTY_TYPE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <div>
          <p className="mb-3 text-sm font-semibold text-slate-900">Amenities</p>
          <div className="grid gap-2">
            {AMENITY_OPTIONS.map((amenity) => (
              <label
                key={amenity}
                className="inline-flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm text-gray-600"
              >
                <input
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => updateAmenity(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={onReset}>
          Reset filters
        </Button>
      </div>
    </aside>
  );
}
