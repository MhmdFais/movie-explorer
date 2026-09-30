import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

import { useMovies } from "../context/MovieContext";

export default function FilterBar() {
  const { genres, filters, setFilters } = useMovies();

  const set = (key, value) =>
    setFilters((f) => ({
      ...f,
      [key]: value,
    }));

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        alignItems: "center",
        my: 2,
        width: "100%",
      }}
    >
      {/* Genre */}
      <FormControl
        size="small"
        sx={{
          width: {
            xs: "100%",
            sm: 180,
          },
        }}
      >
        <InputLabel>Genre</InputLabel>

        <Select
          label="Genre"
          value={filters.genre}
          onChange={(e) => set("genre", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>

          {genres.map((g) => (
            <MenuItem key={g.id} value={g.id}>
              {g.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Year */}
      <TextField
        label="Year"
        value={filters.year}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, "").slice(0, 4);

          set("year", value);
        }}
        slotProps={{
          htmlInput: {
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 4,
          },
        }}
        size="small"
        sx={{
          width: {
            xs: "100%",
            sm: 180,
          },
        }}
      />

      {/* Minimum Rating */}
      <Box
        sx={{
          width: {
            xs: "100%",
            sm: 180,
          },
          px: {
            xs: 1,
            sm: 0,
          },
        }}
      >
        <Typography variant="caption">Min rating: {filters.rating}</Typography>

        <Slider
          size="small"
          min={0}
          max={10}
          step={0.5}
          value={filters.rating}
          onChange={(_, value) => set("rating", value)}
        />
      </Box>
    </Box>
  );
}
