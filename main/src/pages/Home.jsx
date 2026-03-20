import { useEffect, useState } from "react";
import { getProperties } from "../api";
import CategoryGrid from "../components/home/CategoryGrid";
import FeaturedProperties from "../components/home/FeaturedProperties";
import HeroSearch from "../components/home/HeroSearch";
import LatestListings from "../components/home/LatestListings";
import PopularLocations from "../components/home/PopularLocations";
import StatsBar from "../components/home/StatsBar";
import RecentlyViewedSection from "../components/property/RecentlyViewedSection";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";

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
      <RecentlyViewedSection properties={recentlyViewed} />
      <PopularLocations properties={properties} loading={loading} />
      <CategoryGrid />
    </>
  );
}
