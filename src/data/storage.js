import { normalizeEnquiry } from "../../entities/Enquiry";
import { normalizeProperty } from "../../entities/Property";
import { PROPERTY_CATEGORIES, seedProperties, seedUsers } from "./seed";

const STORAGE_KEYS = {
  properties: "epr-properties",
  enquiries: "epr-enquiries",
  users: "epr-users",
  session: "epr-session",
  alerts: "epr-alerts",
  compare: "epr-compare",
  recentlyViewed: "epr-recently-viewed"
};

export const ADMIN_EMAIL = "eprcompanygroups@gmail.com";

function resolveRole(email) {
  return email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
}

function normalizeStoredUser(user) {
  return {
    ...user,
    role: resolveRole(user?.email),
    favorites: Array.isArray(user?.favorites) ? user.favorites : []
  };
}

function readJson(key, fallback) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeJson(key, value) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

export function seedDatabase() {
  const hasProperties = readJson(STORAGE_KEYS.properties, null);
  const hasUsers = readJson(STORAGE_KEYS.users, null);
  const hasEnquiries = readJson(STORAGE_KEYS.enquiries, null);
  const hasAlerts = readJson(STORAGE_KEYS.alerts, null);
  const hasCompare = readJson(STORAGE_KEYS.compare, null);
  const hasRecentlyViewed = readJson(STORAGE_KEYS.recentlyViewed, null);

  if (!hasProperties) {
    writeJson(STORAGE_KEYS.properties, seedProperties.map(normalizeProperty));
  } else {
    const existingProperties = hasProperties.map(normalizeProperty);
    const mergedProperties = [
      ...seedProperties.map(normalizeProperty),
      ...existingProperties.filter(
        (existingProperty) =>
          !seedProperties.some((seedProperty) => seedProperty.id === existingProperty.id)
      )
    ];
    writeJson(STORAGE_KEYS.properties, mergedProperties);
  }

  if (!hasUsers) {
    writeJson(STORAGE_KEYS.users, seedUsers);
  }

  if (!hasEnquiries) {
    writeJson(STORAGE_KEYS.enquiries, []);
  }

  if (!hasAlerts) {
    writeJson(STORAGE_KEYS.alerts, []);
  }

  if (!hasCompare) {
    writeJson(STORAGE_KEYS.compare, []);
  }

  if (!hasRecentlyViewed) {
    writeJson(STORAGE_KEYS.recentlyViewed, []);
  }
}

function generateId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getPropertiesFromStore() {
  seedDatabase();
  return readJson(STORAGE_KEYS.properties, []).map(normalizeProperty);
}

export function getPropertyFromStore(id) {
  return getPropertiesFromStore().find((item) => item.id === id) ?? null;
}

export function saveProperty(property) {
  const properties = getPropertiesFromStore();
  const normalized = normalizeProperty({
    ...property,
    id: property.id || generateId("property"),
    createdAt: property.createdAt || new Date().toISOString()
  });

  const next = property.id
    ? properties.map((item) => (item.id === property.id ? normalized : item))
    : [normalized, ...properties];

  writeJson(STORAGE_KEYS.properties, next);
  return normalized;
}

export function removeProperty(id) {
  const properties = getPropertiesFromStore().filter((item) => item.id !== id);
  writeJson(STORAGE_KEYS.properties, properties);

  const enquiries = getEnquiriesFromStore().filter((item) => item.propertyId !== id);
  writeJson(STORAGE_KEYS.enquiries, enquiries);

  const users = getUsersFromStore().map((user) => ({
    ...user,
    favorites: (user.favorites || []).filter((favoriteId) => favoriteId !== id)
  }));
  writeJson(STORAGE_KEYS.users, users);
}

export function getEnquiriesFromStore() {
  seedDatabase();
  return readJson(STORAGE_KEYS.enquiries, []).map(normalizeEnquiry);
}

export function saveEnquiry(enquiry) {
  const enquiries = getEnquiriesFromStore();
  const normalized = normalizeEnquiry({
    ...enquiry,
    id: enquiry.id || generateId("enquiry"),
    status: enquiry.status || "new",
    date: enquiry.date || new Date().toISOString()
  });

  writeJson(STORAGE_KEYS.enquiries, [normalized, ...enquiries]);
  return normalized;
}

export function updateEnquiryInStore(id, payload) {
  const enquiries = getEnquiriesFromStore();
  const nextEnquiries = enquiries.map((enquiry) =>
    enquiry.id === id ? normalizeEnquiry({ ...enquiry, ...payload }) : normalizeEnquiry(enquiry)
  );
  writeJson(STORAGE_KEYS.enquiries, nextEnquiries);
  return nextEnquiries.find((enquiry) => enquiry.id === id) ?? null;
}

export function deleteEnquiryFromStore(id) {
  const enquiries = getEnquiriesFromStore().filter((enquiry) => enquiry.id !== id);
  writeJson(STORAGE_KEYS.enquiries, enquiries);
}

export function getUsersFromStore() {
  seedDatabase();
  const users = readJson(STORAGE_KEYS.users, []).map(normalizeStoredUser);
  writeJson(STORAGE_KEYS.users, users);
  return users;
}

export function createUser(user) {
  const users = getUsersFromStore();
  const existing = users.find(
    (item) => item.email.toLowerCase() === user.email.toLowerCase()
  );

  if (existing) {
    throw new Error("An account with this email already exists.");
  }

  const newUser = {
    id: generateId("user"),
    name: user.name,
    email: user.email,
    phone: user.phone,
    password: user.password,
    role: resolveRole(user.email),
    favorites: [],
    createdAt: new Date().toISOString()
  };

  writeJson(STORAGE_KEYS.users, [newUser, ...users]);
  writeJson(STORAGE_KEYS.session, {
    id: newUser.id
  });
  return newUser;
}

export function authenticateUser(email, password) {
  const users = getUsersFromStore();
  const user = users.find(
    (item) =>
      item.email.toLowerCase() === email.toLowerCase() && item.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  writeJson(STORAGE_KEYS.session, {
    id: user.id
  });
  return normalizeStoredUser(user);
}

export function getSessionUser() {
  const session = readJson(STORAGE_KEYS.session, null);
  if (!session?.id) {
    return null;
  }

  return getUsersFromStore().find((user) => user.id === session.id) ?? null;
}

export function clearSession() {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(STORAGE_KEYS.session);
  }
}

export function updateUserRecord(id, payload) {
  const users = getUsersFromStore();
  const nextUsers = users.map((user) =>
    user.id === id ? normalizeStoredUser({ ...user, ...payload }) : normalizeStoredUser(user)
  );
  writeJson(STORAGE_KEYS.users, nextUsers);
  return nextUsers.find((user) => user.id === id) ?? null;
}

export function deleteUserRecord(id) {
  const user = getUsersFromStore().find((item) => item.id === id);
  if (resolveRole(user?.email) === "admin") {
    throw new Error("The default admin user cannot be deleted.");
  }

  const nextUsers = getUsersFromStore().filter((item) => item.id !== id);
  writeJson(STORAGE_KEYS.users, nextUsers);

  const session = readJson(STORAGE_KEYS.session, null);
  if (session?.id === id) {
    clearSession();
  }
}

export function getCategoryOptions() {
  return PROPERTY_CATEGORIES;
}

export function getAlertsFromStore() {
  seedDatabase();
  return readJson(STORAGE_KEYS.alerts, []);
}

export function saveAlert(alert) {
  const alerts = getAlertsFromStore();
  const nextAlert = {
    id: generateId("alert"),
    ...alert,
    createdAt: new Date().toISOString()
  };
  writeJson(STORAGE_KEYS.alerts, [nextAlert, ...alerts]);
  return nextAlert;
}

export function deleteAlertFromStore(id) {
  const alerts = getAlertsFromStore().filter((alert) => alert.id !== id);
  writeJson(STORAGE_KEYS.alerts, alerts);
}

export function getCompareIdsFromStore() {
  seedDatabase();
  return readJson(STORAGE_KEYS.compare, []);
}

export function toggleCompareIdInStore(propertyId) {
  const current = getCompareIdsFromStore();
  const next = current.includes(propertyId)
    ? current.filter((id) => id !== propertyId)
    : [...current, propertyId].slice(-4);
  writeJson(STORAGE_KEYS.compare, next);
  return next;
}

export function clearCompareIdsInStore() {
  writeJson(STORAGE_KEYS.compare, []);
}

export function getRecentlyViewedIdsFromStore() {
  seedDatabase();
  return readJson(STORAGE_KEYS.recentlyViewed, []);
}

export function pushRecentlyViewedId(propertyId) {
  const current = getRecentlyViewedIdsFromStore().filter((id) => id !== propertyId);
  const next = [propertyId, ...current].slice(0, 5);
  writeJson(STORAGE_KEYS.recentlyViewed, next);
  return next;
}
