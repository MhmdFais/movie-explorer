import { useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export default function Home() {
  const { trending, loadTrending, error } = useMovies();

  useEffect(() => {
    if (!trending.items.length) loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Typography variant="h5" sx={{ my: 2 }}>
        Trending this week
      </Typography>
      <MovieGrid movies={trending.items} />
      {trending.loading && (
        <Box textAlign="center" py={3}>
          <CircularProgress />
        </Box>
      )}
      {!trending.loading && trending.page < trending.total && (
        <Box textAlign="center" py={3}>
          <Button variant="contained" onClick={loadTrending}>
            Load more
          </Button>
        </Box>
      )}
    </>
  );
}
