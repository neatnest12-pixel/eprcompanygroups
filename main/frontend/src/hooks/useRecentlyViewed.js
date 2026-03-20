import { useEffect, useState } from "react";
import { getProperties } from "../api";
import {
  getRecentlyViewedIdsFromStore,
  pushRecentlyViewedId
} from "../data/storage";

const RECENTLY_VIEWED_EVENT = "epr-recently-viewed-updated";

export function useRecentlyViewed() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const syncViewed = async () => {
      const ids = getRecentlyViewedIdsFromStore();
      const allProperties = await getProperties();
      const nextProperties = ids
        .map((id) => allProperties.find((property) => property.id === id))
        .filter(Boolean);
      setProperties(nextProperties);
    };

    syncViewed();
    window.addEventListener(RECENTLY_VIEWED_EVENT, syncViewed);

    return () => window.removeEventListener(RECENTLY_VIEWED_EVENT, syncViewed);
  }, []);

  const trackPropertyView = async (propertyId) => {
    pushRecentlyViewedId(propertyId);
    window.dispatchEvent(new Event(RECENTLY_VIEWED_EVENT));
    const ids = getRecentlyViewedIdsFromStore();
    const allProperties = await getProperties();
    const nextProperties = ids
      .map((id) => allProperties.find((property) => property.id === id))
      .filter(Boolean);
    setProperties(nextProperties);
  };

  return {
    recentlyViewed: properties,
    trackPropertyView
  };
}
