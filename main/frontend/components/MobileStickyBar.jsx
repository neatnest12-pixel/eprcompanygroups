import { MessageCircle, PhoneCall } from "lucide-react";

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-3 border-t border-[#D7DFEA] bg-white/95 px-4 py-3 text-[#1E3A5F] shadow-[0_-12px_30px_rgba(30,58,95,0.08)] backdrop-blur md:hidden">
      <a
        href="tel:+918939427799"
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#1E3A5F]/20 px-4 py-2 text-sm font-semibold"
      >
        <PhoneCall className="h-4 w-4" />
        Call Now
      </a>
      <a
        href="https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2E7D32] px-4 py-2 text-sm font-semibold text-white"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>
    </div>
  );
}
