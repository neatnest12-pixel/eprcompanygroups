import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProperties } from "../api";
import PropertyCard from "../components/property/PropertyCard";
import EmptyState from "../components/ui/EmptyState";
import { useSeoMetadata } from "../hooks/useSeoMetadata";
import { getSeoLocationPage } from "../utils/property-utils";

function getSeoContent(config) {
  const location = config.shortLocation;

  return {
    intro: `ERP Group Company brings together carefully selected ${location} opportunities for buyers who want strong Chennai real estate value. This page is designed for users searching for ${config.keywords.split(",")[0].trim()} and related investment property options in one of the city's most active growth corridors. Our team studies road access, future infrastructure, nearby schools, and daily convenience so that every listing is easier to evaluate.`,
    invest: `Why invest in ${location}? The area continues to attract end users and investors because of corridor development, better access to IT hubs, and rising demand for well-located homes and land parcels. Whether you are comparing OMR plots, evaluating Chennai real estate trends, or planning your next investment property purchase, ${location} offers a practical mix of affordability and long-term upside.`,
    inventory: `ERP Group Company highlights available properties in ${location} that match current buyer intent. We focus on listings that support clear decision-making with pricing, images, and direct contact options. If you are researching OMR plots, apartments in growth corridors, or premium homes close to major roads, this page helps you move from browsing to shortlisting faster.`,
    contact: `For site visits, pricing details, or location-specific guidance, contact ERP Group Company. Our team helps buyers compare Chennai real estate options with a local-market lens, from first inquiry to final negotiation. That makes it easier to choose the right investment property based on budget, purpose, and resale potential.`
  };
}

export default function SeoLocationPage() {
  const { seoSlug } = useParams();
  const [properties, setProperties] = useState([]);
  const config = getSeoLocationPage(seoSlug);

  useEffect(() => {
    if (!config) {
      return;
    }

    getProperties().then((allProperties) => {
      const location = config.locationKeyword.toLowerCase();
      const filtered = allProperties.filter((property) =>
        property.location.toLowerCase().includes(location)
      );
      setProperties(filtered);
    });
  }, [config]);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: config?.heading,
      description: config?.description,
      about: config?.keywords,
      mainEntity: properties.map((property) => ({
        "@type": "RealEstateListing",
        name: property.title,
        description: property.description,
        url: `https://eprgroupcompany.in/properties/${property.id}`
      }))
    }),
    [config, properties]
  );

  useSeoMetadata({
    title: config?.title || "ERP Group Company",
    description: config?.description || "Real estate listings by location",
    keywords: config?.keywords || "Chennai real estate, investment property",
    schema
  });

  if (!config) {
    return (
      <section className="container-shell section-shell">
        <EmptyState
          title="Location page not found"
          description="This location-specific landing page is not available."
        />
      </section>
    );
  }

  const content = getSeoContent(config);

  return (
    <section className="container-shell section-shell">
      <div className="mx-auto max-w-5xl">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
          Chennai Real Estate
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {config.heading}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-gray-500">
          {content.intro}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Why invest in {config.shortLocation}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {content.invest}
            </p>
          </section>

          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Available properties
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {content.inventory}
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {properties.length ? (
                properties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  New listings for {config.shortLocation} will appear here soon.
                </p>
              )}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Nearby locations
            </h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              {config.nearbyLocations.map((item) => (
                <li key={item} className="rounded-lg border border-slate-200 bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="glass-panel rounded-xl p-8">
            <h2 className="text-3xl font-semibold text-slate-900">
              Contact ERP Group Company
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-500">
              {content.contact}
            </p>
            <div className="mt-6 space-y-3 text-sm font-semibold text-slate-700">
              <p>ERP Group Company</p>
              <p>OMR Chennai</p>
              <p>7299007799 / 8939427799</p>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/properties"
                className="rounded-lg bg-orange-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Browse all properties
              </Link>
              <Link
                to="/contact"
                className="rounded-lg border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
              >
                Contact ERP Group Company
              </Link>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
