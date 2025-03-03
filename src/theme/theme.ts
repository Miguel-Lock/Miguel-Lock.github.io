import { createTheme } from "@mui/material/styles";

// Define color constants to avoid hardcoding hex values
const colors = {
  light: {
    background: "#ffffff",
    paper: "#f5f5f5",
    text: "#171717",
    primary: "#a7abdd",
    primaryHover: "#8a8fc0",
    secondary: "#3fba9d",
    secondaryHover: "#35a289",
    accent: "#ff6b6b",
    accentHover: "#ff5252",
    buttonText: "#0a0a0a",
  },
  dark: {
    background: "#0a0a0a",
    paper: "#1e1e1e",
    text: "#ededed",
    primary: "#161e7f",
    primaryHover: "#2a3391",
    secondary: "#3db399",
    secondaryHover: "#45c1a6",
    accent: "#ff8787",
    accentHover: "#ff6b6b",
    buttonText: "#ffffff",
  },
};

// Create a function that returns the theme based on mode
export const getTheme = (mode: "light" | "dark") => {
  const themeColors = mode === "light" ? colors.light : colors.dark;

  return createTheme({
    palette: {
      primary: {
        main: themeColors.primary,
      },
      secondary: {
        main: themeColors.secondary,
      },
      background: {
        default: themeColors.background,
        paper: themeColors.paper,
      },
      text: {
        primary: themeColors.text,
      },
    },
    typography: {
      fontFamily: "Arial, Helvetica, sans-serif",
    },
  });
};
