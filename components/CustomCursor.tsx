"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isOnLight, setIsOnLight] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 500, damping: 35, mass: 0.4 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 35, mass: 0.4 });

  useEffect(() => {
    // Hide on touch devices
    if (typeof window === "undefined") return;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Detect background lightness under cursor via DOM proximity
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const isLight =
          el.closest(".bg-bone") !== null ||
          el.closest("[data-theme='light']") !== null;
        setIsOnLight(isLight);
      }
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select")
      ) {
        setIsHovering(true);
      }
    };

    const onLeave = () => setIsHovering(false);
    const onOut = () => setIsVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.documentElement.addEventListener("mouseleave", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.documentElement.removeEventListener("mouseleave", onOut);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch devices (SSR safe)
  if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) {
    return null;
  }

  const dotSize = isHovering ? 36 : 8;
  const dotColor = isOnLight ? "#1A1815" : "#F5F0E8";

  return (
    <>
      {/* Hide native cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[500] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          backgroundColor: dotColor,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Outer ring — appears on hover */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[499] rounded-full border border-current"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          color: dotColor,
          mixBlendMode: "difference",
        }}
        animate={{
          width: isHovering ? 52 : 0,
          height: isHovering ? 52 : 0,
          opacity: isHovering && isVisible ? 0.4 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
        }}
      />
    </>
  );
}
