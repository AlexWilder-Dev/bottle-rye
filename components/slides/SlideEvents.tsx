"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animation";

const UPCOMING = [
  {
    title: "Supper Club: Late Summer",
    date: "Sat 12 April",
    desc: "A six-course menu from Sam Finnie. Seasonal, charcoal-led, foraged.",
    spots: "A few spots left",
  },
  {
    title: "Natural Wine Tasting",
    date: "Wed 16 April",
    desc: "An informal evening with three producers from the Loire Valley.",
    spots: "Open",
  },
  {
    title: "Sunday Sessions",
    date: "Every Sunday",
    desc: "Long lunches, good wine, nowhere to be. From 2pm.",
    spots: "Walk-ins welcome",
  },
];

export default function SlideEvents() {
  return (
    <div className="relative w-full h-full bg-charcoal flex flex-col overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=1200&q=60&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "luminosity",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 pt-20 md:pt-20 pb-8 overflow-y-auto">

        {/* Happy Hour */}
        <motion.div
          className="mb-8 md:mb-14"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p className="font-chalk text-ochre text-lg mb-3" variants={fadeUp}>
            Every week
          </motion.p>
          <motion.h2
            className="font-display text-cream leading-none mb-3"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
            variants={fadeUp}
          >
            Happy Hour
          </motion.h2>
          <motion.p
            className="font-body text-[10px] tracking-[0.2em] uppercase text-smoke mb-4"
            variants={fadeUp}
          >
            Tuesday – Saturday&nbsp;&nbsp;·&nbsp;&nbsp;5pm – 6:30pm
          </motion.p>
          <motion.div
            className="flex gap-6 md:gap-8 font-display text-bone"
            style={{ fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
            variants={fadeUp}
          >
            <span><strong className="text-ochre">£8</strong> cocktails</span>
            <span><strong className="text-ochre">£5</strong> wine &amp; beer</span>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-bone/10 mb-8 md:mb-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        />

        {/* Events — stack on mobile, grid on desktop */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p
            className="font-body text-[10px] tracking-[0.2em] uppercase text-smoke mb-6"
            variants={fadeUp}
          >
            Coming up
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {UPCOMING.map((event) => (
              <motion.div key={event.title} variants={fadeUp}>
                <p className="font-body text-[10px] tracking-[0.15em] uppercase text-ochre mb-2">
                  {event.date}
                </p>
                <h3 className="font-display text-cream text-lg md:text-xl leading-snug mb-2">
                  {event.title}
                </h3>
                <p className="font-body text-smoke text-sm leading-relaxed mb-3">
                  {event.desc}
                </p>
                <p className="font-body text-[11px] tracking-wide text-bone/40">
                  {event.spots}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Private hire */}
        <motion.div
          className="mt-auto pt-8 md:pt-10 border-t border-bone/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="font-display italic text-smoke text-base md:text-lg">
            Want the whole place?&nbsp;&nbsp;
            <a
              href="mailto:hello@bottleandrye.com"
              className="text-bone hover:text-cream transition-colors duration-300 not-italic"
            >
              Ask about private hire →
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
