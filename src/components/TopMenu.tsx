"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import TopMenuItem from "./TopMenuItem";
import styles from "./top-menu.module.css";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <nav aria-label="Main navigation" className={styles.menu}>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className={styles.sessionLink}
      >
        {session ? "Sign-Out" : "Sign-In"}
      </Link>

      <div className={styles.menuItems}>
        <TopMenuItem title="Booking" pageRef="/booking" />
        <Image
          className={styles.logo}
          src="/images/logo.png"
          alt="logo"
          width={160}
          height={62}
        />
      </div>
    </nav>
  );
}
