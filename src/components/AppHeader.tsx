"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
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
        <Button color="inherit">Recipes</Button>
        <Button color="inherit">Favorites</Button>
        <Button color="inherit">My Story</Button>
        <IconButton color="inherit" onClick={toggleMode}>
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
