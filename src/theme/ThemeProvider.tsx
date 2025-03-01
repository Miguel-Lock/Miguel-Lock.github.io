"use client";

import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { getTheme } from "./theme"; // Your theme configuration
import EmotionRegistry from "./EmotionRegistry";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create theme with a default mode
  const theme = getTheme("light");

  console.log(theme);

  return (
    <EmotionRegistry>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </EmotionRegistry>
  );
}
