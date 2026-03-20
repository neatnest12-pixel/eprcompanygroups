import { MapPin, MessageCircle, PhoneCall } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import SectionHeading from "../components/ui/SectionHeading";
import Textarea from "../components/ui/Textarea";
import { buildWhatsAppLink } from "../lib/utils";

export default function Contact() {
  const whatsappLink = buildWhatsAppLink(
    "Hello, I would like to connect with ERP Group Company about a property requirement."
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Contact"
        title="Contact ERP Group Company"
        description="We are here to help you find your perfect property."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="glass-panel p-8">
            <h3 className="text-2xl font-semibold text-slate-900">Contact information</h3>
            <div className="mt-5 space-y-4 text-sm text-gray-500">
              <p className="inline-flex items-center gap-3 text-slate-700">
                <PhoneCall className="h-4 w-4 text-orange-500" />
                7299007799
              </p>
              <p className="inline-flex items-center gap-3 text-slate-700">
                <PhoneCall className="h-4 w-4 text-orange-500" />
                8939427799
              </p>
            </div>

            <div className="mt-6">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                <Button className="w-full">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-2xl font-semibold text-slate-900">Business hours</h3>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Monday – Saturday
            </p>
            <p className="text-sm font-semibold text-slate-900">9:00 AM – 7:00 PM</p>
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-2xl font-semibold text-slate-900">Send an enquiry</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <Input placeholder="Name" required />
              <Input type="tel" placeholder="Phone" required />
              <Input type="email" placeholder="Email" required />
              <Textarea rows={5} placeholder="Message" required />
              <Button type="submit" className="w-full">
                Send Enquiry
              </Button>
            </form>
          </div>
        </div>

        <div className="glass-panel overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-5">
            <h3 className="text-2xl font-semibold text-slate-900">Google map</h3>
            <p className="mt-2 text-sm text-gray-500">OMR Chennai</p>
          </div>
          <iframe
            title="OMR Chennai Map"
            src="https://maps.google.com/maps?q=OMR%20Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
