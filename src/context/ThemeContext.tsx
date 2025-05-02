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
  discoParty: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  mode: "system",
  themeMode: "light",
  toggleMode: () => {},
  discoParty: false,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<ThemeMode>("system");
  const [discoParty, setDiscoParty] = useState<boolean>(false);

  const themeMode =
    mode === "system" ? (prefersDarkMode ? "dark" : "light") : mode;

  useEffect(() => {
    if (typeof window != "undefined") {
      const storedTheme =
        (localStorage.getItem("theme") as ThemeMode) || "system";
      setMode(storedTheme);
    }
  }, []);

  // Function to generate a random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };

  const applyDiscoTheme = () => {
    // Get random colors
    const backgroundColor = getRandomColor();
    const textColor = getRandomColor();
    const primaryColor = getRandomColor();

    // Apply directly to document root for immediate effect
    document.documentElement.style.setProperty(
      "--disco-background",
      backgroundColor
    );
    document.documentElement.style.setProperty("--disco-text", textColor);
    document.documentElement.style.setProperty("--disco-primary", primaryColor);

    // Apply to body element
    if (document.body) {
      document.body.style.backgroundColor = backgroundColor;
      document.body.style.color = textColor;
    }
  };

  // Function to remove disco styling
  const removeDiscoTheme = () => {
    // Remove CSS variables from document root
    document.documentElement.style.removeProperty("--disco-background");
    document.documentElement.style.removeProperty("--disco-text");
    document.documentElement.style.removeProperty("--disco-primary");

    // Clear inline styles from body
    if (document.body) {
      document.body.style.backgroundColor = "";
      document.body.style.color = "";
    }

    // Set mode back to stored preference
    if (typeof window !== "undefined") {
      const storedTheme =
        (localStorage.getItem("theme") as ThemeMode) || "system";
      setMode(storedTheme);

      // Force theme re-application immediately
      const immediateTheme =
        storedTheme === "system"
          ? prefersDarkMode
            ? "dark"
            : "light"
          : storedTheme;

      const theme = getTheme(immediateTheme as "light" | "dark");

      // Apply theme directly to ensure it takes effect
      if (document.body) {
        document.body.style.backgroundColor = theme.palette.background.default;
        document.body.style.color = theme.palette.text.primary;
      }
    }
  };

  // Function to check if disco party mode is enabled
  const checkDiscoParty = () => {
    return (
      typeof window !== "undefined" &&
      localStorage.getItem("disco_party") === "true"
    );
  };

  // Add disco party feature
  useEffect(() => {
    // Function to set up the checking interval
    let discoInterval: NodeJS.Timeout | undefined;
    const startChecking = () => {
      discoInterval = setInterval(() => {
        const isDiscoParty = checkDiscoParty();
        if (isDiscoParty) {
          applyDiscoTheme();
          setDiscoParty(true);
        } else {
          removeDiscoTheme();
          setDiscoParty(false);
        }
      }, 100);
    };
    startChecking();

    // Clean up on unmount
    return () => {
      if (discoInterval) clearInterval(discoInterval);
      removeDiscoTheme();
    };
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
    localStorage.setItem("theme", newMode);
    setMode(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, themeMode, toggleMode, discoParty }}>
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
