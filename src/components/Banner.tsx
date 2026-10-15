"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./banner.module.css";

const bannerImages = [
  "/images/cover.jpg",
  "/images/cover2.jpg",
  "/images/cover3.jpg",
  "/images/cover4.jpg",
];

export default function Banner() {
  const { data: session } = useSession();
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();

  function showNextImage() {
    setCurrentImage((index) => (index + 1) % bannerImages.length);
  }

  return (
    <section className={styles.banner} onClick={showNextImage}>
      <img
        src={bannerImages[currentImage]}
        alt="Event venue banner"
        className={styles.backgroundImage}
      />
      <div className={styles.overlay}>
        <h1>where every event finds its venue</h1>

        <p>
          Discover the perfect venue for your special moments.
          We provide premium event spaces for weddings, meetings,
          celebrations, and corporate events with professional service.
        </p>

        <button
          type="button"
          className={styles.selectVenueButton}
          onClick={(event) => {
            event.stopPropagation();
            router.push("/venue");
          }}
        >
          Select Venue
        </button>
      </div>
      {session?.user?.name && (
        <p className={styles.welcome}>Welcome {session.user.name}</p>
      )}
    </section>
  );
}
