"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

const WINE_LIST = [
  {
    category: "White",
    items: [
      { name: "Domaine Mosse, Anjou Blanc", origin: "Loire, France · Chenin Blanc · 2022", price: "£11 / £42" },
      { name: "Cantina Giardino, Paski", origin: "Campania, Italy · Fiano · 2020", price: "£11 / £40" },
      { name: "Matassa, Blanc", origin: "Roussillon, France · Macabeu · 2021", price: "£12 / £46" },
      { name: "Gut Oggau, Winifred", origin: "Burgenland, Austria · Welschriesling · 2022", price: "£13 / £50" },
      { name: "Hiyu Wine Farm, Coconut Milk", origin: "Oregon, USA · Field Blend · 2020", price: "£15 / £58" },
    ],
  },
  {
    category: "Orange",
    items: [
      { name: "Pheasant's Tears, Rkatsiteli", origin: "Kakheti, Georgia · Amber · 2021", price: "£12 / £46" },
      { name: "Kabaj, Rebula", origin: "Goriška Brda, Slovenia · 2019", price: "£13 / £50" },
      { name: "Elisabetta Foradori, Fontanasanta Nosiola", origin: "Trentino, Italy · 2020", price: "£14 / £54" },
      { name: "Radikon, Oslavje", origin: "Collio, Italy · Field Blend · 2016", price: "£18 / £70" },
    ],
  },
  {
    category: "Red",
    items: [
      { name: "Gut Oggau, Timotheus", origin: "Burgenland, Austria · Blaufränkisch · 2021", price: "£13 / £50" },
      { name: "Cornelissen, Contadino", origin: "Sicily, Italy · Nerello Mascalese · 2022", price: "£12 / £46" },
      { name: "Bichi, No Sapiens", origin: "Baja California, Mexico · Tempranillo · 2020", price: "£14 / £54" },
      { name: "Denavolo, Catavela", origin: "Emilia-Romagna, Italy · Malvasia · 2021", price: "£11 / £42" },
      { name: "Jauma, Bom", origin: "McLaren Vale, Australia · Grenache · 2021", price: "£13 / £50" },
      { name: "Comando G, Rumbo al Norte", origin: "Sierra de Gredos, Spain · Garnacha · 2021", price: "£16 / £62" },
    ],
  },
  {
    category: "Sparkling & Pet Nat",
    items: [
      { name: "La Garagista, Ci Confonde", origin: "Vermont, USA · Pet Nat · NV", price: "£12 / £46" },
      { name: "Cruse Wine, Tradition", origin: "California, USA · Sparkling · NV", price: "£11 / £42" },
      { name: "Pét Sec, Pét Sec", origin: "Loire, France · Melon de Bourgogne · NV", price: "£10 / £38" },
      { name: "Gut Oggau, Willi", origin: "Burgenland, Austria · Pét Nat · NV", price: "£13 / £50" },
    ],
  },
  {
    category: "Cocktails",
    items: [
      { name: "Brixton Sour", origin: "Rum · lime · velvet falernum · egg white", price: "£12" },
      { name: "Bitter & Twisted", origin: "Campari · sweet vermouth · orange", price: "£10" },
      { name: "Smoked Negroni", origin: "Mezcal · Cynar · sweet vermouth", price: "£13" },
      { name: "Village Spritz", origin: "Aperol · natural white · soda · orange", price: "£10" },
      { name: "Cold Brew Old Fashioned", origin: "Bourbon · cold brew · demerara · mole bitters", price: "£13" },
    ],
  },
  {
    category: "Beer, Cider & Soft",
    items: [
      { name: "Kernel, Table Beer", origin: "Bermondsey, London", price: "£5" },
      { name: "Orbit, Ivo Lager", origin: "Walworth, London", price: "£5.5" },
      { name: "Hawkes, Urban Orchard Cider", origin: "London Bridge, London", price: "£5.5" },
      { name: "Cawston Press, Sparkling Elderflower", origin: "Soft", price: "£3.5" },
      { name: "House-made shrub soda", origin: "Changes weekly", price: "£4" },
    ],
  },
];

interface DrinksOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function DrinksOverlay({ open, onClose }: DrinksOverlayProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchMovedRef = useRef(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Pause horizontal slider
  useEffect(() => {
    if (open) {
      document.body.dataset.overlayOpen = "true";
    } else {
      delete document.body.dataset.overlayOpen;
    }
    return () => { delete document.body.dataset.overlayOpen; };
  }, [open]);


  // Escape key to close
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Reset scroll on open
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="drinks-overlay"
          className="fixed inset-0 z-[150] bg-charcoal flex flex-col cursor-pointer"
          onClick={() => { if (!touchMovedRef.current) onClose(); }}
          initial={{ opacity: 0, y: "4%" }}
          animate={{ opacity: 1, y: "0%" }}
          exit={{ opacity: 0, y: "3%" }}
          transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label="Full drinks list"
        >
          {/* ✕ top-right */}
          <button
            className="absolute top-6 right-6 md:top-8 md:right-8 z-10 w-10 h-10 flex items-center justify-center text-bone/50 hover:text-bone transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ochre"
            aria-label="Close drinks list"
          >
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Scrollable list */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 md:px-14 pt-16 pb-20"
            style={{ scrollbarWidth: "none" }}
            onTouchStart={() => { touchMovedRef.current = false; }}
            onTouchMove={() => { touchMovedRef.current = true; }}
          >
            <div className="max-w-5xl mx-auto md:columns-2 md:gap-x-16">
              {WINE_LIST.map(({ category, items }) => (
                <div key={category} className="break-inside-avoid mb-10">

                  {/* Category header — rule through text */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex-1 h-px" style={{ background: "rgba(212,168,87,0.25)" }} />
                    <h3 className="font-body text-[10px] tracking-[0.3em] uppercase text-ochre flex-shrink-0">
                      {category}
                    </h3>
                    <div className="flex-1 h-px" style={{ background: "rgba(212,168,87,0.25)" }} />
                  </div>

                  {items.map(({ name, origin, price }) => (
                    <div key={name} className="py-3 border-b border-bone/8 flex gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-cream text-base leading-snug">{name}</p>
                        <p className="font-body text-bone/45 text-[12px] mt-0.5 leading-snug">{origin}</p>
                      </div>
                      <p className="font-body text-bone/70 text-sm flex-shrink-0 pt-0.5 tabular-nums">
                        {price}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="max-w-5xl mx-auto mt-4 pt-6 border-t border-bone/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-8">
              <p className="font-display italic text-bone/40 text-sm">
                Ask your server — we always have something unlisted.
              </p>
              <p className="font-body text-[10px] tracking-[0.15em] uppercase text-bone/30">
                Prices: glass / bottle where applicable
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
