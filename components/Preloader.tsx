"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = "BOTTLE + RYE".split("");

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"drawing" | "holding" | "exit">("drawing");
  // Store callback in a ref so the effect never re-runs due to a new function reference
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Run once on mount only — ref keeps the callback current without it being a dep
    const holdTimer = setTimeout(() => setPhase("holding"), 1400);
    const exitTimer = setTimeout(() => setPhase("exit"), 2400);
    const doneTimer = setTimeout(() => onCompleteRef.current(), 3100);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-charcoal"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Animated wordmark */}
          <div
            className="flex items-baseline overflow-hidden select-none"
            aria-label="Bottle + Rye"
            role="img"
          >
            {LETTERS.map((char, i) => (
              <motion.span
                key={i}
                className={`font-display text-bone ${
                  char === "+" ? "mx-3 text-ochre" : ""
                } ${char === " " ? "mx-1" : ""}`}
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
                  letterSpacing: "0.18em",
                  fontWeight: 300,
                  display: "inline-block",
                }}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.5,
                  delay: char === " " ? 0 : i * 0.055,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              />
            ))}
          </div>

          {/* Thin ochre rule that draws left to right */}
          <motion.div
            className="mt-5 h-px bg-ochre/60"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ width: "clamp(120px, 20vw, 240px)", transformOrigin: "left" }}
          />

          {/* Tagline */}
          <motion.p
            className="mt-4 font-body text-[10px] tracking-[0.3em] uppercase text-smoke/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            Natural wine bar · Brixton Village
          </motion.p>

          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-ochre/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 2.2, delay: 0.1, ease: "linear" }}
            style={{ width: "100%", transformOrigin: "left" }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
