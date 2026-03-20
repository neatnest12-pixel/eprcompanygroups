import { useEffect, useState } from "react";
import { getProperties } from "../api";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProperties from "../components/home/FeaturedProperties";
import HeroSearch from "../components/home/HeroSearch";
import LatestListings from "../components/home/LatestListings";
import PopularLocations from "../components/home/PopularLocations";
import StatsBar from "../components/home/StatsBar";
import RecentlyViewedSection from "../components/property/RecentlyViewedSection";
import SectionHeading from "../components/ui/SectionHeading";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import { Link } from "react-router-dom";

const seoLinks = [
  {
    to: "/plots-for-sale-in-omr",
    title: "Plots for Sale in OMR",
    description: "Explore OMR plots and investment-ready Chennai real estate."
  },
  {
    to: "/flats-for-sale-in-padur",
    title: "Flats for Sale in Padur",
    description: "Browse Padur apartments with strong rental and resale demand."
  },
  {
    to: "/villas-for-sale-in-ecr",
    title: "Villas for Sale in ECR",
    description: "Discover premium ECR villas and coastal investment property options."
  },
  {
    to: "/plots-in-siruseri",
    title: "Plots in Siruseri",
    description: "Find land parcels close to OMR growth corridors and tech hubs."
  }
];

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const { recentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    getProperties()
      .then(setProperties)
      .finally(() => setLoading(false));
  }, []);

  const latest = [...properties]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <>
      <HeroSearch />
      <StatsBar />
      <FeaturedProperties properties={properties} loading={loading} />
      <LatestListings properties={latest} loading={loading} />
      <section className="container-shell section-shell">
        <div className="flex flex-col gap-6">
          <SectionHeading
            eyebrow="Location Guides"
            title="Explore SEO location pages for Chennai property searches."
            description="Jump into dedicated pages targeting OMR plots, flats in Padur, villas in ECR, and plots in Siruseri."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {seoLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-gray-500">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <RecentlyViewedSection properties={recentlyViewed} />
      <PopularLocations properties={properties} loading={loading} />
      <CategoryGrid />
    </>
  );
}
