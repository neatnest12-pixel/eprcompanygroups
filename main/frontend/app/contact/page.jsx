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
                <p><span className="font-semibold text-[#1E3A5F]">Company:</span> EPR GROUP COMPANY</p>
                <p><span className="font-semibold text-[#1E3A5F]">Brand:</span> "Richman Maker"</p>
                <p><span className="font-semibold text-[#1E3A5F]">Address:</span> No.79, 5th Street, Rajeswari Nagar, Kelambakkam, Chennai - 603103, Near Mermaid Resort</p>
                <p><span className="font-semibold text-[#1E3A5F]">Mobile:</span> 7299007799 / 8939427799</p>
                <p><span className="font-semibold text-[#1E3A5F]">Email:</span> eprgroupcompanykelambakkam@gmail.com</p>
                <p><span className="font-semibold text-[#1E3A5F]">Email:</span> eprgroupcompany@gmail.com</p>
                <p><span className="font-semibold text-[#1E3A5F]">Website:</span> www.eprgroupcompany.in</p>
                <p><span className="font-semibold text-[#1E3A5F]">Website:</span> www.eprgroupcompany.com</p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={company.phoneHref} className="btn-orange">Call Now</a>
                <a href={company.whatsappHref} className="btn-outline">WhatsApp</a>
              </div>
            </div>

            <div className="card-white p-6">
              <h2 className="text-xl font-semibold text-[#1E3A5F]">Social Links</h2>
              <div className="mt-4 space-y-3 text-sm text-[#6B7280]">
                <p><span className="font-semibold text-[#1E3A5F]">Facebook:</span> To be updated</p>
                <p><span className="font-semibold text-[#1E3A5F]">Instagram:</span> To be updated</p>
                <p><span className="font-semibold text-[#1E3A5F]">YouTube:</span> To be updated</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <ContactForm title="Send Enquiry" />
            <div className="card-white overflow-hidden">
              <iframe
                title="ERP Group Company map"
                src="https://www.google.com/maps?q=Kelambakkam%20Chennai&z=14&output=embed"
                className="h-[320px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
