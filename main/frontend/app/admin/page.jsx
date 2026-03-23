"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  ClipboardList,
  LogOut,
  PenSquare,
  PhoneCall,
  PlusCircle,
  ShieldCheck,
  Star,
  Tags,
  Trash2,
  Upload
} from "lucide-react";
import { company } from "../../lib/content";
import { getEmptyPropertyForm } from "../../lib/propertyStore";
import {
  approveSubmission,
  createProperty,
  deleteProperty,
  listEnquiries,
  listProperties,
  listSubmissions,
  removeEnquiry,
  updateEnquiryStatus,
  updateProperty
} from "../../lib/api";
import { mapApiProperty, toApiPayload, toFormState } from "../../lib/propertyAdapter";

const typeOptions = [
  "Land",
  "DTCP Plot",
  "Investment Plot",
  "Premium Plot",
  "Flat",
  "House",
  "Commercial Land"
];

const listingModeOptions = [
  { value: "sale", label: "For Sale" },
  { value: "rent", label: "For Rent" }
];

export default function AdminDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const [properties, setProperties] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [formState, setFormState] = useState(getEmptyPropertyForm());
  const [editingId, setEditingId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem("erp-admin-auth");
    if (!stored) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setSession(parsed);
      setReady(true);
    } catch {
      window.localStorage.removeItem("erp-admin-auth");
      router.replace("/login");
    }
  }, [router]);

  useEffect(() => {
    if (!ready || !session?.token) {
      return;
    }

    let active = true;

    const loadAll = async () => {
      try {
        const [propertyItems, enquiryItems, submissionItems] = await Promise.all([
          listProperties(),
          listEnquiries(session.token),
          listSubmissions(session.token)
        ]);

        if (!active) return;
        setProperties(propertyItems);
        setEnquiries(enquiryItems);
        setSubmissions(submissionItems);
        setErrorMessage("");
      } catch (error) {
        if (!active) return;
        setErrorMessage(error?.message || "Unable to load dashboard data.");
      }
    };

    loadAll();
    return () => {
      active = false;
    };
  }, [ready, session]);

  const isAdmin = session?.user?.role === "admin";

  const stats = useMemo(() => {
    const saleCount = properties.filter((property) => property.transactionType === "sale").length;
    const rentCount = properties.filter((property) => property.transactionType === "rent").length;
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
    const { name, value, type, checked, files } = event.target;
    if (type === "file") {
      setFormState((prev) => ({
        ...prev,
        imageFiles: Array.from(files || [])
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const resetForm = () => {
    setEditingId("");
    setFormState(getEmptyPropertyForm());
  };

  const startEdit = (property) => {
    setEditingId(property.id);
    setFormState(toFormState(property));
    setStatusMessage("");
    setErrorMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const reloadDashboard = async () => {
    if (!session?.token) return;
    const [propertyItems, enquiryItems, submissionItems] = await Promise.all([
      listProperties(),
      listEnquiries(session.token),
      listSubmissions(session.token)
    ]);
    setProperties(propertyItems);
    setEnquiries(enquiryItems);
    setSubmissions(submissionItems);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!session?.token) return;

    try {
      const payload = toApiPayload(formState);
      if (editingId) {
        await updateProperty(editingId, payload, session.token);
        setStatusMessage("Property updated successfully.");
      } else {
        await createProperty(payload, session.token);
        setStatusMessage("Property added successfully.");
      }
      await reloadDashboard();
      resetForm();
      setErrorMessage("");
    } catch (error) {
      setStatusMessage("");
      setErrorMessage(error?.message || "Unable to save property.");
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin || !session?.token) return;

    try {
      await deleteProperty(id, session.token);
      await reloadDashboard();
      setStatusMessage("Property removed successfully.");
      setErrorMessage("");
    } catch (error) {
      setStatusMessage("");
      setErrorMessage(error?.message || "Unable to delete property.");
    }
  };

  const handleEnquiryStatus = async (id, status) => {
    if (!session?.token) return;
    try {
      await updateEnquiryStatus(id, status, session.token);
      await reloadDashboard();
      setStatusMessage(`Enquiry marked as ${status}.`);
    } catch (error) {
      setErrorMessage(error?.message || "Unable to update enquiry.");
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!session?.token) return;
    try {
      await removeEnquiry(id, session.token);
      await reloadDashboard();
      setStatusMessage("Enquiry removed successfully.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to delete enquiry.");
    }
  };

  const handleApproveSubmission = async (submission) => {
    if (!session?.token) return;

    try {
      await approveSubmission(
        submission.id,
        {
          title: `Owner Property - ${submission.location || submission.name}`,
          location: submission.location || "Chennai",
          description: submission.propertyDetails,
          videoUrl: submission.videoUrl,
          category: "Owner Listing",
          propertyType: "Owner Listing",
          size: "Size on request",
          transactionType: "sale"
        },
        session.token
      );
      await reloadDashboard();
      setStatusMessage("Public property submission approved and added to listings.");
    } catch (error) {
      setErrorMessage(error?.message || "Unable to approve submission.");
    }
  };

  if (!ready) {
    return (
      <section className="container-shell section-shell">
        <div className="card-white p-8 text-center">
          <p className="text-lg font-semibold text-[#1E3A5F]">Loading dashboard...</p>
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
              <p className="text-sm uppercase tracking-[0.3em] text-[#C9A24A]">
                {isAdmin ? "Admin Dashboard" : "Staff Dashboard"}
              </p>
              <h1 className="mt-3 text-4xl font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {company.parentName}
              </h1>
              <p className="mt-2 text-lg font-semibold text-[#C9A24A]">
                {company.brandName} - {isAdmin ? "Full access" : "Add / Edit access"}
              </p>
              <p className="mt-4 text-sm leading-7 text-white/80">
                Logged in as {session?.user?.username} ({session?.user?.role}).
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
                  Upload images, add a video link, and publish listings without changing the public layout.
                </p>
              </div>
            </div>

            {statusMessage ? (
              <div className="mt-6 rounded-2xl border border-[#2E7D32]/20 bg-[#2E7D32]/8 px-4 py-3 text-sm text-[#2E7D32]">
                {statusMessage}
              </div>
            ) : null}
            {errorMessage ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
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
                <input className="form-input" name="price" placeholder="Price" value={formState.price} onChange={handleChange} required />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <input className="form-input" name="sizeLabel" placeholder="Size label" value={formState.sizeLabel} onChange={handleChange} required />
                <input className="form-input" name="sqft" placeholder="Area / Sq.ft" value={formState.sqft} onChange={handleChange} required />
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <input className="form-input" name="bedrooms" placeholder="Bedrooms" value={formState.bedrooms} onChange={handleChange} />
                <input className="form-input" name="bathrooms" placeholder="Bathrooms" value={formState.bathrooms} onChange={handleChange} />
                <input className="form-input" name="facing" placeholder="Facing / format" value={formState.facing} onChange={handleChange} required />
              </div>

              <input className="form-input" name="videoUrl" placeholder="Video link (YouTube / Facebook / Instagram)" value={formState.videoUrl} onChange={handleChange} />
              <input className="form-input" name="contactNumber" placeholder="Contact number" value={formState.contactNumber} onChange={handleChange} />

              <label className="flex items-center gap-3 rounded-2xl border border-[#D7DFEA] bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-[#1E3A5F]">
                <Upload className="h-4 w-4" />
                <span className="flex-1">
                  {formState.imageFiles?.length ? `${formState.imageFiles.length} image(s) selected` : "Upload property images"}
                </span>
                <input type="file" multiple accept="image/*" name="imageFiles" onChange={handleChange} className="max-w-[180px] text-xs" />
              </label>

              <textarea className="form-input min-h-[110px]" name="overview" placeholder="Description / overview" value={formState.overview} onChange={handleChange} required />
              <textarea className="form-input min-h-[110px]" name="amenities" placeholder="Amenities - one per line" value={formState.amenities} onChange={handleChange} />
              <textarea className="form-input min-h-[110px]" name="images" placeholder="Image URLs - one per line (optional fallback)" value={formState.images} onChange={handleChange} />

              <label className="flex items-center gap-3 rounded-2xl border border-[#D7DFEA] bg-[#F5F7FA] px-4 py-3 text-sm font-medium text-[#1E3A5F]">
                <input type="checkbox" name="featured" checked={formState.featured} onChange={handleChange} />
                Show this listing in featured sections
              </label>

              <div className="flex flex-wrap gap-3 pt-2">
                <button type="submit" className="btn-gold">
                  <PlusCircle className="h-4 w-4" />
                  {editingId ? "Update Property" : "Add Property"}
                </button>
                <button type="button" onClick={resetForm} className="btn-outline">
                  Clear Form
                </button>
              </div>
            </form>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Manage Listings</h2>
            <p className="mt-2 text-sm leading-7 text-[#6B7280]">
              {isAdmin
                ? "Admin can add, edit, and delete listings."
                : "Staff can add and edit listings. Delete remains restricted to main admin access."}
            </p>

            <div className="mt-6 space-y-4">
              {properties.map((property) => {
                const display = mapApiProperty(property);
                return (
                  <div key={property.id} className="rounded-[24px] border border-[#E5EAF1] bg-[#F5F7FA] p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#1E3A5F]">
                            {property.transactionType === "rent" ? "For Rent" : "For Sale"}
                          </span>
                          {property.featured ? (
                            <span className="rounded-full bg-[#C9A24A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#C9A24A]">
                              Featured
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-3 text-lg font-semibold text-[#1E3A5F]">{display.title}</h3>
                        <p className="mt-1 text-sm text-[#2E7D32]">{display.location}</p>
                        <p className="mt-2 text-sm font-semibold text-[#C9A24A]">{display.price}</p>
                        <p className="mt-2 text-sm text-[#6B7280]">{display.sizeLabel}</p>
                      </div>

                      <div className="flex gap-2">
                        <button type="button" onClick={() => startEdit(property)} className="link-pill inline-flex items-center gap-2">
                          <PenSquare className="h-4 w-4" />
                          Edit
                        </button>
                        {isAdmin ? (
                          <button type="button" onClick={() => handleDelete(property.id)} className="link-pill inline-flex items-center gap-2 text-red-600 hover:border-red-300 hover:text-red-600">
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="card-white p-8">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-5 w-5 text-[#1E3A5F]" />
              <h2 className="text-2xl font-semibold text-[#1E3A5F]">Enquiries</h2>
            </div>
            <div className="mt-6 space-y-4">
              {enquiries.length ? enquiries.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-[#E5EAF1] bg-[#F5F7FA] p-5">
                  <p className="text-sm font-semibold text-[#1E3A5F]">{item.propertyTitle || "General enquiry"}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">{item.name} | {item.mobile}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">{item.message}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button type="button" onClick={() => handleEnquiryStatus(item.id, "contacted")} className="btn-outline">
                      Mark Contacted
                    </button>
                    <button type="button" onClick={() => handleDeleteEnquiry(item.id)} className="btn-outline">
                      Delete
                    </button>
                  </div>
                </div>
              )) : <p className="text-sm text-[#6B7280]">No enquiries yet.</p>}
            </div>
          </div>

          <div className="card-white p-8">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#1E3A5F]" />
              <h2 className="text-2xl font-semibold text-[#1E3A5F]">Public Property Posts</h2>
            </div>
            <div className="mt-6 space-y-4">
              {submissions.length ? submissions.map((item) => (
                <div key={item.id} className="rounded-[24px] border border-[#E5EAF1] bg-[#F5F7FA] p-5">
                  <p className="text-sm font-semibold text-[#1E3A5F]">{item.name} | {item.mobile}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">{item.location || "Location not provided"}</p>
                  <p className="mt-1 text-sm text-[#6B7280]">{item.propertyDetails}</p>
                  {item.videoUrl ? (
                    <a href={item.videoUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex text-sm text-[#1E3A5F] hover:text-[#C9A24A]">
                      Open video link
                    </a>
                  ) : null}
                  {item.status !== "approved" ? (
                    <div className="mt-4">
                      <button type="button" onClick={() => handleApproveSubmission(item)} className="btn-gold">
                        Approve and Add Listing
                      </button>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm font-semibold text-[#2E7D32]">Approved</p>
                  )}
                </div>
              )) : <p className="text-sm text-[#6B7280]">No public submissions yet.</p>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
