import { Building2, ClipboardCheck, Home, KeyRound, Landmark, Wrench } from "lucide-react";

export const metadata = {
  title: "Services | ERP Group Company | Richman Maker",
  description:
    "Explore ERP Group Company services including acres land sales, new and resale properties, rental, lease, and construction support.",
  keywords:
    "acres land sales, resale properties, rental services, lease services, construction services"
};

const services = [
  { title: "Acres land sales", icon: Landmark },
  { title: "New & resale properties (land, flat, house)", icon: Home },
  { title: "Layout plot sales", icon: Building2 },
  { title: "Rental services", icon: KeyRound },
  { title: "Lease services", icon: ClipboardCheck },
  { title: "Construction services", icon: Wrench }
];

export default function ServicesPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Our Services</p>
          <h1 className="section-title mt-3">Professional property support across buying, selling, rental, and construction</h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-[#6B7280]">
            ERP Group Company supports clients across the full property lifecycle with practical guidance, verified opportunities, and local market support.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="card-white p-8 hover-lift">
                <div className="rounded-2xl bg-[#C9A24A]/12 p-3 w-fit">
                  <Icon className="h-5 w-5 text-[#1E3A5F]" />
                </div>
                <h2 className="mt-5 text-2xl font-semibold text-[#1E3A5F]">{service.title}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
