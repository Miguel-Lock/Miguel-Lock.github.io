import ThemeProvider from "@/theme/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as AppThemeProvider } from "@/context/ThemeContext";
import { RecipeProvider } from "@/context/RecipeContext";
import { AppFooter } from "@/components/AppFooter";
import { AppHeader } from "@/components/AppHeader";
import { Box } from "@mui/material";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className}>
      <AppThemeProvider>
        <ThemeProvider>
          <FavoritesProvider>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                position: "relative",
              }}
            >
              <Box sx={{ position: "relative", zIndex: 10 }}>
                <AppHeader />
              </Box>

              <Box
                sx={{
                  flex: "1 1 auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <RecipeProvider>{children}</RecipeProvider>
              </Box>

              <AppFooter />
            </Box>
          </FavoritesProvider>
        </ThemeProvider>
      </AppThemeProvider>
    </html>
  );
}
