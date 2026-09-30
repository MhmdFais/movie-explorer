import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { posterUrl } from "../api/tmdb";
import FavouriteButton from "../components/FavouriteButton";

export default function MovieCard({ movie }) {
  const year = movie.release_date?.slice(0, 4) || "N/A";
  return (
    <Card sx={{ position: "relative", height: "100%" }}>
      <CardActionArea component={Link} to={`/movie/${movie.id}`}>
        <CardMedia
          component="img"
          image={posterUrl(movie.poster_path)}
          alt={movie.title}
          loading="lazy"
          sx={{ aspectRatio: "2 / 3" }}
        />
        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" noWrap title={movie.title}>
            {movie.title}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="text.secondary">
              {year}
            </Typography>
            <Typography
              variant="caption"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <StarIcon sx={{ fontSize: 14, color: "gold", mr: 0.3 }} />
              {movie.vote_average?.toFixed(1)}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Box sx={{ position: "absolute", top: 4, right: 4 }}>
        <FavouriteButton movie={movie} />
      </Box>
    </Card>
  );
}
