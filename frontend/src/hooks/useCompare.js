import { useEffect, useState } from "react";
import {
  clearCompareIdsInStore,
  getCompareIdsFromStore,
  toggleCompareIdInStore
} from "../data/storage";

const COMPARE_EVENT = "epr-compare-updated";

export function useCompare() {
  const [compareIds, setCompareIds] = useState([]);

  useEffect(() => {
    setCompareIds(getCompareIdsFromStore());

    const syncCompare = () => setCompareIds(getCompareIdsFromStore());
    window.addEventListener(COMPARE_EVENT, syncCompare);

    return () => window.removeEventListener(COMPARE_EVENT, syncCompare);
  }, []);

  return {
    compareIds,
    toggleCompare(propertyId) {
      const next = toggleCompareIdInStore(propertyId);
      setCompareIds(next);
      window.dispatchEvent(new Event(COMPARE_EVENT));
      return next;
    },
    clearCompare() {
      clearCompareIdsInStore();
      setCompareIds([]);
      window.dispatchEvent(new Event(COMPARE_EVENT));
    }
  };
}
