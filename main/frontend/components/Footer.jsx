import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-[#0B5D3B]/85 text-white">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">EPR GROUP COMPANY</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/70">
            Richman Maker
          </p>
          <p className="mt-4 text-sm text-white/70">
            Premium real estate solutions with verified listings, expert guidance, and
            investment-focused strategy.
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
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <p className="text-sm text-white/70">Phone: +91 89394 27799</p>
          <p className="text-sm text-white/70">WhatsApp: +91 89394 27799</p>
          <div className="mt-4 flex gap-3 text-sm text-white/70">
            <span>LinkedIn</span>
            <span>Instagram</span>
            <span>Facebook</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        (c) 2026 EPR GROUP COMPANY. All rights reserved.
      </div>
    </footer>
  );
}
