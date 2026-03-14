import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  ADMIN_EMAIL,
  authenticateUser,
  clearSession,
  createUser,
  getSessionUser,
  updateUserRecord
} from "../data/storage";

const AuthContext = createContext(null);

function resolveRole(email) {
  return email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
}

function withRole(user) {
  if (!user) {
    return null;
  }

  return {
    ...user,
    role: resolveRole(user.email)
  };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sessionUser = withRole(getSessionUser());
    if (sessionUser) {
      updateUserRecord(sessionUser.id, {
        role: sessionUser.role
      });
    }
    setUser(sessionUser);
    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isReady,
      role: user?.role ?? null,
      isAdmin: user?.role === "admin",
      async login(credentials) {
        const nextUser = withRole(
          authenticateUser(credentials.email, credentials.password)
        );
        updateUserRecord(nextUser.id, {
          role: nextUser.role
        });
        setUser(nextUser);
        return nextUser;
      },
      async register(payload) {
        const nextUser = withRole(createUser(payload));
        updateUserRecord(nextUser.id, {
          role: nextUser.role
        });
        setUser(nextUser);
        return nextUser;
      },
      logout() {
        clearSession();
        setUser(null);
      },
      toggleFavorite(propertyId) {
        if (!user) {
          throw new Error("Please login to save favorite properties.");
        }

        const favorites = user.favorites || [];
        const nextFavorites = favorites.includes(propertyId)
          ? favorites.filter((id) => id !== propertyId)
          : [...favorites, propertyId];
        const nextUser = withRole(updateUserRecord(user.id, {
          favorites: nextFavorites
        }));
        setUser(nextUser);
        return nextUser;
      },
      refreshUser() {
        setUser(withRole(getSessionUser()));
      }
    }),
    [isReady, user]
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
