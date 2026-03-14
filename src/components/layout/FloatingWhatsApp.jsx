import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../../lib/utils";

export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppLink(
        "Hello, I am interested in this property listed on ERP Group Company website."
      )}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-soft transition hover:scale-[1.02]"
    >
      <MessageCircle className="h-5 w-5" />
      WhatsApp
    </a>
  );
}
