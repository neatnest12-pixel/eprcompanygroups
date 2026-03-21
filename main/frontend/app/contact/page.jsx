import ContactForm from "../../components/ContactForm";
import { company } from "../../lib/content";

export const metadata = {
  title: "Contact | ERP Group Company | Richman Maker",
  description:
    "Contact ERP Group Company - Richman Maker for premium plots, flats, and rental opportunities in Chennai.",
  keywords: "contact ERP Group Company, Richman Maker Chennai, property enquiry"
};

export default function ContactPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Contact</p>
          <h1 className="section-title mt-3">Let us help you find the right property</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-6">
            <div className="card-white p-6">
              <h2 className="text-xl font-semibold text-[#1E3A5F]">Contact Information</h2>
              <div className="mt-4 space-y-3 text-sm text-[#6B7280]">
                <p>
                  <span className="font-semibold text-[#1E3A5F]">Company:</span> {company.parentName}
                </p>
                <p>
                  <span className="font-semibold text-[#1E3A5F]">Brand:</span> {company.brandName}
                </p>
                <p>
                  <span className="font-semibold text-[#1E3A5F]">Phone:</span> {company.phoneDisplay}
                </p>
                <p>
                  <span className="font-semibold text-[#1E3A5F]">Address:</span> {company.address}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={company.phoneHref} className="btn-orange">
                  Call {company.phone}
                </a>
                <a href={company.secondaryPhoneHref} className="btn-outline">
                  Call {company.secondaryPhone}
                </a>
                <a href={company.whatsappHref} className="btn-outline">
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="card-white overflow-hidden">
              <iframe
                title="ERP Group Company map"
                src="https://www.google.com/maps?q=Chennai&output=embed"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <ContactForm redirectToWhatsApp />
        </div>
      </div>
    </section>
  );
}
