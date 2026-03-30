"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger } from "@/lib/animation";

const HOURS = [
  { days: "Tuesday – Thursday", time: "5pm – 11pm" },
  { days: "Friday – Saturday", time: "4pm – Midnight" },
  { days: "Sunday", time: "2pm – 10pm" },
];

const PARTY_SIZES = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"];

const TIME_SLOTS = [
  "5:00pm", "5:30pm", "6:00pm", "6:30pm",
  "7:00pm", "7:30pm", "8:00pm", "8:30pm",
  "9:00pm", "9:30pm", "10:00pm",
];

function todayString() {
  return new Date().toISOString().split("T")[0];
}

function BookingWidget() {
  const [date, setDate] = useState(todayString());
  const [partySize, setPartySize] = useState("2 guests");
  const [time, setTime] = useState("8:00pm");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <motion.div
      className="relative bg-cream/95 backdrop-blur-sm p-8 md:p-10 shadow-2xl"
      style={{ boxShadow: "0 32px 80px rgba(13,11,9,0.25)" }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
      viewport={{ once: true }}
    >
      <p className="font-body text-[10px] tracking-[0.25em] uppercase text-smoke mb-2">
        Reserve a Table
      </p>
      <h3
        className="font-display text-charcoal mb-6 md:mb-8 leading-none"
        style={{ fontSize: "clamp(1.4rem, 2.5vw, 2.2rem)" }}
      >
        Book Your Evening
      </h3>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
          <label className="block">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-smoke block mb-2">
              Date
            </span>
            <input
              type="date"
              value={date}
              min={todayString()}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-transparent border-b border-charcoal/20 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-burgundy transition-colors duration-200 cursor-pointer appearance-none"
            />
          </label>

          <label className="block">
            <span className="font-body text-[10px] tracking-[0.2em] uppercase text-smoke block mb-2">
              Guests
            </span>
            <div className="relative">
              <select
                value={partySize}
                onChange={(e) => setPartySize(e.target.value)}
                className="w-full bg-transparent border-b border-charcoal/20 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-burgundy transition-colors duration-200 cursor-pointer appearance-none pr-6"
              >
                {PARTY_SIZES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <span className="absolute right-0 bottom-2.5 text-smoke pointer-events-none text-xs">↕</span>
            </div>
          </label>
        </div>

        <label className="block mb-6 md:mb-8">
          <span className="font-body text-[10px] tracking-[0.2em] uppercase text-smoke block mb-2">
            Time
          </span>
          <div className="relative">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full bg-transparent border-b border-charcoal/20 py-2 font-body text-sm text-charcoal focus:outline-none focus:border-burgundy transition-colors duration-200 cursor-pointer appearance-none pr-6"
            >
              {TIME_SLOTS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <span className="absolute right-0 bottom-2.5 text-smoke pointer-events-none text-xs">↕</span>
          </div>
        </label>

        <button
          type="submit"
          className="w-full bg-burgundy text-cream font-body text-[11px] tracking-[0.2em] uppercase py-4 px-6 hover:bg-charcoal group flex items-center justify-center gap-3"
          style={{ transition: "background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          {submitted ? (
            <span className="font-display italic text-sm normal-case tracking-normal">
              Coming soon — we&apos;ll have you booked shortly
            </span>
          ) : (
            <>
              Check Availability
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </>
          )}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-between">
        <p className="font-body text-[10px] text-smoke/50 tracking-wide">
          Reservations powered by SevenRooms
        </p>
        <p className="font-body text-[10px] text-smoke/40">
          No card required
        </p>
      </div>
    </motion.div>
  );
}

export default function SlideVisit() {
  return (
    <div className="relative w-full h-full bg-bone overflow-hidden">

      {/* ── MOBILE LAYOUT ── */}
      <div className="md:hidden flex flex-col h-full overflow-y-auto">
        {/* Address + Hours */}
        <div className="px-8 pt-24 pb-6">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.p
              className="font-body text-[11px] tracking-[0.2em] uppercase text-smoke mb-6"
              variants={fadeUp}
            >
              Find us
            </motion.p>

            <motion.address
              className="font-display not-italic text-charcoal leading-relaxed mb-3"
              style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)" }}
              variants={fadeUp}
            >
              404–406 Market Row
              <br />
              Brixton Village
              <br />
              London SW9 8LD
            </motion.address>

            <motion.a
              href="https://maps.google.com/?q=404+Market+Row+Brixton+Village+London"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] tracking-[0.15em] uppercase text-burgundy flex items-center gap-2 mb-8 hover:gap-3 transition-all duration-300 group"
              variants={fadeUp}
            >
              Get Directions
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </motion.a>

            <motion.div className="mb-4" variants={fadeUp}>
              {HOURS.map(({ days, time }) => (
                <div key={days} className="flex items-baseline gap-4 py-2 border-b border-charcoal/8">
                  <span className="font-body text-smoke text-sm flex-1">{days}</span>
                  <span className="font-body text-charcoal text-sm flex-shrink-0">{time}</span>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="font-display italic text-smoke/60 text-sm mt-3 mb-8"
              variants={fadeUp}
            >
              Happy hour 5–6:30pm, Tue–Sat
            </motion.p>
          </motion.div>
        </div>

        {/* Booking widget — mobile */}
        <div className="px-6 pb-20">
          <BookingWidget />
        </div>
      </div>

      {/* ── DESKTOP LAYOUT ── */}
      <div className="hidden md:flex h-full w-full">
      {/* Left — address + hours */}
      <div className="relative z-10 w-[45%] flex-shrink-0 flex flex-col justify-center px-14 py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
        >
          <motion.p
            className="font-body text-[11px] tracking-[0.2em] uppercase text-smoke mb-8"
            variants={fadeUp}
          >
            Find us
          </motion.p>

          <motion.address
            className="font-display not-italic text-charcoal leading-relaxed mb-3"
            style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)" }}
            variants={fadeUp}
          >
            404–406 Market Row
            <br />
            Brixton Village
            <br />
            London SW9 8LD
          </motion.address>

          <motion.a
            href="https://maps.google.com/?q=404+Market+Row+Brixton+Village+London"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[11px] tracking-[0.15em] uppercase text-burgundy flex items-center gap-2 mb-10 hover:gap-3 transition-all duration-300 group"
            variants={fadeUp}
          >
            Get Directions
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </motion.a>

          <motion.div className="mb-4" variants={fadeUp}>
            {HOURS.map(({ days, time }) => (
              <div key={days} className="flex items-baseline gap-4 py-2 border-b border-charcoal/8">
                <span className="font-body text-smoke text-sm w-44 flex-shrink-0">{days}</span>
                <span className="font-body text-charcoal text-sm">{time}</span>
              </div>
            ))}
          </motion.div>

          <motion.p
            className="font-display italic text-smoke/60 text-base mt-3"
            variants={fadeUp}
          >
            Happy hour 5–6:30pm, Tue–Sat
          </motion.p>
        </motion.div>
      </div>

      {/* Right — photo + booking widget */}
      <div className="flex flex-1 relative overflow-hidden">
        {/* Background photo */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=85&auto=format&fit=crop')" }}
            role="img"
            aria-label="Bottle + Rye wine bar interior"
          />
          <div
            className="absolute inset-0"
            style={{ background: "rgba(13,11,9,0.35)" }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Left edge fade */}
        <div
          className="absolute inset-y-0 left-0 w-20 z-10"
          style={{ background: "linear-gradient(to right, #F5F0E8, transparent)" }}
          aria-hidden="true"
        />

        {/* Booking widget */}
        <div className="relative z-20 flex items-center justify-center w-full h-full px-12">
          <div className="w-full max-w-sm">
            <BookingWidget />
          </div>
        </div>
      </div>
      </div>{/* end desktop row */}

      {/* Footer strip */}
      <div className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-14 py-4 bg-[#EAE4D8]">
        <span className="font-body text-[10px] tracking-[0.15em] uppercase text-smoke">
          © Bottle + Rye 2024&nbsp;&nbsp;·&nbsp;&nbsp;Brixton Village
        </span>
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="https://instagram.com/bottleandrye"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] tracking-[0.15em] uppercase text-smoke hover:text-charcoal transition-colors duration-300"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@bottleandrye.com"
            className="hidden sm:block font-body text-[10px] tracking-[0.15em] uppercase text-smoke hover:text-charcoal transition-colors duration-300"
          >
            hello@bottleandrye.com
          </a>
        </div>
      </div>
    </div>
  );
}
