import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";

import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import MovieGrid from "../components/MovieGrid";

import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useMovies } from "../context/MovieContext";

export default function Home() {
  const {
    trending,
    loadTrending,
    search,
    loadMoreSearch,
    error,
    applyFilters,
  } = useMovies();

  const searching = Boolean(search.query);

  const sentinel = useInfiniteScroll(
    loadMoreSearch,
    searching && search.items.length > 0,
  );

  useEffect(() => {
    if (!trending.items.length) loadTrending();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SearchBar />

      <FilterBar />

      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {searching ? (
        <>
          <Typography variant="h5" sx={{ my: 2 }}>
            Results for “{search.query}”
          </Typography>

          <MovieGrid movies={applyFilters(search.items)} />

          {!search.loading &&
            !error &&
            applyFilters(search.items).length === 0 && (
              <Typography color="text.secondary">No movies found.</Typography>
            )}

          <div ref={sentinel} />
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ my: 2 }}>
            Trending this week
          </Typography>

          <MovieGrid movies={applyFilters(trending.items)} />

          {!trending.loading && trending.page < trending.total && (
            <Box
              textAlign="center"
              sx={{
                marginTop: "20px",
                marginBottom: "20px",
              }}
            >
              <Button variant="contained" onClick={loadTrending}>
                Load more
              </Button>
            </Box>
          )}
        </>
      )}

      {(search.loading || trending.loading) && (
        <Box textAlign="center" py={3}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
