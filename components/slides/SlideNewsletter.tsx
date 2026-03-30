"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, EASE_WINE } from "@/lib/animation";

const PROMISES = [
  "New menus when they change",
  "Special evenings before they sell out",
  "The occasional wine we can't stop thinking about",
];

export default function SlideNewsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "submitted">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setState("submitted");
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#1C1A17" }}
    >
      {/* Subtle paper texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Centred note-card layout */}
      <motion.div
        className="relative z-10 w-full max-w-lg mx-auto px-8"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {/* Chalk underline accent above heading */}
        <motion.div
          className="w-8 h-px bg-ochre mb-8 mx-auto"
          variants={fadeUp}
        />

        {/* Heading */}
        <motion.h2
          className="font-display italic text-cream text-center leading-tight mb-4"
          style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
          variants={fadeUp}
        >
          Join Our Table
        </motion.h2>

        {/* Subline */}
        <motion.p
          className="font-body text-smoke text-center text-base leading-relaxed mb-10"
          variants={fadeUp}
        >
          No noise. Just the things worth knowing.
        </motion.p>

        {/* What you get — handwritten feel */}
        <motion.ul
          className="space-y-2 mb-10"
          variants={fadeUp}
        >
          {PROMISES.map((p) => (
            <li key={p} className="flex items-start gap-3 justify-center">
              <span className="text-ochre mt-0.5 text-xs">—</span>
              <span className="font-chalk text-bone/70 text-lg">{p}</span>
            </li>
          ))}
        </motion.ul>

        {/* Form */}
        <motion.div variants={fadeUp}>
          {state === "submitted" ? (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_WINE }}
            >
              <p className="font-display italic text-cream text-xl mb-2">
                You&apos;re on the list.
              </p>
              <p className="font-body text-smoke text-sm">
                We&apos;ll be in touch — not too often.
              </p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex gap-0 border-b border-bone/20 focus-within:border-ochre/60 transition-colors duration-300"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 bg-transparent font-body text-bone text-base py-3 px-0 placeholder:text-smoke/40 focus:outline-none"
              />
              <button
                type="submit"
                className="font-body text-[11px] tracking-[0.2em] uppercase text-ochre hover:text-cream transition-colors duration-300 py-3 pl-6 whitespace-nowrap group flex items-center gap-2"
              >
                Subscribe
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </button>
            </form>
          )}
        </motion.div>

        {/* Privacy note */}
        {state === "idle" && (
          <motion.p
            className="font-body text-[10px] text-smoke/30 text-center mt-4 tracking-wide"
            variants={fadeUp}
          >
            No spam. Unsubscribe any time.
          </motion.p>
        )}
      </motion.div>

      {/* Bottom nav hint — end of journey */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-smoke/30">
          © Bottle + Rye 2024 · Brixton Village, London
        </p>
      </motion.div>
    </div>
  );
}
