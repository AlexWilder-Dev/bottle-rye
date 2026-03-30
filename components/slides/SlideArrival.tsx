"use client";

import { motion } from "framer-motion";
import { EASE_WINE } from "@/lib/animation";
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE_WINE, delay },
  }),
};

export default function SlideArrival({ onBook }: { onBook: () => void }) {
  return (
    <div className="relative w-full h-full bg-charcoal overflow-hidden flex">

      {/* ── LEFT — main photo (full height) ── */}
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: EASE_WINE, delay: 0.1 }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=1800&q=85&auto=format&fit=crop')" }}
            role="img"
            aria-label="Bottle + Rye wine bar interior"
          />
        </motion.div>

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 55% 50%, transparent 25%, rgba(13,11,9,0.55) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bottom gradient for text */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to top, rgba(13,11,9,0.7), transparent)" }}
          aria-hidden="true"
        />

        {/* Mobile: centred headline over photo */}
        <div className="md:hidden absolute inset-0 flex flex-col items-center justify-end pb-28 px-8 text-center">
          <motion.h1
            className="font-display italic text-cream mb-4 leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 3rem)" }}
            variants={fadeUp}
            custom={0.5}
            initial="hidden"
            animate="visible"
          >
            A little corner
            <br />of Brixton
          </motion.h1>
          <motion.p
            className="font-body text-[11px] tracking-[0.2em] uppercase text-bone/70 mb-8"
            variants={fadeUp}
            custom={0.75}
            initial="hidden"
            animate="visible"
          >
            Natural wine · Brixton Village
          </motion.p>
          <motion.button
            className="font-body text-[11px] tracking-[0.2em] uppercase text-cream border border-cream/40 px-8 py-3 hover:bg-cream/10 transition-colors duration-300"
            variants={fadeUp}
            custom={0.95}
            initial="hidden"
            animate="visible"
            onClick={onBook}
          >
            Book a Table
          </motion.button>
        </div>

        {/* Desktop: bottom-left location tag */}
        <motion.p
          className="hidden md:block absolute bottom-8 left-10 font-body text-[11px] tracking-[0.2em] uppercase text-bone/60"
          variants={fadeUp}
          custom={1.0}
          initial="hidden"
          animate="visible"
        >
          Natural wine bar&nbsp;&nbsp;·&nbsp;&nbsp;Brixton Village
        </motion.p>
      </div>

      {/* ── RIGHT — editorial text panel (desktop only) ── */}
      <motion.div
        className="hidden md:flex flex-col justify-center relative z-10 flex-shrink-0 px-14 py-20"
        style={{ width: "clamp(280px, 28vw, 400px)", background: "rgba(13,11,9,0.92)" }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: EASE_WINE, delay: 0.35 }}
      >
        {/* Thin ochre rule */}
        <motion.div
          className="w-8 h-px bg-ochre mb-10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          style={{ transformOrigin: "left" }}
          transition={{ duration: 0.7, ease: EASE_WINE, delay: 0.9 }}
        />

        <motion.h1
          className="font-display italic text-cream leading-tight mb-8"
          style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.6rem)" }}
          variants={fadeUp}
          custom={0.55}
          initial="hidden"
          animate="visible"
        >
          A little corner<br />of Brixton
        </motion.h1>

        <motion.p
          className="font-body text-smoke text-sm leading-relaxed mb-12"
          variants={fadeUp}
          custom={0.75}
          initial="hidden"
          animate="visible"
        >
          Natural wine, charcoal cooking,
          and the kind of evening you
          didn&apos;t know you needed.
        </motion.p>

        <motion.button
          className="font-body text-[11px] tracking-[0.2em] uppercase text-cream border border-cream/30 px-7 py-3.5 hover:border-ochre hover:text-ochre transition-colors duration-400 self-start group flex items-center gap-3"
          style={{ transition: "color 0.35s ease, border-color 0.35s ease" }}
          variants={fadeUp}
          custom={0.95}
          initial="hidden"
          animate="visible"
          onClick={onBook}
          aria-label="Book a table at Bottle + Rye"
        >
          Book a Table
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
        </motion.button>

        {/* Venue detail */}
        <motion.div
          className="mt-auto pt-10 border-t border-bone/10"
          variants={fadeUp}
          custom={1.1}
          initial="hidden"
          animate="visible"
        >
          <p className="font-body text-[10px] tracking-[0.18em] uppercase text-smoke/50 mb-1">
            Brixton Village · SW9
          </p>
          <p className="font-body text-[10px] tracking-[0.18em] uppercase text-smoke/50">
            Tue–Sun from 4pm
          </p>
        </motion.div>
      </motion.div>

      {/* Horizontal nav hint — bottom of photo, desktop */}
      <motion.div
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center gap-2 z-20"
        style={{ left: "35%" }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: EASE_WINE }}
        aria-label="7 sections to explore"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={i}
            className="h-px bg-bone/40 rounded-full"
            style={{ width: i === 0 ? 24 : 12 }}
            animate={i === 0 ? { opacity: [0.6, 1, 0.6] } : {}}
            transition={i === 0 ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
          />
        ))}
        <span className="font-body text-[9px] tracking-[0.2em] uppercase text-bone/35 ml-1">
          scroll or swipe
        </span>
      </motion.div>

      {/* Mobile scroll hint */}
      <motion.div
        className="md:hidden absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.9, ease: EASE_WINE }}
        aria-hidden="true"
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-bone/40 rounded-full"
            style={{ width: i === 0 ? 20 : 10 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
