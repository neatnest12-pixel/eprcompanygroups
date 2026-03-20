import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck, Sparkles, Users } from "lucide-react";
import { properties } from "../lib/properties";

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-[#0B5D3B]/80" />

        <div className="container-shell relative z-10 flex min-h-screen flex-col justify-center py-24">
          <div className="max-w-3xl animate-fade-up">
            <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/70">EPR</p>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              EPR GROUP COMPANY
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-white/90 sm:text-3xl">
              Richman Maker
            </h2>
            <p className="mt-6 text-base text-white/80 sm:text-lg">
              Find Your Dream Property with Trusted Experts
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/properties"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B5D3B] transition hover:bg-white/90"
              >
                Explore Properties
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Now
              </Link>
              <a
                href="tel:+918939427799"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="glass-panel mt-10 grid gap-4 p-6 md:grid-cols-[1.3fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Enter location"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-white/30">
              <option className="text-[#0B5D3B]">Property type</option>
              <option className="text-[#0B5D3B]">Villa</option>
              <option className="text-[#0B5D3B]">Apartment</option>
              <option className="text-[#0B5D3B]">Plot</option>
            </select>
            <select className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 focus:outline-none focus:ring-2 focus:ring-white/30">
              <option className="text-[#0B5D3B]">Budget</option>
              <option className="text-[#0B5D3B]">Rs 40L - Rs 70L</option>
              <option className="text-[#0B5D3B]">Rs 70L - Rs 1Cr</option>
              <option className="text-[#0B5D3B]">Rs 1Cr+</option>
            </select>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#16A34A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#14a346]"
            >
              Search
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="section-subtitle">Featured</p>
            <h2 className="section-title">Featured Properties</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {properties.map((property) => (
              <div key={property.id} className="glass-panel overflow-hidden">
                <img
                  src={property.images[0]}
                  alt={`${property.title} property`}
                  className="h-44 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-5">
                  <p className="text-sm text-white/70">{property.location}</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{property.title}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-white/80">
                    <span>{property.type}</span>
                    <span className="font-semibold">{property.price}</span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <Link
                      href={`/properties/${property.id}`}
                      className="w-full rounded-full border border-white/30 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      View Details
                    </Link>
                    <a
                      href="tel:+918939427799"
                      className="w-full rounded-full border border-white/30 px-4 py-2 text-center text-sm font-semibold text-white/90 hover:bg-white/10"
                    >
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {[
            { icon: Users, title: "Trusted by Clients" },
            { icon: ShieldCheck, title: "Verified Properties" },
            { icon: Sparkles, title: "Fast Deals" },
            { icon: BadgeCheck, title: "Expert Guidance" }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-panel flex items-center gap-4 p-6">
                <Icon className="h-6 w-6 text-white" />
                <p className="text-sm font-semibold text-white">{item.title}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="flex flex-col gap-10">
          <div>
            <p className="section-subtitle">Testimonials</p>
            <h2 className="section-title">Client Reviews</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Riya Nair",
                feedback:
                  "EPR Group Company delivered verified listings and guided us to the perfect villa within weeks."
              },
              {
                name: "Arun Prakash",
                feedback:
                  "Highly professional team with strong market knowledge. Our property sale closed faster than expected."
              },
              {
                name: "Meera Bose",
                feedback:
                  "Exceptional service and transparency. The investment consulting was clear and confidence-building."
              }
            ].map((item) => (
              <div key={item.name} className="glass-panel p-6">
                <p className="text-sm text-white/80">"{item.feedback}"</p>
                <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
