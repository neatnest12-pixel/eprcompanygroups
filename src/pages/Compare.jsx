import { useEffect, useState } from "react";
import { getProperties } from "../api";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import SectionHeading from "../components/ui/SectionHeading";
import { useCompare } from "../hooks/useCompare";
import { formatCurrency } from "../lib/utils";

export default function Compare() {
  const { clearCompare, compareIds, toggleCompare } = useCompare();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then((allProperties) => {
      setProperties(allProperties.filter((property) => compareIds.includes(property.id)));
    });
  }, [compareIds]);

  if (!properties.length) {
    return (
      <section className="container-shell section-shell">
        <EmptyState
          title="No properties selected for comparison"
          description="Use the Compare button on property cards to add up to four listings here."
        />
      </section>
    );
  }

  const rows = [
    { label: "Price", render: (property) => property.priceLabel || formatCurrency(property.price) },
    { label: "Area", render: (property) => `${property.area} sqft` },
    { label: "Bedrooms", render: (property) => property.bedrooms || "-" },
    { label: "Bathrooms", render: (property) => property.bathrooms || "-" },
    { label: "Location", render: (property) => property.location },
    {
      label: "Amenities",
      render: (property) => property.amenities.join(", ")
    }
  ];

  return (
    <section className="container-shell section-shell">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Property Comparison"
          title="Compare shortlisted properties side by side."
          description="Review pricing, dimensions, amenities, and location details before you decide."
        />
        <Button variant="outline" onClick={clearCompare}>
          Clear comparison
        </Button>
      </div>

      <div className="mt-10 overflow-x-auto">
        <table className="min-w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-4 text-sm font-semibold text-slate-900">Feature</th>
              {properties.map((property) => (
                <th key={property.id} className="min-w-[240px] px-4 py-4 align-top">
                  <div className="space-y-3">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      loading="lazy"
                      className="h-36 w-full rounded-xl object-cover"
                    />
                    <div>
                      <p className="font-semibold text-slate-900">{property.title}</p>
                      <button
                        type="button"
                        onClick={() => toggleCompare(property.id)}
                        className="mt-2 text-sm font-medium text-orange-600"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-slate-200">
                <td className="px-4 py-4 text-sm font-semibold text-slate-900">{row.label}</td>
                {properties.map((property) => (
                  <td key={`${property.id}-${row.label}`} className="px-4 py-4 text-sm text-gray-600">
                    {row.render(property)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
