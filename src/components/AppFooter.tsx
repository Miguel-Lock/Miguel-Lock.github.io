"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CelebrationIcon from "@mui/icons-material/Celebration";
// import Link from "next/link";
import { Link } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export function AppFooter() {
  const { themeMode, toggleMode } = useTheme();

  const toggleDisco = () => {
    if (typeof window !== "undefined") {
      const currentDisco = localStorage.getItem("disco_party") === "true";
      localStorage.setItem("disco_party", String(!currentDisco));
      window.location.reload();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="body1" sx={{ flexGrow: 1, marginLeft: "10px" }}>
          <Link
            href="https://github.com/Miguel-Lock/Miguel-Lock.github.io#"
            color="text.secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source Code
          </Link>
        </Typography>

        <IconButton color="inherit" onClick={() => toggleDisco()}>
          <CelebrationIcon />
        </IconButton>

        <IconButton color="inherit" onClick={toggleMode}>
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppFooter;
