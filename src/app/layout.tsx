import ThemeProvider from "@/theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as AppThemeProvider } from "@/context/ThemeContext";
import { RecipeProvider } from "@/context/RecipeContext";
import { AppFooter } from "@/components/AppFooter"; // Import AppFooter
import { FavoritesProvider } from "@/context/FavoritesContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AppThemeProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <CssBaseline />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <div style={{ flex: 1 }}>
                <RecipeProvider>{children}</RecipeProvider>
              </div>
              <AppFooter />
            </div>
          </FavoritesProvider>
        </ThemeProvider>
      </AppThemeProvider>
    </html>
  );
}
