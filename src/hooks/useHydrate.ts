import { useState, useEffect } from "react";

export const useHydrate = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
};
