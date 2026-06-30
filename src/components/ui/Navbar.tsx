"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import { SITE_INFO } from "@/lib/data/content";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when page changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Join as Caregiver", href: "/caregivers" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md border-b border-slate-100/80 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      {/* Top micro-bar for direct contact */}
      <div className="bg-brand-navy text-slate-300 py-1.5 px-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
            <span>Available 24/7 Nearby</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${SITE_INFO.phone}`}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <PhoneCall size={12} />
              <span>Call Us: {SITE_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
              <Heart className="w-5.5 h-5.5 text-brand-blue fill-brand-blue/10" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-brand-navy group-hover:text-brand-blue transition-colors duration-300">
                Caregivers Nearby
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold -mt-1">
                Trusted Network
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 focus-visible:ring-2 focus-visible:ring-brand-blue rounded px-1 ${
                    isActive
                      ? "text-brand-blue"
                      : "text-slate-600 hover:text-brand-navy"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              href="/contact"
              variant="outline"
              size="sm"
            >
              Contact Us
            </Button>
            <Button
              href="/contact?type=request"
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
              className="text-slate-600 hover:text-brand-navy p-2 focus-visible:ring-2 focus-visible:ring-brand-blue rounded-lg"
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
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-brand-sky text-brand-blue"
                      : "text-slate-600 hover:bg-slate-50 hover:text-brand-navy"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            <Button
              href="/contact"
              variant="outline"
              fullWidth
            >
              Contact Us
            </Button>
            <Button
              href="/contact?type=request"
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
