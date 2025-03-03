import { createTheme } from "@mui/material/styles";

// Define color constants
const colors = {
  light: {
    background: "#ffffff",
    paper: "#f5f5f5",
    text: "#171717",
  },
  dark: {
    background: "#121212",
    paper: "#1e1e1e",
    text: "#f5f5f5",
  },
  common: {
    primary: "#fafafa",
    secondary: "#3fba9d",
  },
};

// Create a function that returns the theme based on mode
export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: colors.common.primary,
      },
      secondary: {
        main: colors.common.secondary,
      },
      background: {
        default:
          mode === "light" ? colors.light.background : colors.dark.background,
        paper: mode === "light" ? colors.light.paper : colors.dark.paper,
      },
      text: {
        primary: mode === "light" ? colors.light.text : colors.dark.text,
      },
    },
    typography: {
      fontFamily: "var(--font-geist-sans)", // Font variables still work fine
    },
  });
