import Link from "next/link";
import { chennaiOutskirtsReasons, company, locationGuides } from "../../lib/content";

export const metadata = {
  title: "Best Chennai Plot Locations | Tambaram, Guduvanchery, Vandalur, Chengalpattu",
  description:
    "Discover why Tambaram, Guduvanchery, Vandalur, and Chengalpattu are top Chennai plot investment destinations with strong connectivity, growth, and future value.",
  keywords:
    "plots in Tambaram, DTCP plots Guduvanchery, Vandalur plots, Chengalpattu land investment, Chennai outskirts"
};

export default function LocationsPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Locations</p>
          <h1 className="section-title mt-3">
            Chennai location content that buyers actually search before they invest
          </h1>
          <p className="mt-5 max-w-5xl text-base leading-8 text-[#6B7280]">
            Location SEO matters because most buyers research area potential before they commit to a
            site visit. When someone searches for plots in Tambaram, DTCP plots Guduvanchery, or
            land for sale near Chengalpattu, they are not just looking for availability. They are
            trying to understand whether the area is growing, connected, and worth trusting with
            their money. This page is designed to answer that intent clearly.
          </p>
        </div>

        <div className="grid gap-6">
          {locationGuides.map((location) => (
            <div key={location.slug} className="card-white p-8 hover-lift">
              <h2 className="text-2xl font-semibold text-[#1E3A5F]">{location.name}</h2>
              <div className="mt-5 space-y-4">
                {location.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[#6B7280]">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Top reasons to invest in Chennai outskirts
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {chennaiOutskirtsReasons.map((reason) => (
              <div key={reason} className="surface-soft p-5">
                <p className="text-sm leading-7 text-[#1E3A5F]">{reason}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Want help choosing the right location?
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            A good property decision often begins with a better location decision. If you want help
            comparing Tambaram, Guduvanchery, Vandalur, and Chengalpattu based on budget, future
            value, and end use, speak with Richman Maker today.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={company.phoneHref} className="btn-gold">
              Call {company.phone}
            </a>
            <Link href="/properties" className="btn-outline">
              View Properties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
