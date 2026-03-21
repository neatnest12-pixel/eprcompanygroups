"use client";

import { useState } from "react";

export default function ContactForm({ redirectToWhatsApp = false }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (redirectToWhatsApp) {
      window.open(
        "https://wa.me/918939427799?text=Hi%2C%20I%27m%20interested%20in%20your%20property%20services",
        "_blank"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-white space-y-4 p-6">
      <input
        className="form-input"
        placeholder="Name"
        name="name"
        type="text"
        required
      />
      <input
        className="form-input"
        placeholder="Phone"
        name="phone"
        type="tel"
        required
      />
      <input
        className="form-input"
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <textarea
        className="form-input h-32"
        placeholder="Message"
        name="message"
        required
      />
      <button
        type="submit"
        className="btn-gold w-full"
      >
        Send Message
      </button>
      {submitted ? (
        <p className="text-sm text-[#2E7D32]">Thanks! We will contact you shortly.</p>
      ) : null}
    </form>
  );
}
