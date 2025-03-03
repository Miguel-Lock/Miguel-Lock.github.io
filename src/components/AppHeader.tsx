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
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cookbook
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href={routes.home}
          startIcon={<HomeIcon />}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          href={routes.shoppingCart}
          startIcon={<ShoppingCartIcon />}
        >
          Cart
        </Button>
        <IconButton color="inherit" onClick={toggleMode}>
          {themeMode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
