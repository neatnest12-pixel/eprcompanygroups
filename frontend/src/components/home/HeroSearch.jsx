import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROPERTY_CATEGORIES } from "../../data/seed";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Select from "../ui/Select";

export default function HeroSearch() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keywords: "",
    location: "",
    category: ""
  });

  const handleSearch = (event) => {
    event.preventDefault();

    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.12),transparent_28%)]" />
      <div className="container-shell relative flex min-h-[520px] items-center section-shell">
        <motion.div
          className="w-full space-y-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, staggerChildren: 0.12 }
            }
          }}
        >
          <motion.div
            className="space-y-3 text-center"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            <h1 className="text-3xl font-bold text-white md:text-5xl">
              ERP Group Company
            </h1>
            <h2 className="text-lg tracking-wide text-gray-200 md:text-2xl">
              Richman Maker
            </h2>
          </motion.div>
          <motion.p
            className="max-w-2xl text-base text-slate-200 leading-relaxed sm:text-lg"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            Trusted real estate partner for buying and selling properties across Chennai.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 text-sm font-semibold text-slate-200"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            <span className="rounded-full border border-white/20 px-4 py-2">
              Siruseri
            </span>
            <span className="rounded-full border border-white/20 px-4 py-2">OMR</span>
            <span className="rounded-full border border-white/20 px-4 py-2">ECR</span>
            <span className="rounded-full border border-white/20 px-4 py-2">
              Padur
            </span>
          </motion.div>

          <motion.div
            className="rounded-xl bg-white p-4 shadow-lg"
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-lg bg-orange-50 p-3 text-orange-500">
                <Search className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500">
                  Search Properties
                </p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Discover your next home or investment.
                </p>
              </div>
            </div>

            <form
              className="grid grid-cols-1 gap-3 md:grid-cols-4"
              onSubmit={handleSearch}
            >
              <Input
                placeholder="Keywords, landmark, or property type"
                value={filters.keywords}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, keywords: event.target.value }))
                }
              />
              <Input
                placeholder="Preferred location"
                value={filters.location}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, location: event.target.value }))
                }
              />
              <Select
                value={filters.category}
                onChange={(event) =>
                  setFilters((current) => ({ ...current, category: event.target.value }))
                }
              >
                <option value="">All categories</option>
                {PROPERTY_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Button type="submit" className="w-full">
                Start search
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
