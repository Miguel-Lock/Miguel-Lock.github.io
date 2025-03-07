"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { routes } from "@/routes";
import { useTheme } from "@/context/ThemeContext";

export function AppHeader() {
  const { themeMode, toggleMode } = useTheme();

  return (
    <AppBar position="static" sx={{ bgcolor: "primary", padding: "10px" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Lab to Ladle
        </Typography>
        <Button color="inherit" href={routes.home}>
          Home
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderColor: "text.primary" }}
        />
        <Button color="inherit" href={routes.recipes}>
          Recipes
        </Button>
        {/* 
        <IconButton color="inherit" onClick={toggleMode}>
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        */}
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
