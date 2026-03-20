import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 bg-[#0a1b35] text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-xl font-semibold">ERP Group Company</h3>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.28em] text-orange-300">
            Richman Maker
          </p>
          <p className="text-sm text-gray-300">
            ERP Group Company helps buyers, sellers and investors discover property
            opportunities across Chennai.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/properties">Properties</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <p>Phone: 7299007799 / 8939427799</p>
          <p>Location: Chennai, Tamil Nadu</p>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        (c) 2026 ERP Group Company. All rights reserved.
      </div>
    </footer>
  );
}
