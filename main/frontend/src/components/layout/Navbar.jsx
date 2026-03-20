import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks/use-mobile";
import { useAuth } from "../../lib/AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { href: "/#home", label: "Home" },
    { href: "/#featured", label: "Properties" },
    { href: "/#about", label: "About" },
    { href: "/#services", label: "Services" },
    { href: "/#contact", label: "Contact" }
  ];

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0b5d3b]/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/#home" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-sm font-semibold">
            EPR
          </div>
          <div className="flex flex-col leading-tight">
            <p className="text-sm font-semibold text-white md:text-lg">
              EPR GROUP COMPANY
            </p>
            <p className="text-xs text-white/70">Richman Maker</p>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-8 text-white/80 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm font-medium hover:text-white">
              {item.label}
            </a>
          ))}
          {isAdmin ? (
            <Link to="/admin" className="text-sm font-medium text-white/90 hover:text-white">
              Admin Dashboard
            </Link>
          ) : null}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <span className="text-sm font-medium text-white/80">7299007799</span>
          {isAdmin ? (
            <>
              <span className="text-sm text-white/70">{user?.email}</span>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm font-medium text-white/80 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Admin Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          className="rounded-lg border border-white/30 p-2 text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {menuOpen && isMobile ? (
          <div className="absolute left-0 top-16 w-full border-t border-white/10 bg-[#0b5d3b]/95 px-6 pb-6 pt-4 shadow-xl md:hidden">
            <nav className="flex flex-col gap-4 text-white/80">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              {isAdmin ? (
                <Link
                  to="/admin"
                  className="text-sm font-medium text-white/90 hover:text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              ) : null}
            </nav>

            <div className="mt-6 flex flex-col gap-3 text-sm text-white/80">
              <span className="font-medium">7299007799</span>
              {isAdmin ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-left font-medium text-white/90 hover:text-white"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="w-full rounded-full border border-white/40 px-4 py-2 text-center font-medium text-white"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Login
                </Link>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
