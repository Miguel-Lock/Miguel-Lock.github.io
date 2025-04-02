"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export function AppFooter() {
  const { themeMode, toggleMode } = useTheme();

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: "10px" }}>
          <Link
            href="https://github.com/Miguel-Lock/Miguel-Lock.github.io#"
            style={{ color: "inherit" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </Link>
        </Typography>

        <IconButton color="inherit" onClick={toggleMode}>
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppFooter;
