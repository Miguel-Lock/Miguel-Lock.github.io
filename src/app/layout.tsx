import ThemeProvider from "@/theme/ThemeProvider";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { getTheme } from "@/theme/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as AppThemeProvider } from "@/context/ThemeContext";

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
          {children}
        </ThemeProvider>
      </AppThemeProvider>
    </html>
  );
}
