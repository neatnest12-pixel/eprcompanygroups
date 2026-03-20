import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeading from "../ui/SectionHeading";
import LoadingSpinner from "../ui/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.12 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const MotionLink = motion(Link);

export default function PopularLocations({ properties = [], loading = false }) {
  const groupedLocations = Object.entries(
    properties.reduce((accumulator, property) => {
      const key = property.location.split(",")[0];
      accumulator[key] = (accumulator[key] || 0) + 1;
      return accumulator;
    }, {})
  ).slice(0, 4);

  return (
    <motion.section
      className="container-shell section-shell"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <SectionHeading
        eyebrow="Popular Locations"
        title="Where ERP Group Company buyers are focusing right now."
        description="High-intent neighbourhoods with active listings and steady demand."
      />

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          <div className="md:col-span-2 xl:col-span-4">
            <LoadingSpinner label="Loading popular locations..." />
          </div>
        ) : (
          groupedLocations.map(([location, count]) => (
            <MotionLink
              key={location}
              to={`/properties?location=${encodeURIComponent(location)}`}
              className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-900 p-6 text-white shadow-sm transition-all duration-300 hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.25 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_32%)]" />
              <div className="relative flex min-h-[220px] flex-col justify-between">
                <MapPin className="h-5 w-5 text-orange-300" />
                <div>
                  <h3 className="mt-6 text-xl font-semibold">{location}</h3>
                  <p className="mt-2 text-sm text-slate-300">{count} active listings</p>
                </div>
              </div>
            </MotionLink>
          ))
        )}
      </div>
    </motion.section>
  );
}
