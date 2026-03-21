"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { company } from "../lib/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-[#E5EAF1] bg-white/92 backdrop-blur ${
        scrolled ? "shadow-[0_12px_36px_rgba(30,58,95,0.08)]" : ""
      }`}
    >
      <div
        className={`container-shell flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-16" : "h-[70px]"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 text-[#1E3A5F]">
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1E3A5F]">
              {company.parentName}
            </p>
            <p className="text-xs font-semibold tracking-[0.22em] text-[#C9A24A]">
              {company.brandName}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#1E3A5F]/80 md:flex">
          {navLinks.map((item) => (
            <Link key={item.href} href={item.href} className="font-medium hover:text-[#C9A24A]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a href={company.phoneHref} className="text-sm font-semibold text-[#1E3A5F] hover:text-[#C9A24A]">
            {company.phoneDisplay}
          </a>
          <Link
            href="/login"
            className="rounded-full border border-[#1E3A5F]/20 px-4 py-2 text-sm font-semibold text-[#1E3A5F] hover:border-[#C9A24A] hover:text-[#C9A24A]"
          >
            Login
          </Link>
          <Link href="/signup" className="btn-orange">
            Signup
          </Link>
        </div>

        <button
          type="button"
          className="rounded-xl border border-[#1E3A5F]/15 p-2 text-[#1E3A5F] md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#E5EAF1] bg-white px-6 py-4 shadow-[0_20px_40px_rgba(30,58,95,0.08)] md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-[#1E3A5F]/85">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium hover:text-[#C9A24A]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              className="rounded-full border border-[#1E3A5F]/20 px-4 py-2 text-sm font-semibold text-[#1E3A5F] hover:border-[#C9A24A] hover:text-[#C9A24A]"
            >
              Login
            </Link>
            <a href={company.phoneHref} className="text-sm font-semibold text-[#1E3A5F]">
              {company.phoneDisplay}
            </a>
            <Link href="/signup" className="btn-orange">
              Signup
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
