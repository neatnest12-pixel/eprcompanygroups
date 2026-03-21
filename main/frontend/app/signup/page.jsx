"use client";

import { useState } from "react";

export default function SignupPage() {
  const [status, setStatus] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("Thanks for signing up. Our team will contact you shortly.");
    event.currentTarget.reset();
  };

  return (
    <section className="container-shell section-shell">
      <div className="mx-auto max-w-xl">
        <div className="card-white p-8">
          <p className="section-subtitle">Signup</p>
          <h1 className="mt-3 text-3xl font-semibold text-[#1E3A5F]">Create your account</h1>
          <p className="mt-4 text-sm text-[#6B7280]">
            Join Richman Maker to save listings and receive priority updates.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input className="form-input" placeholder="Full name" name="name" required />
            <input className="form-input" placeholder="Email" name="email" type="email" required />
            <input className="form-input" placeholder="Phone" name="phone" type="tel" required />
            <button type="submit" className="btn-orange w-full">
              Create account
            </button>
          </form>

          {status ? <p className="mt-4 text-sm text-[#2E7D32]">{status}</p> : null}
        </div>
      </div>
    </section>
  );
}
