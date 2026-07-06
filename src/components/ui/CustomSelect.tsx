"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "-- Select --",
  error,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-5 py-4 rounded-2xl border text-base text-left transition-all flex justify-between items-center bg-[#FAFAFA] cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
          error ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
        }`}
      >
        <span className={selectedOption ? "text-brand-navy font-medium" : "text-slate-400 font-light"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-blue" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 max-h-60 overflow-y-auto overflow-hidden divide-y divide-slate-50"
          >
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-5 py-3.5 text-left text-base flex justify-between items-center transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-brand-sky text-brand-blue font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                  }`}
                >
                  <span>{opt.label}</span>
                  {isSelected && <Check size={16} className="text-brand-teal" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
