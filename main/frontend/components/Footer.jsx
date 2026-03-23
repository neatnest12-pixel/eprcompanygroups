import Link from "next/link";
import { company } from "../lib/content";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1E3A5F]/10 bg-[#1E3A5F] text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
            {company.parentName}
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#C9A24A]">{company.brandName}</p>
          <p className="mt-4 text-sm leading-7 text-white/70">
            Premium real estate guidance for plots, flats, and rentals across Chennai with a focus
            on verified listings and buyer confidence.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-[#C9A24A]">Home</Link>
            </li>
            <li>
              <Link href="/properties" className="hover:text-[#C9A24A]">Properties</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C9A24A]">About</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#C9A24A]">Services</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C9A24A]">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <p className="text-sm text-white/70">Phone: {company.phoneDisplay}</p>
          <p className="mt-2 text-sm text-white/70">{company.address}</p>
          <p className="mt-2 text-sm text-white/70">{company.emails[0]}</p>
          <a href={company.whatsappHref} className="mt-2 inline-flex text-sm text-white/70 hover:text-[#C9A24A]">
            WhatsApp: {company.phone}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        (c) 2026 {company.parentName}. {company.brandName}.
      </div>
    </footer>
  );
}
