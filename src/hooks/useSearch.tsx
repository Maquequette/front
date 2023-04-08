import { useQuery } from "@tanstack/react-query";

export const useSearch = (query: string) => {
  const { data, isLoading, error } = useQuery(["search", query], () =>
    fetch(`${import.meta.env.VITE_BACKEND_URL}search?q=${query}`).then((res) => res.json())
  );

  return { data, isLoading, error };
};
