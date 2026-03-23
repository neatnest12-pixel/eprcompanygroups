"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../../lib/api";

export default function LoginPage() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    try {
      const data = await loginUser(payload);

      window.localStorage.setItem("erp-admin-auth", JSON.stringify(data));
      setStatus({
        type: "success",
        message: `Login successful. ${data.user.role === "staff" ? "Staff" : "Admin"} access enabled.`
      });
      form.reset();
      window.setTimeout(() => {
        router.push("/admin");
      }, 500);
    } catch (error) {
      setStatus({
        type: "error",
        message: error?.message || "Login failed. Please try again."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="container-shell section-shell">
      <div className="mx-auto max-w-xl">
        <div className="card-white p-8">
          <p className="section-subtitle">Admin / Staff Login</p>
          <h1 className="mt-3 text-3xl font-semibold text-[#1E3A5F]">
            Sign in to manage listings
          </h1>
          <p className="mt-4 text-sm text-[#6B7280]">Use your username and password to access the dashboard.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="form-input"
              placeholder="Username"
              name="username"
              type="text"
              required
            />
            <input
              className="form-input"
              placeholder="Password"
              name="password"
              type="password"
              required
            />
            <button type="submit" className="btn-orange w-full" disabled={loading}>
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          {status.message ? (
            <p
              className={`mt-4 text-sm ${
                status.type === "success" ? "text-[#2E7D32]" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
