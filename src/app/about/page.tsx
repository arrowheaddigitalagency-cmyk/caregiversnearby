"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Sparkles, Award, ArrowUpRight } from "lucide-react";
import { ABOUT_CONTENT, SITE_INFO } from "@/lib/data/content";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

export default function About() {
  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "About Us", item: "https://www.caregiversnearby.com/about" },
  ];

  const valueIcons: Record<number, React.ReactNode> = {
    0: <ShieldCheck className="w-6 h-6 text-brand-blue" />,
    1: <Heart className="w-6 h-6 text-brand-blue" />,
    2: <Users className="w-6 h-6 text-brand-blue" />,
    3: <Sparkles className="w-6 h-6 text-brand-blue" />,
  };

  return (
    <>
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HEADER SECTION */}
      <section className="relative bg-gradient-to-b from-brand-sky via-brand-sky/20 to-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-sky-medium/35 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Header Text */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
                Our Roots
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-[1.08] mb-6">
                Redefining Local Home Care with <span className="text-brand-blue">Heart</span>
              </h1>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mb-6">
                {ABOUT_CONTENT.story}
              </p>
              <div className="flex gap-4">
                <Button href="/services" variant="primary">
                  Explore Services
                </Button>
                <Button href="/contact" variant="outline">
                  Contact Support
                </Button>
              </div>
            </div>

            {/* Header Image */}
            <div className="lg:col-span-5 relative h-96 sm:h-[450px] w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=800&q=80"
                alt="Caregiver speaking with senior lady"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {ABOUT_CONTENT.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <p className="text-4xl sm:text-5xl font-extrabold text-brand-blue tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-20 bg-slate-50/50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            {/* Mission */}
            <div className="bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-premium relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky flex items-center justify-center text-brand-blue mb-6 shadow-sm">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">Our Mission</h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {ABOUT_CONTENT.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white border border-slate-100 p-8 sm:p-10 rounded-3xl shadow-premium relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-brand-teal mb-6 shadow-sm">
                <Heart className="w-6 h-6 fill-brand-teal/10" />
              </div>
              <h2 className="text-2xl font-bold text-brand-navy mb-4">Our Vision</h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                {ABOUT_CONTENT.vision}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              The Values That Guide Our Care
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Every decision we make, every caregiver we hire, and every care blueprint we design is driven by our foundational values.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-8 rounded-2xl shadow-premium flex flex-col items-start hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center mb-6 text-brand-blue shrink-0">
                  {valueIcons[idx] || <ShieldCheck />}
                </div>
                <h3 className="text-lg font-bold text-brand-navy mb-3">{val.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HISTORY TIMELINE */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Milestones of Compassion &amp; Trust
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Trace our history from our initial launch in Boston to our future plans for bringing trusted care to neighborhoods nationwide.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="relative max-w-4xl mx-auto pl-8 sm:pl-0">
            {/* Center line (only in large screens) */}
            <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2"></div>
            {/* Left line (only in mobile) */}
            <div className="block sm:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200"></div>

            <div className="space-y-12">
              {ABOUT_CONTENT.timeline.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Circle Node indicator */}
                    <div className="absolute left-0 sm:left-1/2 w-6 h-6 rounded-full bg-brand-blue border-4 border-white shadow-md -translate-x-3 sm:-translate-x-3 top-1 z-10"></div>

                    {/* Timeline card */}
                    <div className="w-full sm:w-[45%] flex flex-col items-start pl-6 sm:pl-0 sm:px-8 text-left">
                      <div className="bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-premium shadow-premium-hover">
                        <span className="inline-block px-3 py-1 bg-brand-sky text-brand-blue rounded-lg font-bold text-sm mb-4">
                          {item.year}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-navy mb-2.5">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {/* Spacer column */}
                    <div className="hidden sm:block w-[10%]"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-5">
            Looking for Trusted Care Nearby?
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8">
            Speak with a local care advisor to discuss schedule options, caregiver matches, and custom care blue-printing.
          </p>
          <div className="flex gap-4 justify-center">
            <Button href="/contact?type=request" variant="primary">
              Schedule Free Assessment
            </Button>
            <Button href="/services" variant="outline">
              Review Services
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
