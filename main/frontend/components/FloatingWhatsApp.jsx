import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services"
      className="fixed bottom-24 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#16A34A] text-white shadow-luxe transition hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}
