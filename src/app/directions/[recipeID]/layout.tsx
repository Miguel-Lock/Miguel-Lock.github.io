import { ReactNode } from "react";

export const metadata = {
  title: "Lab to Ladle",
  description: "Your cookbook home page",
};

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
