import { Home, Landmark, Sparkles } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Property Buying Assistance",
    description:
      "End-to-end support for selecting, evaluating, and securing premium properties."
  },
  {
    icon: Landmark,
    title: "Property Selling Services",
    description:
      "Market-driven pricing, verified leads, and negotiation support for faster deals."
  },
  {
    icon: Sparkles,
    title: "Investment Consulting",
    description:
      "Strategic guidance for high-growth locations, ROI planning, and portfolio expansion."
  }
];

export default function ServicesPage() {
  return (
    <section className="container-shell section-shell">
      <div className="flex flex-col gap-10">
        <div>
          <p className="section-subtitle">Services</p>
          <h1 className="section-title mt-3">Premium Real Estate Services</h1>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="card-white p-6 hover-lift">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D4AF37]/15">
                  <Icon className="h-6 w-6 text-emerald-900" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-950">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-emerald-800">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
