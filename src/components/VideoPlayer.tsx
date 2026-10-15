"use client";

import { useEffect, useRef } from "react";
import styles from "./video-player.module.css";

type VideoPlayerProps = {
  vdoSrc: string;
  isPlaying: boolean;
};

export default function VideoPlayer({
  vdoSrc,
  isPlaying,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isPlaying) {
      const playRequest = video.play();
      if (playRequest) {
        void playRequest.catch(() => {
          // Browsers can reject playback until the visitor interacts with the page.
        });
      }
    } else {
      video.pause();
    }
  }, [isPlaying]);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      src={vdoSrc}
      muted
      playsInline
      aria-label="Venue promotion video"
    />
  );
}
