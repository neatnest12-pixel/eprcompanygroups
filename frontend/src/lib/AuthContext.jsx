import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loginAdmin } from "../api";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "erp-admin-auth";

function readStoredSession() {
  try {
    const rawValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch (error) {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setSession(readStoredSession());
    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user || null,
      token: session?.token || "",
      isReady,
      role: session?.user?.role || null,
      isAdmin: session?.user?.role === "admin",
      async login(credentials) {
        const nextSession = await loginAdmin(credentials);
        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
        return nextSession.user;
      },
      toggleFavorite(propertyId) {
        if (!session?.user) {
          throw new Error("Please login to save favorite properties.");
        }

        const favorites = Array.isArray(session.user.favorites)
          ? session.user.favorites
          : [];
        const nextFavorites = favorites.includes(propertyId)
          ? favorites.filter((id) => id !== propertyId)
          : [...favorites, propertyId];
        const nextSession = {
          ...session,
          user: {
            ...session.user,
            favorites: nextFavorites
          }
        };

        window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
        setSession(nextSession);
        return nextSession.user;
      },
      logout() {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        setSession(null);
      }
    }),
    [isReady, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
