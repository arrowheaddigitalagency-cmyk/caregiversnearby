"use client";

import React from "react";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import { SITE_INFO } from "@/lib/data/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Companion Care", href: "#services" },
    { name: "Personal Assistance", href: "#services" },
    { name: "Meal Preparation", href: "#services" },
    { name: "Medication Reminders", href: "#services" },
    { name: "Transportation", href: "#services" },
    { name: "Hospital Transition", href: "#services" },
    { name: "Dementia Support", href: "#services" },
  ];

  const company = [
    { name: "Home", href: "#hero" },
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "FAQs", href: "#faq" },
  ];

  const resources = [
    { name: "Why Choose Us", href: "#why-us" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Coverage Network", href: "#coverage" },
  ];

  const socialLinks = [
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4.5 h-4.5">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
        </svg>
      ),
      href: "https://facebook.com",
      label: "Facebook",
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4.5 h-4.5">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: (
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          className="w-4.5 h-4.5"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
      href: "https://instagram.com",
      label: "Instagram",
    },
    {
      icon: (
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-4.5 h-4.5">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
  ];

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 90,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800">
      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Column 1: Brand details */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <a href="#hero" onClick={(e) => handleFooterLinkClick(e, "#hero")} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <Heart className="w-5.5 h-5.5 text-white fill-white/10" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-bold tracking-tight text-white">
                  Caregivers Nearby
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                  Trusted Network
                </span>
              </div>
            </a>
            <p className="text-sm leading-relaxed text-slate-400 text-left max-w-sm">
              Providing premium, compassionate in-home care services designed to help seniors age safely and comfortably in their own homes, while giving families absolute peace of mind.
            </p>
            {/* Contact details */}
            <div className="flex flex-col gap-3.5 text-sm text-left">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                <span className="text-slate-400">{SITE_INFO.address}</span>
              </div>
              <a href="tel:+14047542651" className="flex items-center gap-3 hover:text-white transition-colors group">
                <Phone className="w-5 h-5 text-brand-teal shrink-0 group-hover:scale-105 transition-transform" />
                <span>+1 404-754-2651</span>
              </a>
              <a href="mailto:info@caregiversnearby.com" className="flex items-center gap-3 hover:text-white transition-colors group">
                <Mail className="w-5 h-5 text-brand-teal shrink-0 group-hover:scale-105 transition-transform" />
                <span>info@caregiversnearby.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="text-left">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Services</h3>
            <ul className="space-y-3.5 text-sm">
              {services.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} onClick={(e) => handleFooterLinkClick(e, item.href)} className="hover:text-white transition-colors text-slate-400">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="text-left">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Company</h3>
            <ul className="space-y-3.5 text-sm">
              {company.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} onClick={(e) => handleFooterLinkClick(e, item.href)} className="hover:text-white transition-colors text-slate-400">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="text-left">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Resources</h3>
            <ul className="space-y-3.5 text-sm">
              {resources.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} onClick={(e) => handleFooterLinkClick(e, item.href)} className="hover:text-white transition-colors text-slate-400">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Caregivers Nearby LLC. All rights reserved. Registered non-medical home care network.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <span>&bull;</span>
            <Link href="#" className="hover:text-slate-400 transition-colors">Site Map</Link>
          </div>
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-blue hover:text-white transition-all duration-300 text-slate-400"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
