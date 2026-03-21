import { company, testimonialsPage } from "../../lib/content";

export const metadata = {
  title: "Client Testimonials | Richman Maker Chennai Property Buyers",
  description:
    "Read detailed client testimonials about buying plots in Tambaram, Guduvanchery, Vandalur, and Chengalpattu with Richman Maker.",
  keywords:
    "Richman Maker reviews, Chennai property buyer testimonials, Tambaram plots feedback"
};

export default function TestimonialsPage() {
  return (
    <section className="container-shell section-shell">
      <div className="space-y-10">
        <div>
          <p className="section-subtitle">Testimonials</p>
          <h1 className="section-title mt-3">
            Trust is easier to believe when it comes from real buyer experiences
          </h1>
          <p className="mt-5 max-w-4xl text-base leading-8 text-[#6B7280]">
            Chennai property buyers usually remember the process as much as the property itself.
            These testimonials reflect the value Richman Maker clients found in smoother site visits,
            clearer documentation guidance, better location comparisons, and more confident
            investment decisions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {testimonialsPage.map((item) => (
            <div key={item.name} className="card-white p-8 hover-lift">
              <p className="text-base leading-8 text-[#6B7280]">"{item.text}"</p>
              <p className="mt-5 text-sm font-semibold text-[#1E3A5F]">{item.name}</p>
            </div>
          ))}
        </div>

        <div className="card-white p-8">
          <h2 className="text-2xl font-semibold text-[#1E3A5F]">
            Ready for a smoother property journey?
          </h2>
          <p className="mt-4 text-base leading-8 text-[#6B7280]">
            If you want your buying process to feel more organized, transparent, and future-focused,
            reach out to Richman Maker. We will help you move from online research to confident site
            visit and ownership with far less uncertainty.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={company.phoneHref} className="btn-gold">
              Call {company.phone}
            </a>
            <a href={company.whatsappHref} className="btn-outline">
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
