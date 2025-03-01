"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Typography,
  Container,
  Paper,
  Button,
  IconButton,
  Box,
  Grid,
  Divider,
  Card,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { routes } from "@/routes";
import { AppHeader } from "@/components/AppHeader";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

// Mock data - in a real app, you'd get this from an API or state management
const initialItems: CartItem[] = [
  {
    id: "1",
    name: "Product One",
    price: 19.99,
    quantity: 2,
    image: "/product-placeholder.jpg",
  },
  {
    id: "2",
    name: "Product Two",
    price: 29.99,
    quantity: 1,
    image: "/product-placeholder.jpg",
  },
];

export function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialItems);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <AppHeader />

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Your Shopping Cart
          </Typography>
          <Button
            component={Link}
            href={routes.home}
            startIcon={<ArrowBackIcon />}
            sx={{ mt: 1 }}
          >
            Continue Shopping
          </Button>
        </Box>

        {cartItems.length === 0 ? (
          <Paper elevation={2} sx={{ p: 4, textAlign: "center" }}>
            <Alert severity="info" sx={{ mb: 2 }}>
              Your cart is empty
            </Alert>
            <Button variant="contained" component={Link} href={routes.home}>
              Start Shopping
            </Button>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper elevation={2} sx={{ p: 2 }}>
                {cartItems.map((item) => (
                  <Box key={item.id} sx={{ py: 2 }}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={3} sm={2}>
                        <Card elevation={0}>
                          <Box
                            sx={{ width: 80, height: 80, position: "relative" }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="80px"
                              style={{ objectFit: "cover" }}
                            />
                          </Box>
                        </Card>
                      </Grid>

                      <Grid item xs={9} sm={4}>
                        <Typography variant="subtitle1">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price.toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={3}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            <RemoveIcon fontSize="small" />
                          </IconButton>
                          <Typography sx={{ mx: 1 }}>
                            {item.quantity}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            <AddIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Grid>

                      <Grid item xs={3} sm={2} sx={{ textAlign: "right" }}>
                        <Typography variant="subtitle1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                      </Grid>

                      <Grid item xs={3} sm={1} sx={{ textAlign: "right" }}>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => removeItem(item.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Divider sx={{ mt: 2 }} />
                  </Box>
                ))}
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Shipping</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography>Tax</Typography>
                  <Typography>$0.00</Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    Total
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
