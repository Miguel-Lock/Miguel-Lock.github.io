"use client";

import { AppBar, Toolbar, Typography, Button, Divider } from "@mui/material";
import { routes } from "@/routes";
import Link from "next/link";

export function AppHeader() {
  return (
    <AppBar position="static" sx={{ bgcolor: "primary", padding: "0px" }}>
      <Toolbar sx={{ padding: 0 }}>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, my: "10px", marginLeft: "10px" }}
        >
          Lab to Ladle
        </Typography>
        <Button
          component={Link}
          href={routes.home}
          color="inherit"
          disableRipple={true}
          sx={{
            height: "100%",
            py: 3,
            px: 2,
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Home
        </Button>
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderColor: "text.primary",
            my: "10px",
          }}
        />
        <Button
          component={Link}
          color="inherit"
          href={routes.recipes}
          disableRipple={true}
          sx={{
            height: "100%",
            py: 3,
            px: 2,
            display: "flex",
            alignItems: "center",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          Recipes
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
