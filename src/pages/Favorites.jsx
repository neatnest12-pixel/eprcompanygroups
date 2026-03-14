import { useEffect, useState } from "react";
import { getProperties } from "../api";
import PropertyCard from "../components/property/PropertyCard";
import EmptyState from "../components/ui/EmptyState";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../lib/AuthContext";

export default function Favorites() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then(setProperties);
  }, []);

  if (!user) {
    return (
      <section className="container-shell py-16">
        <EmptyState
          title="Login to view your favorites"
          description="Use the Login or Signup button in the navigation bar to save and manage favorite properties."
        />
      </section>
    );
  }

  const favoriteProperties = properties.filter((property) =>
    user.favorites?.includes(property.id)
  );

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Saved Properties"
        title="Your shortlist of favorite ERP Group Company listings."
        description="Track the properties you want to revisit and compare."
      />

      <div className="mt-10">
        {favoriteProperties.length ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {favoriteProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No favorite properties yet"
            description="Save listings from the property cards to build your shortlist."
          />
        )}
      </div>
    </section>
  );
}
