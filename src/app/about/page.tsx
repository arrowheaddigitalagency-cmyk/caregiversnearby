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
    0: <ShieldCheck className="w-8 h-8 text-brand-teal" />,
    1: <Heart className="w-8 h-8 text-brand-teal" />,
    2: <Clock className="w-8 h-8 text-brand-teal" />,
    3: <MapPin className="w-8 h-8 text-brand-teal" />,
    4: <Users className="w-8 h-8 text-brand-teal" />,
    5: <Sparkles className="w-8 h-8 text-brand-teal" />,
  };

  return (
    <div className="relative bg-[#FAFAFA]">
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5eef5_1px,transparent_1px),linear-gradient(to_bottom,#e5eef5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-35"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-sky/30 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#EAF9FB]/30 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            
            {/* Left Column - Text Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sky border border-slate-100 shadow-sm text-brand-teal font-semibold text-xs tracking-wider uppercase mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
                <span>Our Story</span>
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl font-bold text-brand-navy tracking-tight leading-[1.15] mb-8"
              >
                Care isn't just a service.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-teal">It's a calling.</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl leading-relaxed text-slate-500 font-light max-w-xl"
              >
                At Caregivers Nearby, our mission is simple: to help seniors live safely, comfortably, and independently in the place they call home.
              </motion.p>
            </div>

            {/* Right Column - Image & Stats */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative h-[520px] w-full rounded-[3.5rem] overflow-hidden shadow-premium z-10 border border-white"
              >
                <Image
                  src="/images/about/about-story.jpg"
                  alt="Daughter hugging elderly mother"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/45 via-transparent to-transparent"></div>
                
                {/* Float stats panel */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md rounded-3xl p-5 shadow-2xl border border-white/60">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:divide-x sm:divide-slate-100">
                    {ABOUT_CONTENT.stats.map((stat, idx) => (
                      <div key={idx} className="text-center px-1">
                        <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy mb-0.5">{stat.value}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. FOUNDER STORY & QUOTE (Redesigned Editorial Split Grid Layout) */}
      <section className="py-28 bg-[#F8FBFD] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            
            {/* Left Column: Premium Quote Panel */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative bg-white rounded-[2.5rem] p-8 sm:p-10 shadow-premium border border-slate-100 overflow-hidden">
                <div className="absolute -top-6 -left-6 text-slate-50 select-none pointer-events-none opacity-60">
                  <Quote size={120} className="fill-slate-50 text-slate-50" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl font-semibold text-brand-navy leading-relaxed mb-6 italic">
                    "We understand that finding someone to care for a loved one is one of the most important decisions a family can make."
                  </h3>
                  <div className="w-12 h-1 bg-brand-teal/20 rounded-full mb-4"></div>
                  <span className="text-xs font-bold text-brand-teal uppercase tracking-widest">
                    — Caregivers Nearby Team
                  </span>
                </div>
              </div>
            </div>
            
            {/* Right Column: Narrative Story paragraphs */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left lg:pt-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-8">
                Who We Are & What We Believe
              </h2>
              <div className="space-y-6 text-slate-500 text-lg sm:text-xl font-light leading-relaxed">
                <p>
                  At Caregivers Nearby, our mission is simple: to help seniors live safely, comfortably, and independently in the place they call home. We proudly connect families with compassionate, dependable caregivers who provide high-quality, non-medical in-home companion care throughout Morgan, Greene, Putnam, Bibb, Hancock, Oconee, Clarke, and Baldwin counties in Georgia.
                </p>
                <p>
                  We understand that finding someone to care for a loved one is one of the most important decisions a family can make. That’s why we’re committed to matching every client with a caregiver who is not only experienced and reliable but also genuinely passionate about serving others. Whether your loved one needs companionship, daily activity support, meal preparation, medication reminders, or respite care, our goal is to provide personalized care that enhances independence and improves quality of life.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION (Redesigned Elegant side-by-side Cards) */}
      <section className="py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-white to-brand-sky/20 p-10 sm:p-12 rounded-[2.5rem] text-left relative overflow-hidden group shadow-premium hover:shadow-2xl hover:border-brand-teal/20 transition-all duration-500 hover:-translate-y-1 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#E5EEF5] flex items-center justify-center text-brand-blue mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <Award className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-6">Our Mission</h2>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-light">
                  {ABOUT_CONTENT.mission}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-white to-brand-sky/20 p-10 sm:p-12 rounded-[2.5rem] text-left relative overflow-hidden group shadow-premium hover:shadow-2xl hover:border-brand-teal/20 transition-all duration-500 hover:-translate-y-1 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 rounded-2xl bg-[#EAF9FB] flex items-center justify-center text-brand-teal mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  <Heart className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-6">Our Vision</h2>
                <p className="text-base sm:text-lg text-slate-500 leading-relaxed font-light">
                  {ABOUT_CONTENT.vision}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION (Glowing premium grid) */}
      <section className="py-28 bg-brand-navy text-white relative overflow-hidden">
        {/* Decorative elements for dark section */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-brand-teal/5 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-teal/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-teal mb-4 block">Our Values</span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Why Families Choose Us
            </h2>
            <p className="text-white/85 text-lg sm:text-xl leading-relaxed font-light">
              Every decision we make, every caregiver we match, is driven by our core pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ABOUT_CONTENT.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-3xl hover:bg-white/[0.07] hover:border-brand-teal/40 transition-all duration-500 group hover:-translate-y-1 text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.05] group-hover:bg-brand-teal/15 flex items-center justify-center mb-8 transition-colors duration-500">
                    {valueIcons[idx] || <ShieldCheck className="w-8 h-8 text-brand-teal" />}
                  </div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-brand-teal transition-colors duration-500">
                    {val.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CLOSING STATEMENT (Upgraded Premium Layout) */}
      <section className="py-28 bg-white text-center border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-[#F8FBFD] via-[#F1F7FC] to-[#F8FBFD] border border-[#E5EEF5] rounded-[3rem] p-10 sm:p-16 shadow-premium relative overflow-hidden text-center">
            {/* Subtle glow circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-teal/5 rounded-full blur-3xl select-none pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy mb-6">
                Meaningful Relationships. Exceptional Care.
              </h3>
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-light mb-8 max-w-3xl mx-auto">
                At Caregivers Nearby, we believe exceptional care begins with meaningful relationships. Every visit is an opportunity to provide comfort, companionship, and peace of mind—because your loved ones deserve to feel safe, valued, and cared for every day.
              </p>
              <div className="w-16 h-1 bg-brand-teal/20 rounded-full mx-auto mb-6"></div>
              <p className="text-sm font-semibold text-brand-teal uppercase tracking-wider max-w-2xl mx-auto leading-relaxed">
                Serving Morgan, Greene, Putnam, Bibb, Hancock, Oconee, Clarke, and Baldwin counties—and growing one community at a time.
              </p>
            </div>
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
