import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies }) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      }}
    >
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </Box>
  );
}
