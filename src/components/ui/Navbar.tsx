"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Heart, Menu, X, PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section only on home page
      if (pathname === "/") {
        const sections = ["hero", "services", "why-us", "how-it-works", "faq"];
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
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/", isAnchor: true, anchorId: "hero" },
    { name: "Services", href: "/#services", isAnchor: true, anchorId: "services" },
    { name: "Why Choose Us", href: "/#why-us", isAnchor: true, anchorId: "why-us" },
    { name: "About Us", href: "/about", isAnchor: false },
    { name: "Request Care", href: "/contact", isAnchor: false },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsOpen(false);
    if (link.isAnchor && pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(link.anchorId!);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 90,
          behavior: "smooth",
        });
      }
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
              href="tel:+14047542651"
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
          
          {/* Logo SVG */}
          <Link href="/" className="flex items-center group rounded-lg cursor-pointer">
            <Image
              src="/logo/logo.svg"
              alt="Caregivers Nearby"
              width={180}
              height={42}
              className="hidden md:block w-auto h-[42px] group-hover:opacity-90 transition-opacity"
              priority
              unoptimized
            />
            <Image
              src="/logo/logo.svg"
              alt="Caregivers Nearby"
              width={145}
              height={34}
              className="block md:hidden w-auto h-[34px] group-hover:opacity-90 transition-opacity"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isCurrent = link.isAnchor 
                ? (pathname === "/" && activeSection === link.anchorId)
                : (pathname === link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-sm font-medium transition-colors relative py-1 px-1 ${
                    isCurrent
                      ? "text-brand-blue font-semibold"
                      : "text-slate-600 hover:text-brand-navy"
                  }`}
                >
                  {link.name}
                  {isCurrent && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              href="/join-us"
              variant="primary"
              size="sm"
            >
              Join as Caregiver
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
              const isCurrent = link.isAnchor 
                ? (pathname === "/" && activeSection === link.anchorId)
                : (pathname === link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`text-base font-semibold py-2 px-3 rounded-lg transition-colors text-left ${
                    isCurrent
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
              href="/join-us"
              onClick={() => setIsOpen(false)}
              variant="primary"
              fullWidth
            >
              Join as Caregiver
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
