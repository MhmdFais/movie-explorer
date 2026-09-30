import { IconButton } from "@mui/material";
import FavouriteIcon from "@mui/icons-material/Favorite";
import FavouriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMovies } from "../context/MovieContext";

export default function FavouriteButton({ movie }) {
  const { isFavourite, toggleFavourite } = useMovies();
  const fav = isFavourite(movie.id);
  return (
    <IconButton
      onClick={() => toggleFavourite(movie)}
      aria-label={fav ? "Remove from favorites" : "Add to favorites"}
      sx={{
        bgcolor: "rgba(0,0,0,.5)",
        "&:hover": { bgcolor: "rgba(0,0,0,.7)" },
      }}
    >
      {fav ? (
        <FavouriteIcon color="error" />
      ) : (
        <FavouriteBorderIcon sx={{ color: "#fff" }} />
      )}
    </IconButton>
  );
}
