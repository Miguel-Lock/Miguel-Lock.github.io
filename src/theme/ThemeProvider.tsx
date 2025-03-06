"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme"; // Your theme configuration
import EmotionRegistry from "./EmotionRegistry";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { themeMode } = useTheme();
  const theme = getTheme(themeMode);

  return (
    <EmotionRegistry>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </EmotionRegistry>
  );
}
