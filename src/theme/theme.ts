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
    inputBorder: "rgba(0, 0, 0, 0.23)",
    inputLabel: "rgba(0, 0, 0, 0.6)",
    placeholder: "rgba(0, 0, 0, 0.5)",
    dropdownIcon: "rgba(0, 0, 0, 0.54)",
  },
  dark: {
    background: "#0a0a0a",
    paper: "#1e1e1e",
    text: "#ededed",
    primary: "#b07675",
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
      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            backgroundColor: themeColors.paper,
            color: themeColors.text,
            "& .MuiAutocomplete-option": {
              "&[aria-selected='true']": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.16)"
                    : "rgba(0, 0, 0, 0.08)",
              },
              "&[aria-selected='true'].Mui-focused": {
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.24)"
                    : "rgba(0, 0, 0, 0.12)",
              },
            },
          },
          clearIndicator: {
            color: themeColors.dropdownIcon,
          },
          popupIndicator: {
            color: themeColors.dropdownIcon,
          },
        },
      },
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
              color: themeColors.buttonText,
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
