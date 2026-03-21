import ContactForm from "../../components/ContactForm";
import { company } from "../../lib/content";

export const metadata = {
  title: "Contact Richman Maker | Tambaram Chennai Land Promoter",
  description:
    "Contact Richman Maker in Tambaram, Chennai for plots, site visits, investment guidance, documentation support, and verified land opportunities in Chennai outskirts.",
  keywords:
    "contact Richman Maker, Tambaram Chennai land promoter, plots in Tambaram contact, Chennai property consultation"
};

export default function ContactPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div>
              <p className="section-subtitle">Contact Us</p>
              <h1 className="section-title mt-3">
                Speak with a Chennai land promoter who values clarity and buyer confidence.
              </h1>
              <p className="mt-5 text-base leading-8 text-white/82">
                If you are searching for plots in Tambaram, land for sale in Chennai, DTCP plots in
                Guduvanchery, or future-focused properties near Vandalur and Chengalpattu, now is a
                good time to start the conversation. Richman Maker helps buyers compare locations,
                understand process steps, and move toward better property decisions with less
                confusion.
              </p>
            </div>

            <div className="card-white p-8">
              <h2 className="text-2xl font-semibold text-emerald-950">Contact information</h2>
              <div className="mt-5 space-y-3 text-base text-emerald-800">
                <p>
                  <span className="font-semibold text-emerald-950">Phone:</span> {company.phone}
                </p>
                <p>
                  <span className="font-semibold text-emerald-950">WhatsApp:</span> {company.phone}
                </p>
                <p>
                  <span className="font-semibold text-emerald-950">Address:</span> {company.address}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={company.phoneHref} className="btn-gold">
                  Call Now
                </a>
                <a href={company.whatsappHref} className="btn-outline border-emerald-200 text-emerald-950">
                  WhatsApp Us
                </a>
              </div>
              <p className="mt-5 text-sm leading-7 text-emerald-800">
                Fast response matters in real estate because the best-value plots often attract
                attention quickly. If you already have a location or budget in mind, contact us
                now and we will help you move faster with more clarity.
              </p>
            </div>

            <div className="card-white overflow-hidden">
              <iframe
                title="Richman Maker Tambaram map"
                src="https://www.google.com/maps?q=Tambaram%2C%20Chennai&output=embed"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm redirectToWhatsApp />
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-emerald-950">Why contact us today</h2>
          <div className="mt-5 space-y-4">
            <p className="text-base leading-8 text-emerald-800">
              Chennai land pricing does not wait for indecision forever. In active growth corridors,
              even a modest shift in buyer demand can move entry prices higher. If you are already
              researching Tambaram, Guduvanchery, Vandalur, or Chengalpattu, a quick consultation
              now can help you act before a better-value opportunity becomes a more expensive one.
            </p>
            <p className="text-base leading-8 text-emerald-800">
              Contacting Richman Maker today gives you more than a callback. It gives you a clearer
              understanding of which location suits your budget, what legal questions to ask, and
              how to shortlist properties that support both emotional security and financial growth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
