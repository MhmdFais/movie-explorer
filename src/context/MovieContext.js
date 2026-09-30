import { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  getTrending,
  searchMovies,
  getGenres,
  getErrorMessage,
} from "../api/tmdb";

const MovieContext = createContext();

export const useMovies = () => useContext(MovieContext);

const empty = {
  items: [],
  page: 0,
  total: 1,
  loading: false,
};

// Merge two lists without duplicate ids
export const mergeUnique = (a, b) => [
  ...new Map([...a, ...b].map((m) => [m.id, m])).values(),
];

const LAST = "me_last_search";
const FAVS = "me_favs";

// Store only what the movie card needs,
// so localStorage stays small.
const slim = (m) => ({
  id: m.id,
  title: m.title,
  poster_path: m.poster_path,
  release_date: m.release_date,
  vote_average: m.vote_average,
  genre_ids: m.genre_ids ?? m.genres?.map((g) => g.id) ?? [],
});

export function MovieProvider({ children }) {
  const [trending, setTrending] = useState(empty);
  const [error, setError] = useState("");

  // Search state
  const [search, setSearch] = useState({
    ...empty,
    query: localStorage.getItem(LAST) || "",
  });

  // Lets us ignore responses from outdated searches
  const reqId = useRef(0);

  // Favourites
  const [favourites, setFavourites] = useState(() =>
    JSON.parse(localStorage.getItem(FAVS) || "[]"),
  );

  // Genres and filters
  const [genres, setGenres] = useState([]);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
    rating: 0,
  });

  // Load movie genres
  useEffect(() => {
    getGenres()
      .then(setGenres)
      .catch(() => {
        // Filters just stay empty if this fails
      });
  }, []);

  // Apply filters to a movie list
  const applyFilters = (list) =>
    list.filter(
      (m) =>
        (!filters.genre || m.genre_ids?.includes(Number(filters.genre))) &&
        (!filters.year || m.release_date?.startsWith(filters.year)) &&
        m.vote_average >= Number(filters.rating),
    );

  // Persist favourites to localStorage
  useEffect(() => {
    localStorage.setItem(FAVS, JSON.stringify(favourites));
  }, [favourites]);

  const isFavourite = (id) => favourites.some((m) => m.id === id);

  const toggleFavourite = (movie) =>
    setFavourites((favs) =>
      favs.some((m) => m.id === movie.id)
        ? favs.filter((m) => m.id !== movie.id)
        : [...favs, slim(movie)],
    );

  const loadTrending = async () => {
    if (trending.loading || trending.page >= trending.total) {
      return;
    }

    setTrending((s) => ({
      ...s,
      loading: true,
    }));

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

      setTrending((s) => ({
        ...s,
        loading: false,
      }));
    }
  };

  const runSearch = async (query, page = 1) => {
    const q = query.trim();
    const id = ++reqId.current;

    if (!q) {
      localStorage.removeItem(LAST);

      setSearch({
        ...empty,
        query: "",
      });

      return;
    }

    localStorage.setItem(LAST, q);
    setError("");

    setSearch((s) => ({
      ...(page === 1 ? empty : s),
      query: q,
      loading: true,
    }));

    try {
      const data = await searchMovies(q, page);

      // Ignore response if a newer search has started
      if (id !== reqId.current) {
        return;
      }

      setSearch((s) => ({
        query: q,
        items: page === 1 ? data.results : mergeUnique(s.items, data.results),
        page: data.page,
        total: data.total_pages,
        loading: false,
      }));
    } catch (e) {
      // Ignore errors from outdated searches
      if (id !== reqId.current) {
        return;
      }

      setError(getErrorMessage(e));

      setSearch((s) => ({
        ...s,
        loading: false,
      }));
    }
  };

  const loadMoreSearch = () => {
    if (search.loading || !search.query || search.page >= search.total) {
      return;
    }

    runSearch(search.query, search.page + 1);
  };

  // Restore the last search on first load
  useEffect(() => {
    if (search.query) {
      runSearch(search.query);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trending,
        loadTrending,

        search,
        runSearch,
        loadMoreSearch,

        favourites,
        isFavourite,
        toggleFavourite,

        genres,
        filters,
        setFilters,
        applyFilters,

        error,
        setError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
