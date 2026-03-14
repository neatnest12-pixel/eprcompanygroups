import {
  ChevronDown,
  Heart,
  LogOut,
  Menu,
  PhoneCall,
  Shield,
  User,
  X
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginModal, { getEmptyAuthState } from "../auth/LoginModal";
import { useIsMobile } from "../../hooks/use-mobile";
import { useAuth } from "../../lib/AuthContext";
import Button from "../ui/Button";

function navLinkClass({ isActive }) {
  return `relative inline-flex h-16 items-center text-sm font-semibold transition-colors after:absolute after:bottom-4 after:left-0 after:h-0.5 after:w-full after:origin-left after:rounded-full after:bg-orange-500 after:transition-transform after:duration-300 ${
    isActive
      ? "text-slate-900 after:scale-x-100"
      : "text-slate-600 after:scale-x-0 hover:text-slate-900 hover:after:scale-x-100"
  }`;
}

export default function Navbar() {
  const { user, login, register, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [formState, setFormState] = useState(getEmptyAuthState());
  const [error, setError] = useState("");

  const navItems = user
    ? [
        { to: "/", label: "Home" },
        { to: "/properties", label: "Properties" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" },
        { to: "/favorites", label: "Favorites" },
        ...(user.role === "admin"
          ? [{ to: "/admin", label: "Admin Dashboard" }]
          : [])
      ]
    : [
        { to: "/", label: "Home" },
        { to: "/properties", label: "Properties" },
        { to: "/about", label: "About" },
        { to: "/contact", label: "Contact" }
      ];

  const openAuthModal = (nextMode) => {
    setMode(nextMode);
    setError("");
    setFormState(getEmptyAuthState());
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const authenticatedUser =
        mode === "login"
          ? await login({
              email: formState.email,
              password: formState.password
            })
          : await register(formState);

      setModalOpen(false);
      setMenuOpen(false);
      setProfileOpen(false);
      navigate(authenticatedUser.role === "admin" ? "/admin" : "/properties");
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const handleLogout = () => {
    setProfileOpen(false);
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/src/assets/logo.png"
              alt="ERP Group Company"
              className="h-8 w-auto object-contain sm:h-10"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-semibold text-slate-900">
                ERP Group Company
              </span>
              <span className="text-xs tracking-widest text-gray-500">
                RICH MAN MAKER
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <nav className="flex items-center gap-6">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <a
              href="tel:7299007799"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <PhoneCall className="h-4 w-4" />
              7299007799
            </a>

            {user ? (
              <>
                <Link
                  to="/favorites"
                  className="rounded-lg border border-slate-200 p-2.5 text-slate-600 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50 hover:text-slate-900"
                  aria-label="Favorites"
                >
                  <Heart className="h-4 w-4" />
                </Link>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setProfileOpen((current) => !current)}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-gray-50"
                  >
                    {user.role === "admin" ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    {user.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {profileOpen ? (
                    <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                      <div className="rounded-lg bg-slate-50 px-4 py-3">
                        <p className="text-sm font-semibold text-slate-900">Profile</p>
                        <p className="mt-1 text-xs text-gray-500">{user.email}</p>
                      </div>
                      <div className="mt-3 flex flex-col gap-2">
                        {user.role === "admin" ? (
                          <Link
                            to="/admin"
                            onClick={() => setProfileOpen(false)}
                            className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-gray-50"
                          >
                            Admin Dashboard
                          </Link>
                        ) : null}
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="inline-flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-gray-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" onClick={() => openAuthModal("login")}>
                  Login
                </Button>
                <Button onClick={() => openAuthModal("register")}>Signup</Button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="justify-self-end rounded-lg border border-slate-200 p-2.5 text-slate-900 md:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen && isMobile ? (
          <div className="container-shell border-t border-slate-200 pb-6 pt-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navLinkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="tel:8939427799"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
              >
                <PhoneCall className="h-4 w-4" />
                8939427799
              </a>
              {user ? (
                <>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900">
                    {user.role === "admin" ? (
                      <Shield className="h-4 w-4" />
                    ) : (
                      <User className="h-4 w-4" />
                    )}
                    {user.name}
                  </p>
                  {user.role === "admin" ? (
                    <NavLink
                      to="/admin"
                      className="text-sm font-semibold text-slate-600 transition hover:text-slate-900"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Dashboard
                    </NavLink>
                  ) : null}
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" onClick={() => openAuthModal("login")}>
                    Login
                  </Button>
                  <Button onClick={() => openAuthModal("register")}>Signup</Button>
                </>
              )}
            </div>
          </div>
        ) : null}
      </header>

      <LoginModal
        open={modalOpen}
        mode={mode}
        onModeChange={setMode}
        formState={formState}
        setFormState={setFormState}
        onSubmit={handleSubmit}
        onClose={() => setModalOpen(false)}
        error={error}
      />
    </>
  );
}
