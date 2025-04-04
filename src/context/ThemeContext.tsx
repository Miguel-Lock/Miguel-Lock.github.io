"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { getTheme } from "@/theme/theme";
//import { kMaxLength } from "buffer";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextProps {
  mode: ThemeMode;
  themeMode: "light" | "dark";
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "system",
  themeMode: "light",
  toggleMode: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<ThemeMode>("system");

  const themeMode =
    // mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;
    mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

  useEffect(() => {
    if (typeof window != 'undefined') {
    const storedTheme = localStorage.getItem('theme') as ThemeMode || "system";
    setMode(storedTheme);
    console.log("Stored color preferece: ", storedTheme);
    }
  }, []);

  // Get the theme configuration based on current theme mode
  const currentTheme = getTheme(themeMode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode);
  }, [themeMode]);

  const toggleMode = () => {
    let newMode: ThemeMode;
    switch (mode) {
      case "light":
        newMode = "dark";
        break;
      case "dark":
        newMode = "light";
        break;
      case "system":
        newMode = "light";
        break;
    }
    localStorage.setItem('theme', newMode);
    console.log("Setting theme to: ", newMode);
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, themeMode, toggleMode }}>
      <body
        style={{
          backgroundColor: currentTheme.palette.background.default,
          color: currentTheme.palette.text.primary,
        }}
      >
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
