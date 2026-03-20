import clsx from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatCurrency(value, rentalSuffix = "") {
  if (!Number.isFinite(Number(value))) {
    return value ?? "";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(Number(value)) + rentalSuffix;
}

export function formatNumber(value) {
  return new Intl.NumberFormat("en-IN").format(Number(value) || 0);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/917299007799?text=${encodeURIComponent(message)}`;
}
