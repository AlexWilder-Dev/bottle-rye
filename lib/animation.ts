import type { Variants } from "framer-motion";

// Custom cubic bezier — typed as const tuple so Framer Motion accepts it
export const EASE_WINE = [0.25, 0.1, 0.25, 1] as const;
export const EASE_POUR = [0.4, 0, 0.2, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_WINE },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};
