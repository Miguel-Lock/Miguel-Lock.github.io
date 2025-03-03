"use client";

import Image from "next/image";
import {
  Container,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { AppHeader } from "@/components/AppHeader";

export function HomeView() {
  return (
    <>
      <AppHeader />

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
          }}
        >
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />

          <Typography variant="h4" component="h1" gutterBottom sx={{ mt: 2 }}>
            Next.js with Material UI
          </Typography>

          <Typography variant="body1" paragraph>
            Get started by editing <code>src/views/HomeView.tsx</code>
          </Typography>
        </Box>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Resources
            </Typography>

            <List>
              <ListItem
                component="a"
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noopener"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemIcon>
                  <MenuBookIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Next.js Documentation" />
              </ListItem>

              <ListItem
                component="a"
                href="https://mui.com/material-ui"
                target="_blank"
                rel="noopener"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemIcon>
                  <CodeIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Material UI Documentation" />
              </ListItem>
            </List>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<CloudUploadIcon />}
            component="a"
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener"
            fullWidth
          >
            Deploy
          </Button>

          <Button
            variant="outlined"
            component="a"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener"
            fullWidth
          >
            Learn More
          </Button>
        </Box>
      </Container>
    </>
  );
}
