import ContactForm from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <section className="container-shell section-shell">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="section-subtitle">Contact</p>
          <h1 className="section-title mt-3">Get in Touch</h1>
          <p className="mt-4 text-sm text-white/80">
            Share your requirements and our team will contact you with verified options.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="tel:+918939427799"
              className="btn-outline"
            >
              Call Now
            </a>
            <a
              href="https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services"
              className="btn-gold"
            >
              WhatsApp
            </a>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Chennai Map"
              src="https://www.google.com/maps?q=Chennai%2C%20Tamil%20Nadu&output=embed"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
        <ContactForm redirectToWhatsApp />
      </div>
    </section>
  );
}
