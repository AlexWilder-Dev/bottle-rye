"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animation";

interface SlideResidenciesProps {
  onViewMenu: () => void;
}

export default function SlideResidencies({ onViewMenu }: SlideResidenciesProps) {
  return (
    <div className="relative w-full h-full bg-bone flex flex-col md:flex-row overflow-hidden">

      {/* Mobile: full-bleed photo top half */}
      <div className="md:hidden relative w-full h-[45%] overflow-hidden flex-shrink-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=85&auto=format&fit=crop')",
          }}
          role="img"
          aria-label="Clangour Café signature dish"
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: "linear-gradient(to top, #F5F0E8, transparent)" }}
          aria-hidden="true"
        />
      </div>

      {/* Left — editorial text */}
      <div className="relative z-10 w-full md:w-[55%] flex flex-col justify-center px-8 md:px-16 py-8 md:py-20 flex-1">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="max-w-md"
        >
          <motion.p
            className="font-chalk text-burgundy text-base md:text-lg mb-4 md:mb-6"
            variants={fadeUp}
          >
            Now Serving
          </motion.p>

          <motion.h2
            className="font-display text-charcoal leading-none mb-2 md:mb-3"
            style={{ fontSize: "clamp(2.4rem, 6vw, 5.5rem)" }}
            variants={fadeUp}
          >
            Clangour
            <br />
            Café
          </motion.h2>

          <motion.p
            className="font-display italic text-smoke mb-5 md:mb-8"
            style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}
            variants={fadeUp}
          >
            Sam Finnie
          </motion.p>

          <motion.p
            className="font-body text-charcoal/80 text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-xs"
            variants={fadeUp}
          >
            Charcoal-led cooking, foraged ingredients, fine-dining instincts.
            Grown in Brixton, rooted in technique.
          </motion.p>

          <motion.p
            className="font-body text-[10px] tracking-[0.15em] uppercase text-smoke mb-6 md:mb-10"
            variants={fadeUp}
          >
            Formerly: Gastrologist&nbsp;·&nbsp;Da Terra
          </motion.p>

          <motion.button
            className="font-body text-[11px] tracking-[0.2em] uppercase text-burgundy flex items-center gap-2 group hover:gap-3 transition-all duration-300"
            variants={fadeUp}
            onClick={onViewMenu}
          >
            View Current Menu
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Desktop: right photo panel */}
      <div className="hidden md:block absolute right-0 top-0 w-[48%] h-full overflow-hidden">
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=85&auto=format&fit=crop')",
            }}
            role="img"
            aria-label="Clangour Café signature dish"
          />
        </motion.div>
        <div
          className="absolute inset-y-0 left-0 w-16"
          style={{ background: "linear-gradient(to right, #F5F0E8, transparent)" }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
