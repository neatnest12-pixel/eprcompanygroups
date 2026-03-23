"use client";

import { useState } from "react";
import { createSubmission } from "../../lib/api";

export default function PostPropertyPage() {
  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    location: "",
    propertyDetails: "",
    videoUrl: "",
    imageFiles: []
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, files, type } = event.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "file" ? Array.from(files || []) : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await createSubmission(formState);
      setStatus({
        type: "success",
        message: "Your property has been submitted for admin approval."
      });
      setFormState({
        name: "",
        mobile: "",
        location: "",
        propertyDetails: "",
        videoUrl: "",
        imageFiles: []
      });
      event.currentTarget.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to submit your property right now."
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="container-shell section-shell">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <p className="section-subtitle">Post Your Property</p>
          <h1 className="section-title mt-3">Share your property for admin approval</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[#6B7280]">
            Submit your property details, images, and video link. Our team will review the listing
            and publish it after approval.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="card-white grid gap-4 p-8">
          <input className="form-input" name="name" placeholder="Name" value={formState.name} onChange={handleChange} required />
          <input className="form-input" name="mobile" placeholder="Mobile number" value={formState.mobile} onChange={handleChange} required />
          <input className="form-input" name="location" placeholder="Property location" value={formState.location} onChange={handleChange} />
          <textarea className="form-input min-h-[140px]" name="propertyDetails" placeholder="Property details" value={formState.propertyDetails} onChange={handleChange} required />
          <input className="form-input" name="videoUrl" placeholder="Video link (YouTube / Facebook / Instagram)" value={formState.videoUrl} onChange={handleChange} />
          <input className="form-input" type="file" name="imageFiles" multiple accept="image/*" onChange={handleChange} />
          <button type="submit" className="btn-orange w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit for Approval"}
          </button>
          {status.message ? (
            <p className={`text-sm ${status.type === "success" ? "text-[#2E7D32]" : "text-red-600"}`}>
              {status.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
