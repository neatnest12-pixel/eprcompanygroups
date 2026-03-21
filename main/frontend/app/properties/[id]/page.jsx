import { notFound } from "next/navigation";
import ContactForm from "../../../components/ContactForm";
import { company } from "../../../lib/content";
import { properties } from "../../../lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export const dynamicParams = false;

export function generateMetadata({ params }) {
  const property = properties.find((item) => item.id === params.id);

  if (!property) {
    return {
      title: "Property not found | Richman Maker"
    };
  }

  return {
    title: `${property.title} | ${property.location} | ERP Group Company | Richman Maker`,
    description: `${property.title} in ${property.location}. ${property.investmentPotential}`,
    keywords: `${property.location.split(",")[0]} property, ${property.type}, land for sale Chennai, Richman Maker`
  };
}

export default function PropertyDetailPage({ params }) {
  const property = properties.find((item) => item.id === params.id);

  if (!property) {
    notFound();
  }

  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="card-white overflow-hidden">
              <img
                src={property.images[0]}
                alt={`${property.title} hero`}
                className="h-80 w-full object-cover"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {property.images.slice(1).map((image, index) => (
                <div key={image} className="card-white overflow-hidden">
                  <img
                    src={image}
                    alt={`${property.title} gallery ${index + 1}`}
                    className="h-48 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card-white p-8">
              {property.dealLabel ? (
                <span className="inline-flex rounded-full bg-[#C9A24A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A24A]">
                  {property.dealLabel}
                </span>
              ) : null}
              <p className="text-sm font-medium text-[#2E7D32]">{property.location}</p>
              <h1 className="mt-2 text-4xl font-semibold text-[#1E3A5F]">{property.title}</h1>
              <p className="mt-3 text-xl font-semibold text-[#C9A24A]">{property.price}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-[#6B7280]">
                <div className="surface-soft p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#2E7D32]">Type</p>
                  <p className="mt-2 font-semibold text-[#1E3A5F]">{property.type}</p>
                </div>
                <div className="surface-soft p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#2E7D32]">Size</p>
                  <p className="mt-2 font-semibold text-[#1E3A5F]">{property.sizeLabel}</p>
                </div>
                <div className="surface-soft p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#2E7D32]">Sq Ft</p>
                  <p className="mt-2 font-semibold text-[#1E3A5F]">{property.sqft}</p>
                </div>
                <div className="surface-soft p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#2E7D32]">Facing / format</p>
                  <p className="mt-2 font-semibold text-[#1E3A5F]">{property.facing}</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-[#C9A24A]/20 bg-[#F5F7FA] p-4 text-sm text-[#6B7280]">
                <span className="font-semibold text-[#1E3A5F]">Best use:</span> {property.useCase}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <a href={company.phoneHref} className="btn-orange w-full">
                  Call {company.phone}
                </a>
                <a href={company.whatsappHref} className="btn-outline w-full">
                  WhatsApp for Site Visit
                </a>
              </div>
            </div>
            <ContactForm redirectToWhatsApp />
          </div>
        </div>

        <div className="grid gap-8">
          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">1. Overview</h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              {property.overview} {property.description} Buyers who are comparing land in
              Chennai outskirts often want more than pricing. They want to understand whether the
              asset fits a future home plan, supports appreciation, and carries the kind of legal
              and location confidence that makes ownership feel worthwhile. This property is shaped
              around those exact priorities.
            </p>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">2. Key Features</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {property.keyFeatures.map((feature) => (
                <div key={feature} className="surface-soft p-5">
                  <p className="text-sm leading-7 text-[#1E3A5F]">{feature}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              Each feature matters because a good plot should be easy to understand, easy to
              visualize, and easier to hold with confidence. The goal is not just ownership, but
              smart ownership.
            </p>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">3. Amenities</h2>
            <div className="mt-5 space-y-4">
              {property.amenities.map((amenity) => (
                <p key={amenity} className="text-base leading-8 text-[#6B7280]">
                  {amenity}. These practical layout features matter because buyers want usability,
                  not just location branding. Better access and planning improve both current comfort
                  and future buyer perception.
                </p>
              ))}
            </div>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">4. Location Advantages</h2>
            <div className="mt-5 space-y-4">
              {property.locationAdvantages.map((advantage) => (
                <p key={advantage} className="text-base leading-8 text-[#6B7280]">
                  {advantage}. Location strength is one of the biggest drivers of future resale
                  confidence, which is why we encourage buyers to understand the surrounding growth
                  story before making a booking decision.
                </p>
              ))}
            </div>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">5. Investment Potential</h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              {property.investmentPotential} For serious land buyers, ROI is not only about a future
              selling price. It is also about buying in a corridor where demand can deepen over
              time, where the location is easy to explain to future buyers, and where the property
              can continue to make sense whether you build, hold, or exit later.
            </p>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">6. Legal Details</h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              {property.legalDetails} For buyers researching DTCP and CMDA-related questions, the
              real priority is clarity. Richman Maker helps explain documentation support in plain
              language so you understand what to review, what to confirm, and what each step means
              before you move ahead.
            </p>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">7. Pricing Breakdown</h2>
            <div className="mt-5 space-y-3">
              {property.pricingBreakdown.map((item) => (
                <p key={item} className="text-base leading-8 text-[#6B7280]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">8. Frequently Asked Questions</h2>
            <div className="mt-6 space-y-5">
              {property.faq.map((item) => (
                <div key={item.question} className="surface-soft p-5">
                  <h3 className="text-lg font-semibold text-[#1E3A5F]">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6B7280]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">9. Book Your Site Visit</h2>
            <p className="mt-5 text-base leading-8 text-[#6B7280]">
              Good plotted opportunities in growth corridors do not stay overlooked for long. If this
              property matches your budget, location preference, and future investment plan, speak
              with Richman Maker now and arrange a site visit before the next decision cycle moves
              the pricing.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={company.phoneHref} className="btn-orange">
                Call {company.phone}
              </a>
              <a href={company.secondaryPhoneHref} className="btn-outline">
                Call {company.secondaryPhone}
              </a>
              <a href={company.whatsappHref} className="btn-outline">
                WhatsApp to Book Visit
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
