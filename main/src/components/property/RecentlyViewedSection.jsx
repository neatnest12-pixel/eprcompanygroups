import PropertyCard from "./PropertyCard";
import SectionHeading from "../ui/SectionHeading";

export default function RecentlyViewedSection({ properties = [] }) {
  if (!properties.length) {
    return null;
  }

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Recently Viewed"
        title="Pick up where you left off."
        description="Your last viewed properties are kept here for quick revisits and comparison."
      />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  );
}
