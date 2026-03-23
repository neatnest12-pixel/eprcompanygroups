"use client";

import { useEffect, useState } from "react";
import { createEnquiry } from "../lib/api";
import {
  buildPropertyEnquiryMessage,
  buildWhatsAppUrl
} from "../lib/propertyAdapter";

export default function ContactForm({
  redirectToWhatsApp = false,
  property = null,
  title = "Send Enquiry"
}) {
  const [formState, setFormState] = useState({
    name: "",
    mobile: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!property) {
      setFormState((prev) => ({
        ...prev,
        message:
          "Hello ERP Group Company,\n\nI am interested in your property services.\n\nPlease share more details."
      }));
      return;
    }

    setFormState((prev) => ({
      ...prev,
      message: buildPropertyEnquiryMessage(property, {
        name: prev.name || "[User Name]",
        mobile: prev.mobile || "[User Phone]"
      })
    }));
  }, [property]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => {
      const next = { ...prev, [name]: value };
      if (property && (name === "name" || name === "mobile")) {
        next.message = buildPropertyEnquiryMessage(property, {
          name: name === "name" ? value || "[User Name]" : next.name || "[User Name]",
          mobile: name === "mobile" ? value || "[User Phone]" : next.mobile || "[User Phone]"
        });
      }
      return next;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus({ type: "", message: "" });

    try {
      await createEnquiry({
        propertyId: property?.id || "",
        propertyTitle: property?.title || "",
        location: property?.location || "",
        price: property?.price || "",
        size: property?.sizeLabel || "",
        name: formState.name,
        mobile: formState.mobile,
        email: formState.email,
        message: formState.message
      });

      if (redirectToWhatsApp || property) {
        window.open(buildWhatsAppUrl(formState.message), "_blank");
      }

      setStatus({
        type: "success",
        message: "Enquiry sent successfully. We will contact you shortly."
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Unable to send enquiry right now."
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-white space-y-4 p-6">
      <h3 className="text-xl font-semibold text-[#1E3A5F]">{title}</h3>
      <input
        className="form-input"
        placeholder="Name"
        name="name"
        type="text"
        value={formState.name}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        placeholder="Mobile number"
        name="mobile"
        type="tel"
        value={formState.mobile}
        onChange={handleChange}
        required
      />
      <input
        className="form-input"
        placeholder="Email (optional)"
        name="email"
        type="email"
        value={formState.email}
        onChange={handleChange}
      />
      <textarea
        className="form-input h-40"
        placeholder="Message"
        name="message"
        value={formState.message}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn-orange w-full" disabled={sending}>
        {sending ? "Sending..." : "Send Enquiry"}
      </button>
      {status.message ? (
        <p className={`text-sm ${status.type === "success" ? "text-[#2E7D32]" : "text-red-600"}`}>
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
