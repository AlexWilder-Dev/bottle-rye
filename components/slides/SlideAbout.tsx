"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animation";

export default function SlideAbout() {
  return (
    <div className="relative w-full h-full bg-charcoal flex items-center justify-center overflow-hidden">
      {/* Faint paper texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto px-8 md:px-12 text-center"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
      >
        <motion.h2
          className="font-display italic text-cream leading-tight mb-6 md:mb-8"
          style={{ fontSize: "clamp(1.9rem, 5vw, 4.5rem)" }}
          variants={fadeUp}
        >
          &ldquo;A neighbourhood place,
          <br />
          for neighbours.&rdquo;
        </motion.h2>

        <motion.div className="w-16 h-px bg-ochre mx-auto mb-6 md:mb-8" variants={fadeUp} />

        <motion.p
          className="font-body text-smoke text-sm md:text-base leading-relaxed mb-8 md:mb-10"
          variants={fadeUp}
        >
          Born from a love of natural wine and the conviction that good food
          should feel effortless. We opened our doors in Brixton Village because
          here, more than anywhere, the neighbourhood is the point.
        </motion.p>

        <motion.p
          className="font-body text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-bone/50"
          variants={fadeUp}
        >
          Natural wine
          <span className="text-ochre mx-2">·</span>
          Charcoal &amp; flame
          <span className="text-ochre mx-2">·</span>
          <span className="hidden sm:inline">Parisian ease
          <span className="text-ochre mx-2">·</span>
          </span>
          Brixton&#8209;rooted
        </motion.p>
      </motion.div>
    </div>
  );
}
