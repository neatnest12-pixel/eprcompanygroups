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
    <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-6">
      <input
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Name"
        name="name"
        type="text"
        required
      />
      <input
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Phone"
        name="phone"
        type="tel"
        required
      />
      <input
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Email"
        name="email"
        type="email"
        required
      />
      <textarea
        className="h-32 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        placeholder="Message"
        name="message"
        required
      />
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0B5D3B]"
      >
        Send Message
      </button>
      {submitted ? (
        <p className="text-sm text-white/80">Thanks! We will contact you shortly.</p>
      ) : null}
    </form>
  );
}
