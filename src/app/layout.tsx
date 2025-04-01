import ThemeProvider from "@/theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as AppThemeProvider } from "@/context/ThemeContext";
import { RecipeProvider } from "@/context/RecipeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <GeistSans /> */}
      <AppThemeProvider>
        <ThemeProvider>
          <CssBaseline />
          <RecipeProvider>{children}</RecipeProvider>
        </ThemeProvider>
      </AppThemeProvider>
    </html>
  );
}
