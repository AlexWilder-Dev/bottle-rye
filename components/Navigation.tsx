"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "About", slide: 1 },
  { label: "Residencies", slide: 2 },
  { label: "Menus", slide: 3 },
  { label: "Events", slide: 4 },
  { label: "Visit", slide: 5 },
];

const TOTAL_SLIDES = 7;

interface NavigationProps {
  currentSlide: number;
  onNavigate: (slide: number) => void;
  theme?: "light" | "dark";
}

export default function Navigation({
  currentSlide,
  onNavigate,
  theme = "light",
}: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLight = theme === "light";
  const baseColor = isLight ? "text-bone" : "text-charcoal";
  const dimColor = isLight ? "text-bone/50" : "text-charcoal/40";
  const hoverColor = isLight ? "hover:text-cream" : "hover:text-charcoal";

  const handleNavigate = (slide: number) => {
    onNavigate(slide);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Gradient scrim — sibling to nav, avoids stacking context conflict */}
      <motion.div
        className="fixed top-0 left-0 right-0 pointer-events-none"
        style={{
          zIndex: 49,
          height: "140px",
          background: "linear-gradient(to bottom, rgba(245,240,232,0.92) 0%, transparent 100%)",
        }}
        animate={{ opacity: isLight ? 0 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 ${baseColor}`}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <button
          onClick={() => handleNavigate(0)}
          className="relative flex-shrink-0 focus-visible:ring-1 focus-visible:ring-ochre rounded-sm"
          aria-label="Bottle + Rye — return to start"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo.png`}
            alt="Bottle + Rye"
            width={140}
            height={20}
            priority
            className="h-4 md:h-5 w-auto"
            style={{ filter: isLight ? "invert(1)" : "none" }}
          />
        </button>

        {/* Centre links — hidden on mobile */}
        <ul className="hidden md:flex items-center gap-7 lg:gap-10" role="list">
          {NAV_LINKS.map(({ label, slide }) => {
            const isActive = currentSlide === slide;
            return (
              <li key={label}>
                <button
                  onClick={() => handleNavigate(slide)}
                  className={`
                    relative font-body text-[10px] tracking-[0.18em] uppercase
                    transition-colors duration-300
                    ${isActive ? baseColor : `${dimColor}`}
                    ${hoverColor} hover:opacity-100
                    focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre rounded-sm
                  `}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-current"
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right side: counter (desktop) + hamburger (mobile) */}
        <div className="flex items-center gap-4">
          {/* Editorial slide counter */}
          <div
            className={`flex items-baseline gap-1.5 tabular-nums ${dimColor}`}
            aria-label={`Slide ${currentSlide + 1} of ${TOTAL_SLIDES}`}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={currentSlide}
                className={`font-display text-sm leading-none ${baseColor}`}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {String(currentSlide + 1).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
            <span className="font-body text-[10px] tracking-wider">/</span>
            <span className="font-body text-[10px]">
              {String(TOTAL_SLIDES).padStart(2, "0")}
            </span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`md:hidden flex flex-col gap-1.5 p-1 focus-visible:ring-1 focus-visible:ring-ochre rounded-sm ${baseColor}`}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <motion.span
              className="block w-5 h-px bg-current"
              animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block w-5 h-px bg-current"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-current"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-8" role="list">
                {[{ label: "Home", slide: 0 }, ...NAV_LINKS, { label: "Newsletter", slide: 6 }].map(
                  ({ label, slide }, i) => (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <button
                        onClick={() => handleNavigate(slide)}
                        className={`font-display text-bone leading-none transition-colors duration-200 hover:text-ochre ${
                          currentSlide === slide ? "text-ochre" : ""
                        }`}
                        style={{ fontSize: "clamp(1.6rem, 7vw, 2.4rem)" }}
                        aria-current={currentSlide === slide ? "page" : undefined}
                      >
                        {label}
                      </button>
                    </motion.li>
                  )
                )}
              </ul>
            </nav>

            <motion.div
              className="absolute bottom-10 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-bone/40">
                Brixton Village · London SW9
              </p>
              <div className="w-8 h-px bg-ochre/50" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
