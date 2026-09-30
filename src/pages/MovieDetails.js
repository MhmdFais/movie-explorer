import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarIcon from "@mui/icons-material/Star";
import { getMovie, posterUrl, getErrorMessage } from "../api/tmdb";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setMovie(null);
    setError("");
    getMovie(id)
      .then(setMovie)
      .catch((e) => setError(getErrorMessage(e)));
  }, [id]);

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!movie)
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress />
      </Box>
    );

  const year = movie.release_date?.slice(0, 4);
  const cast = movie.credits?.cast.slice(0, 8) ?? [];
  const videos = movie.videos?.results ?? [];
  const trailer =
    videos.find((v) => v.site === "YouTube" && v.type === "Trailer") ??
    videos.find((v) => v.site === "YouTube");

  return (
    <>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />}>
        Back
      </Button>
      <Box
        sx={{
          display: "flex",
          gap: 3,
          mt: 2,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          component="img"
          src={posterUrl(movie.poster_path, "w500")}
          alt={movie.title}
          sx={{
            width: { xs: "100%", md: 300 },
            borderRadius: 2,
            alignSelf: "flex-start",
          }}
        />
        <Box>
          <Typography variant="h4">
            {movie.title} {year && `(${year})`}
          </Typography>
          {movie.tagline && (
            <Typography color="text.secondary" fontStyle="italic">
              {movie.tagline}
            </Typography>
          )}

          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              my: 2,
              alignItems: "center",
            }}
          >
            <StarIcon sx={{ color: "gold" }} />
            <Typography>{movie.vote_average?.toFixed(1)} / 10</Typography>
            {movie.runtime > 0 && (
              <Typography color="text.secondary">
                · {movie.runtime} min
              </Typography>
            )}
            {movie.genres.map((g) => (
              <Chip key={g.id} label={g.name} size="small" />
            ))}
          </Box>

          <Typography variant="h6">Overview</Typography>
          <Typography sx={{ mb: 2 }}>
            {movie.overview || "No overview available."}
          </Typography>

          <Typography variant="h6">Cast</Typography>
          <Typography sx={{ mb: 2 }}>
            {cast.map((c) => c.name).join(", ") || "Not available."}
          </Typography>

          {trailer && (
            <Button
              variant="contained"
              startIcon={<PlayCircleIcon />}
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch trailer
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
