import SectionHeading from "../components/ui/SectionHeading";

const services = [
  {
    title: "Property buying",
    description:
      "Shortlist verified listings, compare pricing, and get guided site visits across OMR, ECR, and Chennai growth zones."
  },
  {
    title: "Property selling",
    description:
      "Position your property with the right pricing strategy, marketing support, and qualified buyer outreach."
  },
  {
    title: "Rental services",
    description:
      "Find reliable tenants or rental homes with complete paperwork and quick turnaround support."
  },
  {
    title: "Investment consulting",
    description:
      "Identify high-growth plots, villas, and commercial land with appreciation insights and market timing guidance."
  }
];

export default function Services() {
  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Services"
        title="Professional real-estate support tailored to your goals."
        description="ERP Group Company offers advisory services across buying, selling, rentals, and investment planning."
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.title} className="glass-panel p-8">
            <h3 className="text-2xl font-semibold text-slate-900">{service.title}</h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
