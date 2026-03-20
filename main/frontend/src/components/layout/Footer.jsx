export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0b5d3b]/70 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">EPR GROUP COMPANY</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.3em] text-white/70">
            Richman Maker
          </p>
          <p className="mt-4 text-sm text-white/70">
            Premium business solutions for real estate marketing, digital growth,
            and lead generation systems.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-white">
                Properties
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-white">
                Services
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold">Contact</h4>
          <p className="text-sm text-white/70">Phone: 7299007799</p>
          <p className="text-sm text-white/70">WhatsApp: 7299007799</p>
          <p className="text-sm text-white/70">Location: Chennai, Tamil Nadu</p>
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
