import { MapPin, PhoneCall } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container-shell section-shell grid grid-cols-1 gap-10 md:grid-cols-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-orange-400">
            ERP Group Company
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            ERP Group Company – Rich Man Maker
          </h2>
          <p className="mt-4 max-w-xl text-sm text-slate-300 leading-relaxed">
            ERP Group Company helps buyers, sellers, landlords, and investors discover
            quality opportunities across Chennai&apos;s fast-moving property corridors.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">Quick Links</h3>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <Link to="/">Home</Link>
            <Link to="/properties">Properties</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            <p className="inline-flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />
              7299007799 / 8939427799
            </p>
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Chennai, Tamil Nadu, India
            </p>
            <a href="https://eprcompanygroup.in" className="font-semibold text-white">
              eprcompanygroup.in
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 md:col-span-3">
          <p className="text-sm text-slate-400">© ERP Group Company</p>
        </div>
      </div>
    </footer>
  );
}
