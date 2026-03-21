import Link from "next/link";
import { company } from "../lib/content";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0B5D3B]/85 text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">Richman Maker</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-[#D4AF37]">
            Trusted Land Promoter in Chennai
          </p>
          <p className="mt-4 text-sm text-white/70">
            Premium real estate guidance for plots in Tambaram, Guduvanchery, Vandalur,
            and Chengalpattu with documentation clarity and investment-first support.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/properties">Properties</Link>
            </li>
            <li>
              <Link href="/locations">Locations</Link>
            </li>
            <li>
              <Link href="/testimonials">Testimonials</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
            <li>
              <Link href="/login">Admin Login</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <p className="text-sm text-white/70">Phone: {company.phone}</p>
          <a href={company.whatsappHref} className="text-sm text-white/70">
            WhatsApp: {company.phone}
          </a>
          <p className="mt-2 text-sm text-white/70">{company.address}</p>
          <div className="mt-4 flex gap-3 text-sm text-white/70">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        (c) 2026 Richman Maker. All rights reserved.
      </div>
    </footer>
  );
}
