"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Building2, LogOut, PhoneCall, ShieldCheck, Star, Tags } from "lucide-react";
import { company } from "../../lib/content";
import { properties } from "../../lib/properties";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("erp-admin-auth");

    if (!stored) {
      router.replace("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      setAdmin(parsed);
      setReady(true);
    } catch {
      window.localStorage.removeItem("erp-admin-auth");
      router.replace("/login");
    }
  }, [router]);

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
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("erp-admin-auth");
    router.push("/login");
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
            {
              title: "Total Listings",
              value: stats.total,
              icon: Building2
            },
            {
              title: "For Sale",
              value: stats.saleCount,
              icon: Tags
            },
            {
              title: "For Rent",
              value: stats.rentCount,
              icon: PhoneCall
            },
            {
              title: "Featured Deals",
              value: stats.featuredCount,
              icon: Star
            }
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

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-white p-8">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-[#2E7D32]/12 p-3">
                <ShieldCheck className="h-5 w-5 text-[#2E7D32]" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-[#1E3A5F]">Admin Overview</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Your login is active and the dashboard is working.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 text-base leading-8 text-[#6B7280]">
              <p>
                This dashboard confirms that your admin session is being stored correctly and that
                the website can now route signed-in users away from the login page.
              </p>
              <p>
                The current site has <span className="font-semibold text-[#1E3A5F]">{stats.total}</span> active
                sample listings across land, flats, rentals, and commercial inventory. Featured
                deals and premium lowest-price offers are already live on the public site.
              </p>
              <p>
                If you want, the next step can be a full listing-management panel where you add,
                edit, hide, or delete properties directly from this dashboard.
              </p>
            </div>
          </div>

          <div className="card-white p-8">
            <h2 className="text-2xl font-semibold text-[#1E3A5F]">Quick Actions</h2>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/properties" className="link-pill text-center">
                Open Properties Page
              </Link>
              <Link href="/contact" className="link-pill text-center">
                Open Contact Page
              </Link>
              <a href={company.phoneHref} className="btn-gold w-full">
                Call {company.phone}
              </a>
              <a href={company.secondaryPhoneHref} className="btn-outline w-full">
                Call {company.secondaryPhone}
              </a>
              <a href={company.whatsappHref} className="btn-outline w-full">
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
