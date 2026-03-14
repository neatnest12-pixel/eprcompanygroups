import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getProperties } from "../api";
import PropertyCard from "../components/property/PropertyCard";
import EmptyState from "../components/ui/EmptyState";
import SectionHeading from "../components/ui/SectionHeading";
import { useSeoMetadata } from "../hooks/useSeoMetadata";
import { getSeoLocationPage } from "../utils/property-utils";

export default function SeoLocationPage() {
  const { seoSlug } = useParams();
  const [properties, setProperties] = useState([]);
  const config = getSeoLocationPage(seoSlug);

  useEffect(() => {
    if (!config) {
      return;
    }

    getProperties().then((allProperties) => {
      setProperties(
        allProperties.filter(
          (property) =>
            property.category === config.category &&
            property.location.toLowerCase().includes(config.locationKeyword.toLowerCase())
        )
      );
    });
  }, [config]);

  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: config?.heading,
      description: config?.description,
      itemListElement: properties.map((property, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://eprcompanygroup.in/properties/${property.id}`,
        name: property.title
      }))
    }),
    [config, properties]
  );

  useSeoMetadata({
    title: config?.title || "ERP Group Company",
    description: config?.description || "Real estate listings by location",
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

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="SEO Location Page"
        title={config.heading}
        description={config.description}
      />
      <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
