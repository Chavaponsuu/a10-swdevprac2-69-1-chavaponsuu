"use client";

import React, { useState } from "react";

export default function InteractiveCard({ children }: { children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`rounded-lg ${
        isHovered ? "shadow-2xl bg-[var(--color-primary-light)]" : "shadow-lg bg-[var(--color-surface)]"
        }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      {children}
    </div>
  );
}
