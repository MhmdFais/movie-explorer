import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import useInfiniteScroll from "../hooks/useInfiniteScroll";
import { useMovies } from "../context/MovieContext";

export default function Home() {
  const { trending, loadTrending, search, loadMoreSearch, error } = useMovies();
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
          <MovieGrid movies={search.items} />
          {!search.loading && !error && search.items.length === 0 && (
            <Typography color="text.secondary">No movies found.</Typography>
          )}
          <div ref={sentinel} />
        </>
      ) : (
        <>
          <Typography variant="h5" sx={{ my: 2 }}>
            Trending this week
          </Typography>
          <MovieGrid movies={trending.items} />
          {!trending.loading && trending.page < trending.total && (
            <Box textAlign="center" py={3}>
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
