"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DrinksOverlay from "@/components/DrinksOverlay";

type Tab = "food" | "drinks" | "happyHour";

const TABS: { id: Tab; label: string }[] = [
  { id: "food", label: "Food" },
  { id: "drinks", label: "Drinks" },
  { id: "happyHour", label: "Happy Hour" },
];

const FOOD_DATA = [
  {
    section: "Small Plates",
    items: [
      { name: "Charred leeks, smoked cream, hazelnut", price: "£9", dietary: ["v"] },
      { name: "Confit duck, pickled damson, chicory", price: "£13" },
      { name: "Foraged mushroom on toasted rye", price: "£10", dietary: ["vg"] },
      { name: "Burrata, heritage tomato, basil oil", price: "£11", dietary: ["v"] },
    ],
  },
  {
    section: "Larger",
    items: [
      { name: "Charcoal lamb, white bean, salsa verde", price: "£22" },
      { name: "Whole plaice, brown butter, capers", price: "£24" },
      { name: "Celeriac steak, walnut cream", price: "£18", dietary: ["vg"] },
    ],
  },
];

// Drinks shown as a magazine preview — the real PDF has the full list
const DRINKS_PREVIEW = [
  {
    section: "Natural Wine — Glass",
    items: [
      { name: "Domaine Mosse, Anjou Blanc", sub: "Loire · Chenin Blanc · 2022", price: "£11" },
      { name: "Gut Oggau, Timotheus", sub: "Burgenland · Blaufränkisch · 2021", price: "£13" },
      { name: "La Garagista, Ci Confonde", sub: "Vermont · Pet Nat · NV", price: "£12" },
      { name: "Cantina Giardino, Paski", sub: "Campania · Fiano · 2020", price: "£11" },
    ],
  },
  {
    section: "Cocktails",
    items: [
      { name: "Brixton Sour", sub: "Rum · lime · velvet falernum", price: "£12" },
      { name: "Bitter & Twisted", sub: "Campari · sweet vermouth · orange", price: "£10" },
      { name: "Smoked Negroni", sub: "Mezcal · Cynar · sweet vermouth", price: "£13" },
    ],
  },
];

const HAPPY_HOUR = [
  { name: "House wine & beer", sub: "Rotating natural selection", price: "£5" },
  { name: "Cocktails", sub: "Full cocktail menu", price: "£8" },
  { name: "Any two small plates", sub: "", price: "£14" },
];

function FoodItem({ name, price, dietary }: { name: string; price: string; dietary?: string[] }) {
  return (
    <div className="flex items-baseline gap-2 py-2.5 border-b border-charcoal/8">
      <span className="font-display text-charcoal text-base leading-snug flex-1">{name}</span>
      {dietary && (
        <span className="font-body text-[10px] text-smoke/50 flex-shrink-0">({dietary.join(", ")})</span>
      )}
      <span className="leader-dots flex-shrink-0 w-8" aria-hidden="true" />
      <span className="font-body text-charcoal text-sm font-medium flex-shrink-0">{price}</span>
    </div>
  );
}

function DrinkItem({ name, sub, price }: { name: string; sub: string; price: string }) {
  return (
    <div className="py-2.5 border-b border-charcoal/8">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-charcoal text-base leading-snug flex-1">{name}</span>
        <span className="leader-dots flex-shrink-0 w-6" aria-hidden="true" />
        <span className="font-body text-charcoal text-sm font-medium flex-shrink-0">{price}</span>
      </div>
      {sub && <p className="font-body text-smoke text-[12px] mt-0.5">{sub}</p>}
    </div>
  );
}

export default function SlideMenus() {
  const [activeTab, setActiveTab] = useState<Tab>("food");
  const [drinksOpen, setDrinksOpen] = useState(false);

  return (
    <div className="relative w-full h-full bg-bone flex flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex-shrink-0 pt-20 md:pt-24 pb-6 px-6 md:px-8">
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-6 md:gap-10">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`relative font-body text-[10px] md:text-[11px] tracking-[0.15em] md:tracking-[0.2em] uppercase pb-2 transition-colors duration-300 ${
              activeTab === id ? "text-charcoal" : "text-smoke hover:text-charcoal/70"
            }`}
          >
            {label}
            {activeTab === id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-px bg-burgundy"
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
              />
            )}
          </button>
        ))}
      </div>
      </div>

      {/* Menu content */}
      <div className="flex-1 overflow-y-auto px-6 md:px-8 pb-16">
        <AnimatePresence mode="wait">
          {activeTab === "food" && (
            <motion.div
              key="food"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl mx-auto"
            >
              {/* Two-column on desktop */}
              <div className="md:grid md:grid-cols-2 md:gap-x-12">
                {FOOD_DATA.map(({ section, items }) => (
                  <div key={section} className="mb-8">
                    <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-smoke mb-3 mt-2">
                      {section}
                    </h3>
                    {items.map((item) => (
                      <FoodItem key={item.name} {...item} />
                    ))}
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] text-smoke/60 text-center mt-2">
                (v) vegetarian&nbsp;&nbsp;(vg) vegan&nbsp;&nbsp;Please inform us of any allergies.
              </p>
            </motion.div>
          )}

          {activeTab === "drinks" && (
            <motion.div
              key="drinks"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl mx-auto"
            >
              {/* Two-column preview on desktop */}
              <div className="md:grid md:grid-cols-2 md:gap-x-12">
                {DRINKS_PREVIEW.map(({ section, items }) => (
                  <div key={section} className="mb-8">
                    <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-smoke mb-3 mt-2">
                      {section}
                    </h3>
                    {items.map((item) => (
                      <DrinkItem key={item.name} {...item} />
                    ))}
                  </div>
                ))}
              </div>

              {/* Full list CTA */}
              <div className="mt-2 pt-6 border-t border-charcoal/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="font-display italic text-charcoal text-base leading-snug">
                    The full drinks list is a larger affair.
                  </p>
                  <p className="font-body text-smoke text-sm mt-1">
                    60+ natural wines, pet nats, biodynamic selections, spirits &amp; more.
                  </p>
                </div>
                <button
                  onClick={() => setDrinksOpen(true)}
                  className="flex-shrink-0 font-body text-[11px] tracking-[0.2em] uppercase text-cream bg-burgundy px-6 py-3 hover:bg-charcoal group flex items-center gap-2"
                  style={{ transition: "background-color 0.35s ease" }}
                >
                  View Full List
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "happyHour" && (
            <motion.div
              key="happyHour"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-3 mt-2">
                <h3 className="font-body text-[10px] tracking-[0.25em] uppercase text-smoke mb-1">
                  Every Tue – Sat
                </h3>
                <p className="font-display italic text-burgundy text-xl">5pm – 6:30pm</p>
              </div>
              {HAPPY_HOUR.map((item) => (
                <DrinkItem key={item.name} {...item} />
              ))}
              <p className="font-display italic text-smoke/60 text-sm mt-6">
                Walk-ins always welcome during happy hour.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DrinksOverlay open={drinksOpen} onClose={() => setDrinksOpen(false)} />

      {/* Footer CTA */}
      <div className="flex-shrink-0 px-8 py-5 border-t border-charcoal/8 text-center">
        <p className="font-display italic text-charcoal/60 text-base">
          Ready to taste?&nbsp;&nbsp;
          <a
            href="https://sevenrooms.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-burgundy hover:text-charcoal transition-colors duration-300 not-italic"
          >
            Book a table →
          </a>
        </p>
      </div>
    </div>
  );
}
