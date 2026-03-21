"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  LogOut,
  PenSquare,
  PhoneCall,
  PlusCircle,
  ShieldCheck,
  Star,
  Tags,
  Trash2
} from "lucide-react";
import { company } from "../../lib/content";
import {
  getEmptyPropertyForm,
  getStoredProperties,
  makePropertyPayload,
  propertyToForm,
  resetStoredProperties,
  saveStoredProperties
} from "../../lib/propertyStore";

const typeOptions = [
  "Land",
  "DTCP Plot",
  "Investment Plot",
  "Premium Plot",
  "Flat",
  "House for Rent",
  "Commercial Land"
];

const listingModeOptions = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" }
];

const budgetOptions = [
  { value: "below-50", label: "Below Rs 50 Lakh" },
  { value: "50-100", label: "Rs 50 Lakh - Rs 1 Cr" },
  { value: "above-100", label: "Above Rs 1 Cr" },
  { value: "rental", label: "Rental Deal" }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [ready, setReady] = useState(false);
  const [properties, setProperties] = useState([]);
  const [formState, setFormState] = useState(getEmptyPropertyForm());
  const [editingId, setEditingId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("erp-admin-auth");

    if (!stored) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setAdmin(parsed);
      setProperties(getStoredProperties());
      setReady(true);
    } catch {
      window.localStorage.removeItem("erp-admin-auth");
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    const syncProperties = () => {
      setProperties(getStoredProperties());
    };

    window.addEventListener("erp-properties-updated", syncProperties);
    return () => window.removeEventListener("erp-properties-updated", syncProperties);
  }, []);

  const stats = useMemo(() => {
    const saleCount = properties.filter((property) => property.listingMode === "sale").length;
    const rentCount = properties.filter((property) => property.listingMode === "rent").length;
    const featuredCount = properties.filter((property) => property.featured).length;

    return {
      total: properties.length,
      saleCount,
      rentCount,
      featuredCount
    };
  }, [properties]);

  const handleLogout = () => {
    window.localStorage.removeItem("erp-admin-auth");
    router.push("/login");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const startCreate = () => {
    setEditingId("");
    setFormState(getEmptyPropertyForm());
    setStatusMessage("");
  };

  const startEdit = (property) => {
    setEditingId(property.id);
    setFormState(propertyToForm(property));
    setStatusMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = makePropertyPayload(formState);
    const nextItems = editingId
      ? properties.map((property) => (property.id === editingId ? payload : property))
      : [payload, ...properties];

    saveStoredProperties(nextItems);
    setProperties(nextItems);
    setEditingId("");
    setFormState(getEmptyPropertyForm());
    setStatusMessage(editingId ? "Property updated successfully." : "Property added successfully.");
  };

  const handleDelete = (id) => {
    const nextItems = properties.filter((property) => property.id !== id);
    saveStoredProperties(nextItems);
    setProperties(nextItems);

    if (editingId === id) {
      setEditingId("");
      setFormState(getEmptyPropertyForm());
    }

    setStatusMessage("Property removed successfully.");
  };

  const handleResetAll = () => {
    resetStoredProperties();
    setProperties(getStoredProperties());
    setEditingId("");
    setFormState(getEmptyPropertyForm());
    setStatusMessage("Listings reset to the default site data.");
  };

  if (!ready) {
    return (
      <section className="container-shell section-shell">
        <div className="card-white p-8 text-center">
          <p className="text-lg font-semibold text-[#1E3A5F]">Loading admin dashboard...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell section-shell">
      <div className="space-y-8">
        <div className="overflow-hidden rounded-[32px] bg-[#1E3A5F] p-8 text-white shadow-[0_24px_70px_rgba(30,58,95,0.18)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A24A]">Admin Dashboard</p>
              <h1
                className="mt-3 text-4xl font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {company.parentName}
              </h1>
              <p className="mt-2 text-lg font-semibold text-[#C9A24A]">
                {company.brandName} - {company.category}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/80">
                Logged in as {admin?.admin?.email || admin?.email || "Admin"}.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/properties" className="btn-gold">
                View Live Properties
              </Link>
              <button type="button" onClick={handleLogout} className="btn-outline border-white/20 bg-white/10 text-white">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Total Listings", value: stats.total, icon: Building2 },
            { title: "For Sale", value: stats.saleCount, icon: Tags },
            { title: "For Rent", value: stats.rentCount, icon: PhoneCall },
            { title: "Featured Deals", value: stats.featuredCount, icon: Star }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="card-white p-6 hover-lift">
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-[#C9A24A]/12 p-3">
                    <Icon className="h-5 w-5 text-[#1E3A5F]" />
                  </div>
                  <p className="text-3xl font-semibold text-[#1E3A5F]">{item.value}</p>
                </div>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#6B7280]">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="card-white p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#2E7D32]/12 p-3">
                <ShieldCheck className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#1E3A5F]">
                  {editingId ? "Edit Property" : "Add New Property"}
                </h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Create, update, and feature listings directly from this dashboard.
                </p>
              </div>
            </div>

            {statusMessage ? (
              <div className="mt-6 rounded-2xl border border-[#2E7D32]/20 bg-[#2E7D32]/8 px-4 py-3 text-sm text-[#2E7D32]">
                {statusMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input className="form-input" name="title" placeholder="Property title" value={formState.title} onChange={handleChange} required />
                <input className="form-input" name="location" placeholder="Location" value={formState.location} onChange={handleChange} required />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <select className="form-input" name="type" value={formState.type} onChange={handleChange}>
                  {typeOptions.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <select className="form-input" name="listingMode" value={formState.listingMode} onChange={handleChange}>
                  {listingModeOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
                <select className="form-input" name="budgetBucket" value={formState.budgetBucket} onChange={handleChange}>
                  {budgetOptions.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input className="form-input" name="price" placeholder="Price" value={formState.price} onChange={handleChange} required />
                <input className="form-input" name="sizeLabel" placeholder="Size label" value={formState.sizeLabel} onChange={handleChange} required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input className="form-input" name="sqft" placeholder="Sq.ft" value={formState.sqft} onChange={handleChange} required />
                <input className="form-input" name="facing" placeholder="Facing / format" value={formState.facing} onChange={handleChange} required />
              </div>

              <input className="form-input" name="useCase" placeholder="Best use / category" value={formState.useCase} onChange={handleChange} required />
              <input className="form-input" name="dealLabel" placeholder="Deal label (example: Lowest price deal)" value={formState.dealLabel} onChange={handleChange} />

              <label className="flex items-center gap-3 rounded-2xl border border-[#D7DFEA] bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-[#1E3A5F]">
                <input type="checkbox" name="featured" checked={formState.featured} onChange={handleChange} />
                Show this listing in featured sections
              </label>

              <textarea className="form-input min-h-[110px]" name="benefits" placeholder="Benefits - one per line" value={formState.benefits} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="investmentPotential" placeholder="Investment potential" value={formState.investmentPotential} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="overview" placeholder="Overview" value={formState.overview} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="keyFeatures" placeholder="Key features - one per line" value={formState.keyFeatures} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="amenities" placeholder="Amenities - one per line" value={formState.amenities} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="locationAdvantages" placeholder="Location advantages - one per line" value={formState.locationAdvantages} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="legalDetails" placeholder="Legal details" value={formState.legalDetails} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="pricingBreakdown" placeholder="Pricing breakdown - one per line" value={formState.pricingBreakdown} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="images" placeholder="Image URLs - one per line" value={formState.images} onChange={handleChange} required />

              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" className="btn-gold">
                  <PlusCircle className="h-4 w-4" />
                  {editingId ? "Update Property" : "Add Property"}
                </button>
                <button type="button" onClick={startCreate} className="btn-outline">
                  Clear Form
                </button>
                <button type="button" onClick={handleResetAll} className="btn-outline">
                  Reset to Default Listings
                </button>
              </div>
            </form>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Manage Listings</h2>
            <p className="mt-2 text-sm leading-7 text-[#6B7280]">
              Edit any property, remove outdated inventory, or add new listings that appear on the public properties page in this browser.
            </p>

            <div className="mt-6 space-y-4">
              {properties.map((property) => (
                <div key={property.id} className="rounded-[24px] border border-[#E5EAF1] bg-[#F5F7FA] p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3A5F]">
                          {property.listingMode === "rent" ? "For Rent" : "For Sale"}
                        </span>
                        {property.featured ? (
                          <span className="rounded-full bg-[#C9A24A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A24A]">
                            Featured
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold text-[#1E3A5F]">{property.title}</h3>
                      <p className="mt-1 text-sm text-[#2E7D32]">{property.location}</p>
                      <p className="mt-2 text-sm font-semibold text-[#C9A24A]">{property.price}</p>
                      <p className="mt-2 text-sm text-[#6B7280]">{property.sizeLabel}</p>
                    </div>

                    <div className="flex gap-2">
                      <button type="button" onClick={() => startEdit(property)} className="link-pill inline-flex items-center gap-2">
                        <PenSquare className="h-4 w-4" />
                        Edit
                      </button>
                      <button type="button" onClick={() => handleDelete(property.id)} className="link-pill inline-flex items-center gap-2 text-red-600 hover:border-red-300 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
