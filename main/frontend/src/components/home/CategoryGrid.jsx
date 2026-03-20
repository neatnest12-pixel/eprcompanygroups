import { motion } from "framer-motion";
import { Building2, Home, Landmark, Map, Store, Trees } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";

const categories = [
  {
    name: "Plots",
    icon: Map,
    description: "High-potential land parcels for homes and investment."
  },
  {
    name: "Houses",
    icon: Home,
    description: "Ready-to-move independent homes in well-connected locations."
  },
  {
    name: "Villas",
    icon: Landmark,
    description: "Luxury living with privacy, design, and premium amenities."
  },
  {
    name: "Apartments",
    icon: Building2,
    description: "Smart homes in growing residential communities."
  },
  {
    name: "Commercial",
    icon: Store,
    description: "Retail and office opportunities across emerging business zones."
  },
  {
    name: "Farm lands",
    icon: Trees,
    description: "Long-term value through agricultural and leisure land assets."
  }
];

const MotionLink = motion(Link);

export default function CategoryGrid() {
  return (
    <section className="container-shell section-shell">
      <SectionHeading
        eyebrow="Browse Categories"
        title="A marketplace built around the property types buyers actually search for."
        description="Explore the most in-demand real estate categories across ERP Group Company listings."
      />

      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <MotionLink
              key={category.name}
              to={`/properties?category=${encodeURIComponent(category.name)}`}
              className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-orange-500 transition-all duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{category.name}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{category.description}</p>
            </MotionLink>
          );
        })}
      </div>
    </section>
  );
}
