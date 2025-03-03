"use client";

import Link from "next/link";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { routes } from "@/routes";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Cookbook
        </Typography>
        <Button
          color="inherit"
          component={Link}
          href={routes.shoppingCart}
          startIcon={<ShoppingCartIcon />}
        >
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
}
export default Header;
