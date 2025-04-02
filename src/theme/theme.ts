import { createTheme } from "@mui/material/styles";

// Define color constants to avoid hardcoding hex values
const colors = {
  light: {
    background: "#ffffff",
    paper: "#d9d9d9",
    text: "#171717",
    primary: "#f09595",
    buttonText: "#0a0a0a",
    shadowColor: "rgba(0, 0, 0, 0.5)",
  },
  dark: {
    background: "#0a0a0a",
    paper: "#1e1e1e",
    text: "#ededed",
    primary: "#161e7f",
    buttonText: "#ffffff",
    shadowColor: "rgba(255, 255, 255, 0.1)",
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
        main: themeColors.shadowColor,
      },
      // secondary: {
      //   main: themeColors.secondary,
      // },
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
