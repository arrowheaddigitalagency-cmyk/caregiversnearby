"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Heart, Users, Sparkles, Award, Quote, Clock, MapPin } from "lucide-react";
import { ABOUT_CONTENT, SITE_INFO } from "@/lib/data/content";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

export default function About() {
  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "About Us", item: "https://www.caregiversnearby.com/about" },
  ];

  const valueIcons: Record<number, React.ReactNode> = {
    0: <ShieldCheck className="w-8 h-8 text-brand-blue" />,
    1: <Heart className="w-8 h-8 text-brand-blue" />,
    2: <Clock className="w-8 h-8 text-brand-blue" />,
    3: <MapPin className="w-8 h-8 text-brand-blue" />,
    4: <Users className="w-8 h-8 text-brand-blue" />,
    5: <Sparkles className="w-8 h-8 text-brand-blue" />,
  };

  return (
    <div className="relative bg-[#FAFAFA]">
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-16 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-sky/20 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <div className="flex flex-col items-start text-left">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-teal mb-4">
                Our Story
              </span>
              <h1 className="text-5xl sm:text-6xl font-bold text-brand-navy tracking-tight leading-[1.1] mb-8">
                Care isn't just a service.<br/>
                <span className="text-brand-blue">It's a calling.</span>
              </h1>
              <p className="text-lg sm:text-xl leading-relaxed text-slate-500 font-light mb-10 max-w-lg">
                At Caregivers Nearby, our mission is simple: to help seniors live safely, comfortably, and independently in the place they call home.
              </p>
            </div>

            <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
              <Image
                src="/images/about/about-story.jpg"
                alt="Daughter hugging elderly mother"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent"></div>
              
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 shadow-xl flex justify-around">
                {ABOUT_CONTENT.stats.slice(0,2).map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <p className="text-3xl font-bold text-brand-blue mb-1">{stat.value}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. FOUNDER STORY & QUOTE */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-[3rem] p-10 sm:p-16 shadow-premium overflow-hidden">
            <div className="absolute -top-12 -left-12 text-slate-50 opacity-50">
              <Quote size={180} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy mb-8 max-w-3xl leading-tight">
                "We understand that finding someone to care for a loved one is one of the most important decisions a family can make."
              </h2>
              <p className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl font-light mb-8">
                {ABOUT_CONTENT.story}
              </p>
              <div className="w-16 h-1 bg-brand-blue/20 rounded-full mb-6"></div>
              <p className="text-sm font-bold text-brand-teal uppercase tracking-widest">
                — Caregivers Nearby Team
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Overlapping Cards) */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
            
            <div className="bg-slate-50 p-12 rounded-[3rem] text-left relative overflow-hidden group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-500">
                <Award className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Our Mission</h2>
              <p className="text-lg text-slate-500 leading-relaxed font-light">
                {ABOUT_CONTENT.mission}
              </p>
            </div>

            <div className="bg-slate-50 p-12 rounded-[3rem] text-left relative overflow-hidden group hover:shadow-xl transition-all duration-500 md:mt-16 border border-slate-100">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-teal mb-8 group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-8 h-8" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold text-brand-navy mb-6">Our Vision</h2>
              <p className="text-lg text-slate-500 leading-relaxed font-light">
                {ABOUT_CONTENT.vision}
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION */}
      <section className="py-24 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Why Families Choose Us
            </h2>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed font-light">
              Every decision we make, every caregiver we match, is driven by our core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ABOUT_CONTENT.values.map((val, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors text-left">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  {valueIcons[idx] || <ShieldCheck className="w-8 h-8" />}
                </div>
                <h3 className="text-xl font-bold mb-4">{val.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed font-light">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLOSING STATEMENT */}
      <section className="py-24 bg-white text-center border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-sky/30 border border-brand-blue/10 rounded-[3rem] p-10 sm:p-16 relative overflow-hidden text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-6">
              Meaningful Relationships. Exceptional Care.
            </h3>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light mb-8 max-w-2xl mx-auto">
              At Caregivers Nearby, we believe exceptional care begins with meaningful relationships. Every visit is an opportunity to provide comfort, companionship, and peace of mind—because your loved ones deserve to feel safe, valued, and cared for every day.
            </p>
            <div className="w-16 h-1 bg-brand-teal/20 rounded-full mx-auto mb-6"></div>
            <p className="text-sm font-semibold text-brand-teal uppercase tracking-wider">
              Serving Morgan, Greene, Putnam, Bibb, Hancock, Oconee, Clarke, and Baldwin counties—and growing one community at a time.
            </p>
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-brand-navy tracking-tight mb-6">
            Looking for Trusted Care Nearby?
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-light mb-10">
            Speak with a local care advisor to discuss schedule options, caregiver matches, and custom care blueprints.
          </p>
          <Button href="/contact" variant="primary" size="lg" className="h-14 px-8 text-base shadow-xl">
            Contact Support
          </Button>
        </div>
      </section>
    </div>
  );
}
