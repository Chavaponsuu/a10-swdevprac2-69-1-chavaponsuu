"use client";

import { useEffect, useRef } from "react";

export default function useWindowListener(
  eventType: string,
  listener: EventListener,
) {
  const initialEventType = useRef(eventType);
  const initialListener = useRef(listener);

  useEffect(() => {
    const registeredEventType = initialEventType.current;
    const registeredListener = initialListener.current;

    window.addEventListener(registeredEventType, registeredListener);

    return () => window.removeEventListener(registeredEventType, registeredListener);
  }, []);
}
