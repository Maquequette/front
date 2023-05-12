import { useCallback, useEffect, useState } from "react";

export default function useMediaQuery(query: string): boolean {
  const getMatches = useCallback(
    (query: string): boolean => {
      if (typeof window !== "undefined") {
        return window.matchMedia(query).matches;
      }
      return false;
    },
    [query]
  );

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return matches;
}
