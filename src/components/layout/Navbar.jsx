import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import LoginModal, { getEmptyAuthState } from "../auth/LoginModal";
import { useIsMobile } from "../../hooks/use-mobile";
import { useAuth } from "../../lib/AuthContext";

function navLinkClass({ isActive }) {
  return `text-sm font-medium ${
    isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
  }`;
}

export default function Navbar() {
  const { user, login, register, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);
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
      navigate(authenticatedUser.role === "admin" ? "/admin" : "/properties");
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="ERP Group Company"
              className="h-10 w-auto"
            />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900 md:text-lg">
                ERP Group Company
              </p>
              <p className="text-xs text-gray-500">Richman Maker</p>
            </div>
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 text-gray-700 md:flex">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-5 md:flex">
              <span className="text-sm font-medium text-gray-700">7299007799</span>
              {user ? (
                <>
                  <span className="text-sm text-gray-700">{user.name}</span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-sm font-medium text-gray-700 hover:text-orange-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="text-sm font-medium text-gray-700 hover:text-orange-500"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              className="rounded-lg border border-gray-200 p-2 text-gray-700 md:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {menuOpen && isMobile ? (
          <div className="mx-auto max-w-7xl border-t border-gray-200 px-6 pb-6 pt-4 md:hidden">
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

            <div className="mt-6 flex flex-col gap-3 text-sm text-gray-700">
              <span className="font-medium">7299007799</span>
              {user ? (
                <>
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left font-medium text-gray-700 hover:text-orange-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => openAuthModal("login")}
                    className="text-left font-medium text-gray-700 hover:text-orange-500"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal("register")}
                    className="w-full rounded-lg bg-orange-500 px-4 py-2 font-medium text-white"
                  >
                    Signup
                  </button>
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
