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
    primary: "#b07675",
    buttonText: "#ffffff",
    shadowColor: "rgb(255, 255, 255, .1)",
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
      action: {
        disabled: themeColors.text,
      },
    },
    typography: {
      fontFamily: "Arial, Helvetica, sans-serif",
    },
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.text, // Use text color on hover
              opacity: 0.8, // Make more visible
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.primary, // Use primary color when focused
              borderWidth: "2px", // Thicker border when focused
            },
          },
          notchedOutline: {
            borderColor:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.5)" // More visible in dark mode
                : "rgba(0, 0, 0, 0.23)", // Default light mode
          },
        },
      },
    },
  });
};
