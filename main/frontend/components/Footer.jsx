import Link from "next/link";
import { company } from "../lib/content";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-[#1E3A5F]/10 bg-[#1E3A5F] text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <img
            src="/logo.png"
            alt="ERP Group Company Richman Maker Land Promoters logo"
            className="h-24 w-auto rounded-2xl bg-white p-2 shadow-sm"
          />
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/80">
            {company.parentName}
          </p>
          <p className="mt-2 text-xl font-semibold text-[#C9A24A]">
            {company.brandName} - {company.category}
          </p>
          <div className="gold-divider mt-5" />
          <p className="mt-4 max-w-md text-sm leading-7 text-white/72">
            Premium real estate guidance for plots in Tambaram, Guduvanchery, Vandalur,
            and Chengalpattu with documentation clarity and investment-first support.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/" className="hover:text-[#C9A24A]">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#C9A24A]">About</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-[#C9A24A]">Services</Link>
            </li>
            <li>
              <Link href="/properties" className="hover:text-[#C9A24A]">Properties</Link>
            </li>
            <li>
              <Link href="/locations" className="hover:text-[#C9A24A]">Locations</Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-[#C9A24A]">Testimonials</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-[#C9A24A]">Blog</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C9A24A]">Contact</Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-[#C9A24A]">Admin Login</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-white">Contact</h4>
          <p className="text-sm text-white/70">Phone: {company.phone}</p>
          <a href={company.whatsappHref} className="text-sm text-white/70 hover:text-[#C9A24A]">
            WhatsApp: {company.phone}
          </a>
          <p className="mt-2 text-sm text-white/70">{company.address}</p>
          <div className="mt-4 flex gap-3 text-sm text-white/70">
            <span className="hover:text-[#C9A24A]">LinkedIn</span>
            <span className="hover:text-[#C9A24A]">Instagram</span>
            <span className="hover:text-[#C9A24A]">Facebook</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        (c) 2026 {company.parentName}. {company.brandName} - {company.category}.
      </div>
    </footer>
  );
}
