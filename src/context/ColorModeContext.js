import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ColorModeContext = createContext();
export const useColorMode = () => useContext(ColorModeContext);

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState(
    () => localStorage.getItem("me_mode") || "dark",
  );

  const toggle = () =>
    setMode((m) => {
      const next = m === "dark" ? "light" : "dark";
      localStorage.setItem("me_mode", next); // remember the choice
      return next;
    });

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ColorModeContext.Provider value={{ mode, toggle }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
