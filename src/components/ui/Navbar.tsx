"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Menu, X, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE_INFO } from "@/lib/data/content";
import { openCareModal } from "@/components/ui/ActionModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check which section is in view
      const sections = ["hero", "services", "why-us", "how-it-works", "about", "faq"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Services", href: "#services" },
    { name: "Why Choose Us", href: "#why-us" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "About Us", href: "#about" },
    { name: "FAQs", href: "#faq" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-100/80 shadow-sm"
          : "bg-white/95 border-b border-slate-50"
      }`}
    >
      {/* Top micro-bar for direct contact */}
      <div className="bg-brand-navy text-slate-300 py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-emerald animate-pulse"></span>
            <span>Available 24/7 Nearby</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:+14047542651`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall size={12} />
              <span>Call Us: +1 404-754-2651</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#hero" onClick={(e) => handleNavClick(e as any, "#hero")} className="flex items-center gap-2.5 group rounded-lg p-1 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <Heart className="w-5.5 h-5.5 text-brand-blue fill-brand-blue/10" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                Caregivers Nearby
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
                Trusted Network
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors relative py-1 px-1 ${
                    isActive
                      ? "text-brand-blue font-semibold"
                      : "text-slate-600 hover:text-brand-navy"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue rounded-full"></span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => openCareModal("apply")}
              variant="outline"
              size="sm"
            >
              Join as Caregiver
            </Button>
            <Button
              onClick={() => openCareModal("request")}
              variant="primary"
              size="sm"
            >
              Request Care
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-brand-navy p-2 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl px-4 py-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors text-left ${
                    isActive
                      ? "bg-brand-sky text-brand-blue"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            <Button
              onClick={() => {
                setIsOpen(false);
                openCareModal("apply");
              }}
              variant="outline"
              fullWidth
            >
              Join as Caregiver
            </Button>
            <Button
              onClick={() => {
                setIsOpen(false);
                openCareModal("request");
              }}
              variant="primary"
              fullWidth
            >
              Request Care
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
