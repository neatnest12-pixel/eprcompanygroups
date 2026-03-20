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
          <div className="card-white overflow-hidden">
            <img
              src={property.images[0]}
              alt={`${property.title} hero`}
              className="h-72 w-full object-cover"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {property.images.slice(1).map((image, index) => (
              <div key={image} className="card-white overflow-hidden">
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
          <div className="card-white p-6">
            <p className="text-sm text-emerald-700/70">{property.location}</p>
            <h1 className="mt-2 text-3xl font-semibold text-emerald-950">
              {property.title}
            </h1>
            <p className="mt-3 text-xl font-semibold text-emerald-900">{property.price}</p>
            <p className="mt-4 text-sm text-emerald-800">{property.description}</p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-sm text-emerald-800">
              <div>
                <p className="text-xs text-emerald-600">Beds</p>
                <p className="font-semibold text-emerald-950">{property.beds || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-600">Baths</p>
                <p className="font-semibold text-emerald-950">{property.baths || "-"}</p>
              </div>
              <div>
                <p className="text-xs text-emerald-600">Sqft</p>
                <p className="font-semibold text-emerald-950">{property.sqft}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:+918939427799"
                className="btn-outline text-emerald-950 border-emerald-200"
              >
                Call Now
              </a>
              <a
                href="https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services"
                className="btn-gold"
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
