import { MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import Select from "../components/ui/Select";
import { formatCurrency } from "../lib/utils";
import { getMapArea, isPropertyInBounds, MAP_AREAS } from "../utils/property-utils";

function getPinPosition(property, bounds) {
  const x = ((property.longitude - bounds.lngMin) / (bounds.lngMax - bounds.lngMin)) * 100;
  const y = ((bounds.latMax - property.latitude) / (bounds.latMax - bounds.latMin)) * 100;

  return {
    left: `${Math.max(8, Math.min(92, x))}%`,
    top: `${Math.max(10, Math.min(88, y))}%`
  };
}

export default function MapSearch() {
  const [areaId, setAreaId] = useState(MAP_AREAS[0].id);
  const [properties, setProperties] = useState([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  const selectedArea = getMapArea(areaId);
  const visibleProperties = useMemo(
    () => properties.filter((property) => isPropertyInBounds(property, selectedArea.bounds)),
    [properties, selectedArea.bounds]
  );

  const selectedProperty =
    visibleProperties.find((property) => property.id === selectedPropertyId) ||
    visibleProperties[0] ||
    null;

  useEffect(() => {
    if (visibleProperties.length && !visibleProperties.some((item) => item.id === selectedPropertyId)) {
      setSelectedPropertyId(visibleProperties[0].id);
    }
  }, [selectedPropertyId, visibleProperties]);

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Map Search"
        title="Explore properties by location and map bounds."
        description="Use the map-focused view to narrow active listings within key Chennai market clusters."
      />

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="w-full max-w-xs">
          <Select value={areaId} onChange={(event) => setAreaId(event.target.value)}>
            {MAP_AREAS.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </Select>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          Showing {visibleProperties.length} properties inside the current map bounds.
        </p>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <div className="glass-panel relative h-[520px] overflow-hidden rounded-xl bg-slate-100">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.18)_1px,transparent_1px)] bg-[size:56px_56px]" />
            {visibleProperties.map((property) => {
              const position = getPinPosition(property, selectedArea.bounds);
              return (
                <button
                  key={property.id}
                  type="button"
                  onClick={() => setSelectedPropertyId(property.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={position}
                >
                  <span className="inline-flex items-center gap-1 rounded-full bg-orange-500 px-3 py-2 text-xs font-semibold text-white shadow-lg">
                    <MapPin className="h-3.5 w-3.5" />
                    {property.title.split(" - ")[0]}
                  </span>
                </button>
              );
            })}
            <div className="absolute left-4 top-4 rounded-lg bg-white/90 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm">
              {selectedArea.name}
            </div>
          </div>

          <div className="glass-panel overflow-hidden rounded-xl">
            <iframe
              title="Google map search"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                selectedProperty?.mapQuery || selectedArea.mapQuery
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-slate-900">Property preview</h2>
            {selectedProperty ? (
              <div className="mt-5 space-y-4">
                <img
                  src={selectedProperty.images[0]}
                  alt={selectedProperty.title}
                  loading="lazy"
                  className="h-52 w-full rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {selectedProperty.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">{selectedProperty.location}</p>
                  <p className="mt-3 text-lg font-bold text-orange-600">
                    {selectedProperty.priceLabel || formatCurrency(selectedProperty.price)}
                  </p>
                </div>
                <Link to={`/properties/${selectedProperty.id}`} className="block">
                  <Button className="w-full">View property</Button>
                </Link>
              </div>
            ) : (
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                No properties found for the current area bounds.
              </p>
            )}
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h3 className="text-xl font-semibold text-slate-900">Pins in bounds</h3>
            <div className="mt-4 space-y-3">
              {visibleProperties.map((property) => (
                <button
                  key={property.id}
                  type="button"
                  onClick={() => setSelectedPropertyId(property.id)}
                  className="flex w-full items-start justify-between gap-4 rounded-xl border border-slate-200 px-4 py-3 text-left transition hover:border-orange-200 hover:bg-orange-50/50"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{property.title}</p>
                    <p className="mt-1 text-sm text-gray-500">{property.location}</p>
                  </div>
                  <span className="text-sm font-semibold text-orange-600">
                    {property.priceLabel || formatCurrency(property.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
