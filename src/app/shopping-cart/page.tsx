import { CartView } from "@/views/CartView"; // You'll create this component

export const metadata = {
  title: "Shopping Cart | Cookbook",
  description: "View your shopping cart items",
};

export default function ShoppingCartPage() {
  return <CartView />;
}
