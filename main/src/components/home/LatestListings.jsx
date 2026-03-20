import { motion } from "framer-motion";
import PropertyCard from "../property/PropertyCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import SectionHeading from "../ui/SectionHeading";

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

export default function LatestListings({ properties = [], loading = false }) {
  return (
    <motion.section
      className="section-shell bg-white"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="container-shell">
        <SectionHeading
          eyebrow="Latest Listings"
          title="Fresh inventory added for active buyers and tenants."
          description="Stay ahead with the newest additions across Chennai micro-markets."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {loading ? (
            <div className="lg:col-span-2">
              <LoadingSpinner label="Loading latest listings..." />
            </div>
          ) : (
            properties.map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <PropertyCard property={property} horizontal />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </motion.section>
  );
}
