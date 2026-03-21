import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services"
      className="fixed bottom-24 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-[#2E7D32] text-white shadow-[0_18px_38px_rgba(46,125,50,0.35)] transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
