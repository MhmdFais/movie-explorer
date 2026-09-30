import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StarIcon from "@mui/icons-material/Star";
import { getMovie, posterUrl, getErrorMessage } from "../api/tmdb";
import FavouriteButton from "../components/FavouriteButton";

export default function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setMovie(null);
    setError("");

    getMovie(id)
      .then(setMovie)
      .catch((e) => setError(getErrorMessage(e)));
  }, [id]);

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!movie) {
    return (
      <Box textAlign="center" py={6}>
        <CircularProgress />
      </Box>
    );
  }

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

      {/* Backdrop container */}
      <Box
        sx={{
          mt: 2,
          p: { xs: 2, md: 4 },
          borderRadius: 3,
          color: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(to right, rgba(0,0,0,.92), rgba(0,0,0,.6)), url(${posterUrl(
                movie.backdrop_path,
                "w1280",
              )})`
            : "none",
          bgcolor: movie.backdrop_path ? "transparent" : "background.paper",
        }}
      >
        {/* Poster + movie information */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            component="img"
            src={posterUrl(movie.poster_path, "w500")}
            alt={movie.title}
            sx={{
              width: { xs: "100%", md: 300 },
              maxWidth: { xs: 400, md: 300 },
              borderRadius: 2,
              alignSelf: { xs: "center", md: "flex-start" },
            }}
          />

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4">
              {movie.title} {year && `(${year})`}
            </Typography>

            {movie.tagline && (
              <Typography
                sx={{
                  color: "rgba(255,255,255,.7)",
                }}
                fontStyle="italic"
              >
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
                <Typography sx={{ color: "rgba(255,255,255,.7)" }}>
                  · {movie.runtime} min
                </Typography>
              )}

              {movie.genres.map((g) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  size="small"
                  sx={{
                    color: "#fff",
                    borderColor: "rgba(255,255,255,.5)",
                  }}
                  variant="outlined"
                />
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

            {/* Trailer + Favourite buttons */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {trailer && (
                <>
                  <Button
                    variant="contained"
                    startIcon={<PlayCircleIcon />}
                    onClick={() => setOpen(true)}
                  >
                    Watch trailer
                  </Button>

                  <Button
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noreferrer"
                    sx={{
                      color: "#fff",
                    }}
                  >
                    Open on YouTube
                  </Button>

                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    maxWidth="md"
                    fullWidth
                  >
                    <Box
                      sx={{
                        position: "relative",
                        pt: "56.25%",
                      }}
                    >
                      <iframe
                        title="Trailer"
                        src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                        allow="autoplay; encrypted-media; fullscreen"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          border: 0,
                        }}
                      />
                    </Box>
                  </Dialog>
                </>
              )}

              <FavouriteButton movie={movie} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
