import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

export default function FeaturedProperties({ properties = [], loading = false }) {
  const featuredFromFlag = properties.filter((property) => property.featured === true);
  const featuredProperties = featuredFromFlag.length
    ? featuredFromFlag.slice(0, 4)
    : properties.slice(0, 4);

  return (
    <motion.section
      className="mx-auto max-w-7xl px-6 py-16 transition-opacity duration-500"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <SectionHeading
          eyebrow="Featured Properties"
          title="Handpicked opportunities with strong buyer demand."
          description="Curated listings from fast-moving locations and high-interest categories."
        />
        <Link
          to="/properties"
          className="text-sm font-bold uppercase tracking-[0.3em] text-orange-500 transition-colors hover:text-orange-600"
        >
          View all properties
        </Link>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading ? (
          <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
            <LoadingSpinner label="Loading featured properties..." />
          </div>
        ) : featuredProperties.length ? (
          featuredProperties.map((property) => (
            <motion.div
              key={property.id}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No featured properties available.</p>
        )}
      </div>
    </motion.section>
  );
}
