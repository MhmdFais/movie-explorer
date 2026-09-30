import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(username, password)) navigate("/");
    else setError("Wrong username or password.");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{ p: 4, width: "100%", maxWidth: 380, display: "grid", gap: 2 }}
      >
        <Typography variant="h5">🎬 Movie Explorer</Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Log in
        </Button>
        <Typography variant="caption" color="text.secondary">
          Demo login: admin / movie123
        </Typography>
      </Paper>
    </Box>
  );
}
