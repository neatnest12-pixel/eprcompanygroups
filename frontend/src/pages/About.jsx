import SectionHeading from "../components/ui/SectionHeading";

const features = [
  "Verified Properties",
  "Transparent Deals",
  "Expert Market Knowledge",
  "Best Investment Opportunities"
];

const stats = [
  { label: "Properties Listed", value: "2500+" },
  { label: "Happy Customers", value: "10000+" },
  { label: "Cities Covered", value: "50+" },
  { label: "Verified Listings", value: "99%" }
];

export default function About() {
  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="About ERP Group Company"
        title="About ERP Group Company"
        description="Richman Maker"
      />
      <p className="mt-4 max-w-3xl text-base text-gray-500 leading-relaxed">
        ERP Group Company is a trusted real estate consultancy specializing in residential
        and commercial properties across Chennai and surrounding areas. We help investors
        and home buyers discover profitable and secure real estate opportunities.
      </p>

      <div className="mt-10 glass-panel p-8">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-500">
          Richman Maker
        </p>
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          ERP Group Company combines local market expertise with verified property
          inventories to help you make confident, long-term decisions.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="glass-panel p-8">
          <h3 className="text-2xl font-semibold text-slate-900">Our Mission</h3>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">
            Our mission is to help people grow their wealth through smart real estate
            investments while ensuring transparency, trust, and customer satisfaction.
          </p>
        </div>

        <div className="glass-panel p-8">
          <h3 className="text-2xl font-semibold text-slate-900">Why choose us</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature} className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 glass-panel p-8">
        <h3 className="text-2xl font-semibold text-slate-900">Company statistics</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
