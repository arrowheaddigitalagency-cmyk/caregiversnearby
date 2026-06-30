"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = activeIndex === idx;

        return (
          <div
            key={idx}
            className={`border rounded-2xl transition-all duration-300 ${
              isOpen
                ? "border-brand-blue/20 bg-brand-sky/30 shadow-md"
                : "border-slate-100 bg-white hover:border-slate-200 shadow-sm"
            }`}
          >
            {/* Question Header */}
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex items-center justify-between text-left p-6 font-semibold text-brand-navy focus-visible:ring-2 focus-visible:ring-brand-blue rounded-2xl cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg leading-snug pr-4">{item.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={`p-1.5 rounded-lg shrink-0 ${
                  isOpen ? "bg-brand-blue/10 text-brand-blue" : "bg-slate-50 text-slate-400"
                }`}
              >
                <ChevronDown size={18} />
              </motion.div>
            </button>

            {/* Answer Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm sm:text-base leading-relaxed text-slate-500 border-t border-slate-100/50 pt-4">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
