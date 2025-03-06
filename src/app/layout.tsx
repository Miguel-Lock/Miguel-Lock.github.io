import ThemeProvider from "@/theme/ThemeProvider";
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
