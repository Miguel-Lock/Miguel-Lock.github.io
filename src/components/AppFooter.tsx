"use client";

import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SickIcon from "@mui/icons-material/Sick";
import { Link } from "@mui/material";
import { useTheme } from "@/context/ThemeContext";

export function AppFooter() {
  const { themeMode, toggleMode, discoParty } = useTheme();

  const toggleDisco = () => {
    if (typeof window !== "undefined") {
      // Use "yes" or any other value besides "true"
      const newDiscoState = discoParty ? "no" : "yes";
      localStorage.setItem("disco_party", newDiscoState);

      // Dispatch a custom event so the context knows to update immediately
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "disco_party",
          newValue: newDiscoState,
        })
      );

      // No need to reload the page
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
          {discoParty ? <SickIcon /> : <CelebrationIcon />}
        </IconButton>

        <IconButton color="inherit" onClick={toggleMode}>
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppFooter;
