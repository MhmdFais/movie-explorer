import { Typography } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";

export default function Favourites() {
  const { favourites } = useMovies();
  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Favourites
      </Typography>
      {favourites.length ? (
        <MovieGrid movies={favourites} />
      ) : (
        <Typography color="text.secondary">
          Nothing here yet. Tap the heart on any movie to save it.
        </Typography>
      )}
    </>
  );
}
