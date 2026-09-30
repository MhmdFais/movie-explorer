import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useColorMode } from "../context/ColorModeContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { mode, toggle } = useColorMode();
  const { logout } = useAuth();

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: "none",
            color: "inherit",
            fontWeight: 700,
          }}
        >
          🎬 Movie Explorer
        </Typography>

        <Button component={Link} to="/favorites" color="inherit">
          Favorites
        </Button>

        <IconButton color="inherit" onClick={toggle} aria-label="toggle theme">
          {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
