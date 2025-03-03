"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { routes } from "@/routes";
import styles from "@/app/page.module.css";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        href={routes.home}
        className={`${styles.navLink} ${
          pathname === routes.home ? styles.active : ""
        }`}
      >
        Home
      </Link>
      <Link
        href={routes.shoppingCart}
        className={`${styles.navLink} ${
          pathname === routes.shoppingCart ? styles.active : ""
        }`}
      >
        <Image
          src="/shopping-cart.svg"
          alt="Shopping Cart"
          width={20}
          height={20}
        />
        Shopping Cart
      </Link>
    </nav>
  );
}
