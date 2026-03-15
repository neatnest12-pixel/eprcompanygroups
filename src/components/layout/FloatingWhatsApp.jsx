import { MessageCircle, PhoneCall } from "lucide-react";
import { buildWhatsAppLink } from "../../lib/utils";

export default function FloatingWhatsApp() {
  return (
    <>
      <a
        href="tel:7299007799"
        className="fixed bottom-6 left-6 z-30 inline-flex items-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-bold text-slate-900 shadow-soft md:hidden"
      >
        <PhoneCall className="h-5 w-5" />
        Call
      </a>
      <a
        href={buildWhatsAppLink(
          "Hello, I am interested in this property listed on ERP Group Company website."
        )}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp
      </a>
    </>
  );
}
