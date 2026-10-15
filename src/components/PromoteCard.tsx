"use client";

import { useState } from "react";
import useWindowListener from "@/hooks/useWindowListener";
import VideoPlayer from "./VideoPlayer";
import styles from "./promote-card.module.css";

const PROMOTION_VIDEO = "/vdo/venue.mp4";
const preventContextMenu: EventListener = (event) => event.preventDefault();

export default function PromoteCard() {
  const [isPlaying, setIsPlaying] = useState(true);

  useWindowListener("contextmenu", preventContextMenu);

  return (
    <section className={styles.card} aria-labelledby="promote-card-title">
      <div className={styles.videoContainer}>
        <VideoPlayer vdoSrc={PROMOTION_VIDEO} isPlaying={isPlaying} />
      </div>

      <div className={styles.content}>
        <h2 id="promote-card-title">Book your venue today.</h2>
        <button
          type="button"
          className={styles.button}
          onClick={() => setIsPlaying((playing) => !playing)}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}
