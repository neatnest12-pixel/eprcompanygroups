import { notFound } from "next/navigation";
import ContactForm from "../../../components/ContactForm";
import { properties } from "../../../lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export const dynamicParams = false;

export default function PropertyDetailPage({ params }) {
  const property = properties.find((item) => item.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <section className="container-shell section-shell">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="glass-panel overflow-hidden">
            <img
              src={property.images[0]}
              alt={`${property.title} hero`}
              className="h-72 w-full object-cover"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {property.images.slice(1).map((image, index) => (
              <div key={image} className="glass-panel overflow-hidden">
                <img
                  src={image}
                  alt={`${property.title} gallery ${index + 1}`}
                  className="h-44 w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <p className="text-sm text-white/70">{property.location}</p>
            <h1 className="mt-2 text-3xl font-semibold">{property.title}</h1>
            <p className="mt-3 text-xl font-semibold text-white">{property.price}</p>
            <p className="mt-4 text-sm text-white/80">{property.description}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-white/80">
              <div>
                <p className="text-xs text-white/60">Beds</p>
                <p className="font-semibold">{property.beds || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Baths</p>
                <p className="font-semibold">{property.baths || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-white/60">Sqft</p>
                <p className="font-semibold">{property.sqft}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:+918939427799"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services"
                className="inline-flex items-center justify-center rounded-full bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <ContactForm redirectToWhatsApp />
        </div>
      </div>
    </section>
  );
}
