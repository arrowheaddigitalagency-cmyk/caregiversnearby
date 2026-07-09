"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import { SITE_INFO } from "@/lib/data/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
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
    <footer className="bg-white text-slate-600 border-t border-slate-100 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Logo and Description */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link href="/" className="flex items-center group w-fit">
              <Image
                src="/logo/logo.png"
                alt="Caregivers Nearby"
                width={180}
                height={42}
                className="hidden md:block w-auto h-[42px] group-hover:opacity-90 transition-opacity"
                priority
              />
              <Image
                src="/logo/logo.png"
                alt="Caregivers Nearby"
                width={145}
                height={34}
                className="block md:hidden w-auto h-[34px] group-hover:opacity-90 transition-opacity"
                priority
              />
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 max-w-sm font-light">
              Providing premium, compassionate in-home care services designed to help seniors age safely and comfortably in their own homes, while giving families absolute peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <h3 className="text-brand-navy font-bold text-sm tracking-wider uppercase mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <Link href="/about" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" onClick={(e) => handleFooterLinkClick(e, "/#services")} className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/join-us" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Join Us as a Caregiver
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-blue transition-colors text-slate-500 font-medium">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact coordinates */}
          <div className="md:col-span-4 flex flex-col gap-5 text-sm">
            <h3 className="text-brand-navy font-bold text-sm tracking-wider uppercase mb-1">Direct Contact</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-blue shrink-0 mt-0.5" />
              <span className="text-slate-500 font-light">{SITE_INFO.address}</span>
            </div>
            <a href="tel:+14047542651" className="flex items-center gap-3 hover:text-brand-blue transition-colors group">
              <Phone className="w-5 h-5 text-brand-blue shrink-0 group-hover:scale-105 transition-transform" />
              <span className="font-semibold text-slate-700">+1 404-754-2651</span>
            </a>
            <a href="mailto:caregiversnearby@gmail.com" className="flex items-center gap-3 hover:text-brand-blue transition-colors group">
              <Mail className="w-5 h-5 text-brand-blue shrink-0 group-hover:scale-105 transition-transform" />
              <span className="font-semibold text-slate-700">caregiversnearby@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-100 my-12"></div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-400 font-light">
            &copy; {currentYear} Caregivers Nearby LLC. All rights reserved. Registered non-medical home care network.
          </p>
        </div>
      </div>
    </footer>
  );
}
