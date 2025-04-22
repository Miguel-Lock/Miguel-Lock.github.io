import { createTheme } from "@mui/material/styles";

// Define color constants to avoid hardcoding hex values
const colors = {
  light: {
    background: "#ffffff",
    paper: "#fafafa",
    text: "#171717",
    onPrimaryText: "#171717",
    primary: "#f09595",
    accent: "#d9d9d9",
    buttonText: "#0a0a0a",
    shadowColor: "rgba(0, 0, 0, 0.5)",
    inputBorder: "rgba(0, 0, 0, 0.23)",
    inputLabel: "rgba(0, 0, 0, 0.6)",
    placeholder: "rgba(0, 0, 0, 0.5)",
    dropdownIcon: "rgba(0, 0, 0, 0.54)",
  },
  dark: {
    background: "hsl(0, 0%, 8%)",
    paper: "#1e1e1e",
    text: "#ededed",
    onPrimaryText: "#171717",
    primary: "#b07675",
    accent: "hsl(0, 0%, 15%)",
    buttonText: "#ffffff",
    shadowColor: "rgb(255, 255, 255, .1)",
    inputBorder: "rgba(255, 255, 255, 0.5)",
    inputLabel: "rgba(255, 255, 255, 0.7)",
    placeholder: "rgba(255, 255, 255, 0.5)",
    dropdownIcon: "rgba(255, 255, 255, 0.7)",
  },
};

// Create a function that returns the theme based on mode
export const getTheme = (mode: "light" | "dark") => {
  const themeColors = mode === "light" ? colors.light : colors.dark;

  return createTheme({
    palette: {
      primary: {
        main: themeColors.primary,
        light: themeColors.accent,
      },
      secondary: {
        main: themeColors.shadowColor,
      },
      background: {
        default: themeColors.background,
        paper: themeColors.paper,
      },
      text: {
        primary: themeColors.text,
        secondary: themeColors.onPrimaryText,
      },
      action: {
        disabled: themeColors.text,
      },
    },
    typography: {
      fontFamily: "Montserrat, Arial, San-sarif",
    },
    components: {
      // TextField and Input styles
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: themeColors.text,
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.text,
              opacity: 0.8,
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.primary,
              borderWidth: "2px",
            },
            "& input::placeholder": {
              color: themeColors.placeholder,
              opacity: 1,
            },
          },
          notchedOutline: {
            borderColor: themeColors.inputBorder,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color: themeColors.inputLabel,
            "&.Mui-focused": {
              color: themeColors.primary,
            },
          },
        },
      },
      // ToggleButton styles (existing)
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.paper,
            border: `1px solid ${themeColors.primary}`,
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            color: themeColors.text,
            backgroundColor: themeColors.background,
            "&.Mui-selected": {
              backgroundColor: themeColors.primary,
              color: themeColors.onPrimaryText,
              "&:hover": {
                backgroundColor: themeColors.primary,
                opacity: 0.9,
              },
            },
            "&:hover": {
              backgroundColor:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
          },
        },
      },
      // Menu styles
      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: themeColors.paper,
            color: themeColors.text,
          },
        },
      },
      // List styles for dropdown
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.paper,
            color: themeColors.text,
          },
        },
      },
    },
  });
};
