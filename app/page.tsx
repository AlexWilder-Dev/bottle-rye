"use client";

import { useState, useCallback } from "react";
import HorizontalSlider from "@/components/HorizontalSlider";
import Navigation from "@/components/Navigation";
import Preloader from "@/components/Preloader";
import SlideArrival from "@/components/slides/SlideArrival";
import SlideAbout from "@/components/slides/SlideAbout";
import SlideResidencies from "@/components/slides/SlideResidencies";
import SlideMenus from "@/components/slides/SlideMenus";
import SlideEvents from "@/components/slides/SlideEvents";
import SlideVisit from "@/components/slides/SlideVisit";
import SlideNewsletter from "@/components/slides/SlideNewsletter";

// Slides with light-coloured backgrounds — need dark nav text
const LIGHT_BG_SLIDES = new Set([2, 3, 5]);

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const goToVisit = useCallback(() => setCurrentSlide(5), []);
  const goToMenus = useCallback(() => setCurrentSlide(3), []);

  const slides = [
    <SlideArrival key="arrival" onBook={goToVisit} />,
    <SlideAbout key="about" />,
    <SlideResidencies key="residencies" onViewMenu={goToMenus} />,
    <SlideMenus key="menus" />,
    <SlideEvents key="events" />,
    <SlideVisit key="visit" />,
    <SlideNewsletter key="newsletter" />,
  ];

  return (
    <main>
      {/*
        Preloader sits above everything (z-[200]) as an overlay.
        Site content renders immediately underneath so fonts, images,
        and JS all load in parallel during the preloader animation.
        onComplete just fades the interaction lock once the preloader exits.
      */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Site is always mounted — hidden to pointer events until preloader exits */}
      <div
        aria-hidden={!preloaderDone}
        style={{ pointerEvents: preloaderDone ? "auto" : "none" }}
      >
        <Navigation
          currentSlide={currentSlide}
          onNavigate={setCurrentSlide}
          theme={LIGHT_BG_SLIDES.has(currentSlide) ? "dark" : "light"}
        />
        <HorizontalSlider
          slides={slides}
          currentSlide={currentSlide}
          onSlideChange={handleSlideChange}
        />
      </div>
    </main>
  );
}
