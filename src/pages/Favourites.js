import { Typography, Button } from "@mui/material";
import MovieGrid from "../components/MovieGrid";
import { useMovies } from "../context/MovieContext";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Favourites() {
  const { favourites } = useMovies();
  return (
    <>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
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
