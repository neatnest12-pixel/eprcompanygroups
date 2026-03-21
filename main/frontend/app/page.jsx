import Link from "next/link";
import { ArrowRight, BadgeCheck, CircleDollarSign, FileCheck2, MapPinned } from "lucide-react";
import {
  buyingProcess,
  chennaiOutskirtsReasons,
  company,
  featuredPropertiesIntro,
  finalCtaText,
  homeTestimonials,
  homeTrustParagraphs,
  internalLinkSuggestions,
  locationHighlights,
  whyChooseUs,
  whyInvestInChennai
} from "../lib/content";
import { properties } from "../lib/properties";

export const metadata = {
  title: "Richman Maker | Land Promoter in Chennai | Plots in Tambaram and Guduvanchery",
  description:
    "Richman Maker helps buyers find DTCP and growth-focused plots in Tambaram, Guduvanchery, Vandalur, and Chengalpattu with trusted guidance, documentation clarity, and strong investment insight.",
  keywords:
    "plots in Tambaram, land for sale Chennai, DTCP plots Guduvanchery, land promoter in Chennai, Chengalpattu plots"
};

const featured = properties.slice(0, 6);

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B5D3B]/90 via-[#145A3A]/85 to-[#1B7F5A]/80" />

        <div className="container-shell relative z-10 flex min-h-screen flex-col justify-center py-24">
          <div className="max-w-4xl fade-in">
            <p className="mb-5 text-sm uppercase tracking-[0.42em] text-white/75">
              Premium Chennai Land Investments
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Buy land in Chennai with more clarity, less confusion, and stronger long-term confidence.
            </h1>
            <h2 className="mt-4 text-2xl font-semibold text-[#D4AF37] sm:text-3xl">
              Richman Maker
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 sm:text-lg">
              If you are searching for plots in Tambaram, DTCP plots in Guduvanchery,
              land for sale in Chennai outskirts, or growth-focused investments near
              Vandalur and Chengalpattu, Richman Maker helps you move forward with better
              location insight, clearer documentation support, and a buying process built
              around trust.
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/85">
              {[
                "DTCP and approval-focused guidance",
                "Site visit support across Chennai growth zones",
                "Documentation clarity before commitment"
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href={company.phoneHref} className="btn-gold">
                Call Now
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link href="/properties" className="btn-outline">
                View Properties
              </Link>
              <Link href="/contact" className="btn-outline">
                Book Site Visit
              </Link>
            </div>
          </div>

          <div className="card-white mt-10 grid gap-4 p-6 md:grid-cols-[1.3fr_1fr_1fr_auto]">
            <input
              type="text"
              placeholder="Search by Tambaram, Guduvanchery, Vandalur..."
              className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 placeholder-emerald-400 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40"
            />
            <select className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40">
              <option>Property type</option>
              <option>DTCP Plot</option>
              <option>Residential Plot</option>
              <option>Investment Plot</option>
            </select>
            <select className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm text-emerald-950 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40">
              <option>Budget</option>
              <option>Below Rs 40 Lakh</option>
              <option>Rs 40 Lakh - Rs 60 Lakh</option>
              <option>Above Rs 60 Lakh</option>
            </select>
            <Link href="/properties" className="btn-gold">
              Search
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Trusted by serious buyers",
                text: "Families and investors come to us when they want less confusion and more confidence."
              },
              {
                title: "Built around ROI and safety",
                text: "We look at both documentation comfort and future resale logic before we recommend a plot."
              },
              {
                title: "Strong Chennai local focus",
                text: "Tambaram, Guduvanchery, Vandalur, and Chengalpattu remain at the center of our buyer guidance."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <p className="text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-white/78">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="section-subtitle">Why Buyers Trust Us</p>
            <h2 className="section-title">
              Real estate trust is built with documentation, local knowledge, and honest guidance.
            </h2>
            {homeTrustParagraphs.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-white/82">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="grid gap-5">
            {[
              {
                icon: FileCheck2,
                title: "Clear documentation focus",
                text: "We help buyers understand approvals, paperwork flow, and process checkpoints before they commit."
              },
              {
                icon: MapPinned,
                title: "Tambaram to Chengalpattu expertise",
                text: "Our guidance is built around the real growth stories shaping Chennai outskirts today."
              },
              {
                icon: CircleDollarSign,
                title: "Investment growth mindset",
                text: "We align each property suggestion with your budget, holding period, and expected future value."
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card-white p-6 hover-lift">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-[#D4AF37]/15 p-3">
                      <Icon className="h-6 w-6 text-emerald-900" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-emerald-950">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-emerald-800">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="space-y-8">
          <div>
            <p className="section-subtitle">Featured Properties</p>
            <h2 className="section-title">High-interest land opportunities in Chennai growth belts</h2>
            <p className="mt-4 max-w-4xl text-base leading-8 text-white/82">
              {featuredPropertiesIntro}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featured.map((property) => (
              <div key={property.id} className="card-white overflow-hidden hover-lift">
                <img
                  src={property.images[0]}
                  alt={`${property.title} in ${property.location}`}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <p className="text-sm font-medium text-emerald-700">{property.location}</p>
                  <h3 className="mt-2 text-xl font-semibold text-emerald-950">{property.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-[#9d7d17]">{property.price}</p>
                  <p className="mt-4 text-sm leading-7 text-emerald-800">
                    {property.benefits[0]}. {property.benefits[1]}. Plot size range: {property.plotSize}.
                  </p>
                  <p className="mt-3 text-sm leading-7 text-emerald-800">
                    Investment potential: {property.investmentPotential}
                  </p>
                  <div className="mt-5 flex flex-col gap-3">
                    <Link
                      href={`/properties/${property.id}`}
                      className="rounded-full border border-emerald-200 px-4 py-2 text-center text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
                    >
                      View Property Details
                    </Link>
                    <a
                      href={company.phoneHref}
                      className="rounded-full border border-emerald-200 px-4 py-2 text-center text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50"
                    >
                      Call for Site Visit
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="space-y-6">
          <p className="section-subtitle">Why Invest in Chennai</p>
          <h2 className="section-title">
            Chennai outskirts continue to attract serious land buyers for a reason.
          </h2>
          {whyInvestInChennai.map((paragraph) => (
            <p key={paragraph} className="text-base leading-8 text-white/82">
              {paragraph}
            </p>
          ))}
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {chennaiOutskirtsReasons.map((reason) => (
              <div key={reason} className="card-white p-5 hover-lift">
                <p className="text-sm leading-7 text-emerald-900">{reason}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="space-y-8">
          <div>
            <p className="section-subtitle">Why Choose Richman Maker</p>
            <h2 className="section-title">Safety, trust, and future profit matter in every land decision.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="card-white p-6 hover-lift">
                <h3 className="text-xl font-semibold text-emerald-950">{item.title}</h3>
                <p className="mt-4 text-sm leading-8 text-emerald-800">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="space-y-8">
          <div>
            <p className="section-subtitle">Our Process</p>
            <h2 className="section-title">A smoother property journey from first inquiry to secure ownership.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {buyingProcess.map((item, index) => (
              <div key={item.step} className="card-white p-6 hover-lift">
                <p className="text-sm font-semibold text-[#9d7d17]">0{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-emerald-950">{item.step}</h3>
                <p className="mt-3 text-sm leading-7 text-emerald-800">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="space-y-8">
          <div>
            <p className="section-subtitle">Location Highlights</p>
            <h2 className="section-title">Tambaram, Guduvanchery, Vandalur, and Chengalpattu are growing with purpose.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {locationHighlights.map((item) => (
              <div key={item.name} className="card-white p-6 hover-lift">
                <h3 className="text-xl font-semibold text-emerald-950">{item.name}</h3>
                <p className="mt-4 text-sm leading-8 text-emerald-800">{item.summary}</p>
                <Link href="/locations" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900">
                  Read full location guide
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-shell">
        <div className="space-y-8">
          <div>
            <p className="section-subtitle">Testimonials</p>
            <h2 className="section-title">What buyers say after working with Richman Maker</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {homeTestimonials.map((item) => (
              <div key={item.name} className="card-white p-6 hover-lift">
                <p className="text-sm leading-8 text-emerald-800">"{item.quote}"</p>
                <p className="mt-4 text-sm font-semibold text-emerald-950">{item.name}</p>
              </div>
            ))}
          </div>
          <Link href="/testimonials" className="btn-outline max-w-max">
            Read More Client Stories
          </Link>
        </div>
      </section>

      <section className="container-shell pb-24 pt-6">
        <div className="card-white p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#9d7d17]">Final Call To Action</p>
              <h2 className="mt-3 text-3xl font-semibold text-emerald-950">
                Book your site visit before the next price increase changes the entry point.
              </h2>
              <p className="mt-5 text-base leading-8 text-emerald-800">{finalCtaText}</p>
              <div className="mt-5 rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-950">
                  Best for buyers who want:
                </p>
                <p className="mt-2 text-sm leading-7 text-emerald-800">
                  Clear documents, a strong location story, better appreciation potential, and a
                  smoother path from inquiry to ownership.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <a href={company.phoneHref} className="btn-gold w-full">
                Call {company.phone}
              </a>
              <a href={company.whatsappHref} className="btn-outline w-full border-emerald-200 text-emerald-950">
                WhatsApp Richman Maker
              </a>
              <div className="rounded-2xl bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-950">Internal links for better buyer flow</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {internalLinkSuggestions.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-emerald-200 px-4 py-2 text-sm font-medium text-emerald-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
