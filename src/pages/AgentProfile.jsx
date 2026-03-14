import { PhoneCall, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProperties } from "../api";
import PropertyCard from "../components/property/PropertyCard";
import SectionHeading from "../components/ui/SectionHeading";
import { agentProfile } from "../data/seed";

export default function AgentProfile() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getProperties().then((allProperties) => {
      setProperties(allProperties.filter((property) => property.agentSlug === agentProfile.slug));
    });
  }, []);

  return (
    <section className="container-shell section-shell">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-xl p-6">
          <img
            src={agentProfile.photo}
            alt={agentProfile.name}
            className="h-80 w-full rounded-xl object-cover"
          />
          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Agent Profile
          </p>
          <h1 className="mt-3 text-5xl font-bold tracking-tight text-slate-900">
            {agentProfile.name}
          </h1>
          <p className="mt-4 text-base text-gray-500 leading-relaxed">{agentProfile.bio}</p>
          <a
            href={`tel:${agentProfile.phone}`}
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900"
          >
            <PhoneCall className="h-4 w-4" />
            {agentProfile.phone}
          </a>
        </div>

        <div className="space-y-8">
          <SectionHeading
            eyebrow="Why ERP Group Company"
            title="Local expertise backed by responsive brokerage support."
            description="Work with an agent profile that combines neighbourhood awareness, faster communication, and curated property shortlists."
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="glass-panel rounded-xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Properties Listed
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-900">{properties.length}</p>
            </div>
            <div className="glass-panel rounded-xl p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
                Customer Reviews
              </p>
              <p className="mt-3 text-4xl font-bold text-slate-900">
                {agentProfile.reviews.length}
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-xl p-6">
            <h2 className="text-3xl font-semibold text-slate-900">Customer reviews</h2>
            <div className="mt-6 space-y-4">
              {agentProfile.reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold text-slate-900">{review.author}</p>
                    <p className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600">
                      <Star className="h-4 w-4 fill-current" />
                      {review.rating}.0
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-3xl font-semibold text-slate-900">Properties listed</h2>
          <Link to="/properties" className="text-sm font-semibold text-orange-600">
            View all listings
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
