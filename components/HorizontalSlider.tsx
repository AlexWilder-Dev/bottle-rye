"use client";

import {
  useRef,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface HorizontalSliderProps {
  slides: ReactNode[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
}

const SLIDE_SPRING = { type: "spring" as const, stiffness: 110, damping: 20, mass: 0.85 };
const COOLDOWN_MS = 580;
const SWIPE_THRESHOLD = 50;
const DELTA_THRESHOLD = 30;

export default function HorizontalSlider({
  slides,
  currentSlide,
  onSlideChange,
}: HorizontalSliderProps) {
  const x = useMotionValue(0);
  const isAnimating = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const slideTo = useCallback(
    (index: number) => {
      if (isAnimating.current) return;
      const target = Math.max(0, Math.min(index, slides.length - 1));
      if (target === currentSlide) return;

      isAnimating.current = true;
      onSlideChange(target);

      animate(x, -target * window.innerWidth, {
        ...SLIDE_SPRING,
        onComplete: () => {
          setTimeout(() => {
            isAnimating.current = false;
          }, 100);
        },
      });
    },
    [currentSlide, slides.length, onSlideChange, x]
  );

  const next = useCallback(
    () => slideTo(currentSlide + 1),
    [currentSlide, slideTo]
  );
  const prev = useCallback(
    () => slideTo(currentSlide - 1),
    [currentSlide, slideTo]
  );

  // Scroll / wheel hijacking
  useEffect(() => {
    let cooldown = false;

    const handleWheel = (e: WheelEvent) => {
      if (document.body.dataset.overlayOpen) return;
      e.preventDefault();
      if (cooldown || isAnimating.current) return;

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

      if (delta > DELTA_THRESHOLD) {
        cooldown = true;
        next();
        setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
      } else if (delta < -DELTA_THRESHOLD) {
        cooldown = true;
        prev();
        setTimeout(() => { cooldown = false; }, COOLDOWN_MS);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [next, prev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (document.body.dataset.overlayOpen) return;
      if (["ArrowRight", "ArrowDown"].includes(e.key)) next();
      if (["ArrowLeft", "ArrowUp"].includes(e.key)) prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  // Touch swipe
  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (document.body.dataset.overlayOpen) return;
      touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (document.body.dataset.overlayOpen) return;
      if (touchStartX.current === null) return;
      const delta = touchStartX.current - e.changedTouches[0].clientX;
      if (delta > SWIPE_THRESHOLD) next();
      else if (delta < -SWIPE_THRESHOLD) prev();
      touchStartX.current = null;
    };
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [next, prev]);

  // Sync on external navigation (e.g. clicking nav links)
  useEffect(() => {
    if (isAnimating.current) return;
    animate(x, -currentSlide * window.innerWidth, SLIDE_SPRING);
  }, [currentSlide, x]);

  // Handle window resize
  useEffect(() => {
    const onResize = () => {
      x.set(-currentSlide * window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [currentSlide, x]);

  return (
    <div className="fixed inset-0 overflow-hidden" aria-label="Site sections">
      <motion.div
        className="flex h-full will-change-transform"
        style={{ x, width: `${slides.length * 100}vw` }}
      >
        {slides.map((slide, i) => (
          <section
            key={i}
            className="relative flex-shrink-0 h-full overflow-hidden"
            style={{ width: "100vw" }}
            aria-hidden={i !== currentSlide}
            tabIndex={i === currentSlide ? 0 : -1}
          >
            {slide}
          </section>
        ))}
      </motion.div>
    </div>
  );
}
