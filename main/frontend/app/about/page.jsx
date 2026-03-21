import Link from "next/link";
import { aboutSections, company, internalLinkSuggestions } from "../../lib/content";

export const metadata = {
  title: "About ERP Group Company | Richman Maker | Chennai Land Promoters",
  description:
    "Learn about ERP Group Company and Richman Maker, its Chennai land promoter division focused on clear documentation, trusted buyer guidance, and growth-driven real estate investments.",
  keywords:
    "ERP Group Company, Richman Maker, Chennai land promoter, plots in Tambaram, DTCP plots Guduvanchery"
};

export default function AboutPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div className="card-white p-10">
          <p className="section-subtitle">About ERP Group Company and Richman Maker</p>
          <h1 className="mt-3 text-4xl font-semibold text-[#1E3A5F]">
            Built to help Chennai land buyers move with more confidence.
          </h1>
          <div className="mt-6 rounded-[24px] border border-[#C9A24A]/20 bg-[#F5F7FA] p-6">
            <p className="text-base leading-8 text-[#1E3A5F]">
              <span className="font-semibold">{company.parentName}</span> is the parent brand, and{" "}
              <span className="font-semibold text-[#C9A24A]">{company.brandName}</span> is its real estate division.
            </p>
          </div>
          <div className="mt-6 space-y-5">
            {aboutSections.story.map((paragraph) => (
              <p key={paragraph} className="section-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-white p-8 hover-lift">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Founder Vision</h2>
            <p className="mt-4 text-base leading-8 text-[#6B7280]">
              {aboutSections.founderVision}
            </p>
          </div>
          <div className="card-white p-8 hover-lift">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Why We Started</h2>
            <p className="mt-4 text-base leading-8 text-[#6B7280]">
              {aboutSections.whyStarted}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Our Vision</h2>
            <p className="mt-4 text-base leading-8 text-[#6B7280]">
              {aboutSections.vision}
            </p>
          </div>
          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Our Mission</h2>
            <p className="mt-4 text-base leading-8 text-[#6B7280]">
              {aboutSections.mission}
            </p>
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">Our Values</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {aboutSections.values.map((value) => (
              <div key={value.title} className="surface-soft p-5">
                <h3 className="text-lg font-semibold text-[#1E3A5F]">{value.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#6B7280]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">Why Clients Trust Us</h2>
          <div className="mt-6 space-y-5">
            {aboutSections.trustReasons.map((paragraph) => (
              <p key={paragraph} className="section-copy">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Start your Chennai property journey with trusted support.
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            Whether you are comparing plots in Tambaram, researching DTCP plots in Guduvanchery,
            or planning a long-term land investment near Chengalpattu, Richman Maker is ready to
            help you with clarity, confidence, and process support.
          </p>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            Buyers often contact us when they are tired of generic promises and want someone to
            explain the market in a practical way. If that sounds familiar, this is the right
            time to start the conversation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={company.phoneHref} className="btn-gold">
              Call {company.phone}
            </a>
            {internalLinkSuggestions.map((item) => (
              <Link key={item.href} href={item.href} className="btn-outline">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
