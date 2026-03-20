"use client";

import { PhoneCall, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0B5D3B]/85 backdrop-blur">
      <div className="container-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 text-white">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm font-semibold">
            EPR
          </span>
          <span className="hidden text-sm font-semibold sm:block">EPR GROUP COMPANY</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/80 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Admin Login
          </Link>
          <a href="tel:+918939427799" className="btn-gold">
            <PhoneCall className="h-4 w-4" />
            Call Now
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/30 p-2 text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-[#0B5D3B]/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-white/80">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Admin Login
            </Link>
            <a href="tel:+918939427799" className="btn-gold">
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
