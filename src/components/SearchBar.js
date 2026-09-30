import { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useMovies } from "../context/MovieContext";

export default function SearchBar() {
  const { search, runSearch } = useMovies();
  const [text, setText] = useState(search.query);

  // wait 500ms after the user stops typing, so we don't call the API per keystroke
  useEffect(() => {
    if (text.trim() === search.query) return;
    const t = setTimeout(() => runSearch(text), 500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <TextField
      fullWidth
      placeholder="Search for a movie..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: text && (
            <IconButton
              size="small"
              onClick={() => setText("")}
              aria-label="clear"
            >
              <CloseIcon />
            </IconButton>
          ),
        },
      }}
    />
  );
}
