import { FileCheck2, Home, Landmark, Sparkles, MapPinned } from "lucide-react";
import Link from "next/link";
import { company, professionalGuidanceText, serviceDetails } from "../../lib/content";

export const metadata = {
  title: "Real Estate Services in Chennai | Plot Selling and Documentation Support | Richman Maker",
  description:
    "Explore Richman Maker real estate services including plot selling, investment consulting, documentation support, registration assistance, and site visit management in Chennai.",
  keywords:
    "plot selling Chennai, documentation support real estate, registration assistance Chennai, site visit management"
};

const serviceIcons = {
  "Plot Selling": Home,
  "Investment Consulting": Sparkles,
  "Documentation Support": FileCheck2,
  "Registration Assistance": Landmark,
  "Site Visit Management": MapPinned
};

export default function ServicesPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Services</p>
          <h1 className="section-title mt-3">
            Professional real estate support for buyers who want more than a sales pitch.
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#6B7280]">
            Richman Maker supports Chennai land buyers with guidance that is practical, transparent,
            and aligned with real goals. Whether you are buying your first plot, comparing locations
            for appreciation, or trying to move through documentation and registration without costly
            confusion, our services are built to make each step easier to understand and safer to
            complete.
          </p>
        </div>

        <div className="grid gap-6">
          {serviceDetails.map((service) => {
            const Icon = serviceIcons[service.title] || Home;
            return (
              <div key={service.title} className="card-white p-8 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-[#C9A24A]/12 p-3">
                    <Icon className="h-6 w-6 text-[#1E3A5F]" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-[#1E3A5F]">{service.title}</h2>
                    <div className="mt-4 space-y-4">
                      {service.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-base leading-8 text-[#6B7280]">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Why professional guidance matters in real estate
          </h2>
          <div className="mt-5 space-y-4">
            {professionalGuidanceText.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-[#6B7280]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Need help choosing the right service?
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            Some buyers need investment consulting first. Others need help with site visits or
            document clarity before they feel comfortable. Tell us where you are in the process and
            Richman Maker will guide you toward the right next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={company.phoneHref} className="btn-gold">
              Call {company.phone}
            </a>
            <Link href="/contact" className="btn-outline">
              Contact Our Team
            </Link>
            <Link href="/properties" className="btn-outline">
              View Properties
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
