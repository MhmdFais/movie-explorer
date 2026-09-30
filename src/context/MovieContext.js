import { createContext, useContext, useState } from "react";
import { getTrending, getErrorMessage } from "../api/tmdb";

const MovieContext = createContext();
export const useMovies = () => useContext(MovieContext);

const empty = { items: [], page: 0, total: 1, loading: false };

// Merge two lists without duplicate ids
export const mergeUnique = (a, b) => [
  ...new Map([...a, ...b].map((m) => [m.id, m])).values(),
];

export function MovieProvider({ children }) {
  const [trending, setTrending] = useState(empty);
  const [error, setError] = useState("");

  const loadTrending = async () => {
    if (trending.loading || trending.page >= trending.total) return;
    setTrending((s) => ({ ...s, loading: true }));
    setError("");
    try {
      const data = await getTrending(trending.page + 1);
      setTrending((s) => ({
        items: mergeUnique(s.items, data.results),
        page: data.page,
        total: data.total_pages,
        loading: false,
      }));
    } catch (e) {
      setError(getErrorMessage(e));
      setTrending((s) => ({ ...s, loading: false }));
    }
  };

  return (
    <MovieContext.Provider value={{ trending, loadTrending, error, setError }}>
      {children}
    </MovieContext.Provider>
  );
}
