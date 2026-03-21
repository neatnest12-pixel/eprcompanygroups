import Link from "next/link";
import { properties } from "../lib/properties";
import PropertyCard from "../components/PropertyCard";

export const metadata = {
  title: "ERP Group Company | Richman Maker | Premium Real Estate",
  description:
    "ERP Group Company - Richman Maker presents premium plots, flats, and rental properties across Chennai.",
  keywords:
    "ERP Group Company, Richman Maker, Chennai properties, plots in OMR, ECR rentals, land promoters"
};

const featuredProperties = properties.slice(0, 4);
const latestProperties = properties.slice(4, 8);

const stats = [
  { label: "Property categories", value: "6+" },
  { label: "Live listings", value: "25+" },
  { label: "Buyer enquiries", value: "100+" },
  { label: "Market focus", value: "OMR / ECR" }
];

const locationTags = ["Siruseri", "OMR", "ECR", "Padur"];

const popularLocations = ["Semmanchery", "Siruseri", "Sembakkam", "Vyasarpadi"];

const categories = [
  "Plots",
  "Houses",
  "Villas",
  "Apartments",
  "Commercial",
  "Farm lands"
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B1C33] via-[#1E3A5F] to-[#0F223A]">
        <div className="container-shell grid min-h-[70vh] gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-2xl text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.38em] text-[#C9A24A]">
              ERP GROUP COMPANY
            </p>
            <h1 className="mt-5 text-[36px] font-semibold leading-[1.2] sm:text-[56px]">
              Find Your Dream Property
            </h1>
            <p className="mt-4 text-xl font-semibold text-[#C9A24A]">
              ERP Group Company - Richman Maker
            </p>
            <p className="mt-3 text-base text-white/80">
              Trusted real estate partner across Chennai
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {locationTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>

        <div className="container-shell relative -mt-16 pb-12">
          <div className="card-white grid gap-4 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:grid-cols-[1.3fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Keywords, landmark, or property type"
              className="form-input"
            />
            <input
              type="text"
              placeholder="Preferred location"
              className="form-input"
            />
            <select className="form-input">
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <Link href="/properties" className="btn-orange">
              Start search
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <div
                key={item.label}
                className="rounded-[20px] border border-white/10 bg-[#0F223A] p-5 text-white shadow-[0_18px_40px_rgba(15,34,58,0.45)] transition duration-300 hover:-translate-y-2"
              >
                <p className="text-2xl font-semibold text-[#C9A24A]">{item.value}</p>
                <p className="mt-2 text-sm text-white/70">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[#F5F7FA]">
        <div className="container-shell space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-subtitle">Featured Properties</p>
              <h2 className="section-title">Handpicked opportunities with strong buyer demand</h2>
            </div>
            <Link href="/properties" className="text-sm font-semibold uppercase tracking-[0.28em] text-[#F97316]">
              View all properties
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell space-y-8">
          <div>
            <p className="section-subtitle">Latest Listings</p>
            <h2 className="section-title">Fresh inventory from premium Chennai corridors</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {latestProperties.map((property) => (
              <PropertyCard key={property.id} property={property} variant="large" />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-[#F5F7FA]">
        <div className="container-shell space-y-8">
          <div>
            <p className="section-subtitle">Popular Locations</p>
            <h2 className="section-title">High-demand micro markets across Chennai</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {popularLocations.map((location) => (
              <div
                key={location}
                className="rounded-[22px] bg-gradient-to-br from-[#0B1C33] via-[#1E3A5F] to-[#0F223A] p-6 text-white shadow-[0_18px_40px_rgba(15,34,58,0.4)]"
              >
                <p className="text-lg font-semibold">{location}</p>
                <p className="mt-2 text-sm text-white/70">Premium buyer demand zone</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container-shell space-y-8">
          <div>
            <p className="section-subtitle">Categories</p>
            <h2 className="section-title">Explore properties by category</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {categories.map((category) => (
              <div key={category} className="card-white p-5 text-center hover-lift">
                <p className="text-sm font-semibold text-[#1E3A5F]">{category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
