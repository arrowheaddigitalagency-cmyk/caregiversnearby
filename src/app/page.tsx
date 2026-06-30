"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
  Heart,
  ArrowRight,
  Star,
  Users,
  CheckCircle,
  Briefcase,
  Award,
  CheckCircle2,
  CalendarClock,
  Clock,
  HelpCircle,
  TrendingUp,
} from "lucide-react";
import { SERVICES, WHY_US, STEPS, TESTIMONIALS, FAQS, SITE_INFO, RECRUITMENT_BENEFITS } from "@/lib/data/content";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import JsonLd from "@/components/seo/JsonLd";

// Icon mappings
const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldCheck,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
  CalendarClock,
  Heart,
  TrendingUp,
  Users,
};

export default function Home() {
  // Bento grid mapping: service id -> grid span and visual layout type
  const bentoServices = [
    {
      ...SERVICES[0], // Companion Care
      size: "large",
      cols: "lg:col-span-3 md:col-span-6 col-span-12",
      image: "/images/services/companion-care.jpg",
      number: "01",
    },
    {
      ...SERVICES[1], // Personal Assistance
      size: "large",
      cols: "lg:col-span-3 md:col-span-6 col-span-12",
      image: "/images/services/personal-assistance.jpg",
      number: "02",
    },
    {
      ...SERVICES[2], // Meal Preparation
      size: "medium",
      cols: "lg:col-span-2 md:col-span-4 col-span-12",
      image: "/images/services/meal-preparation.jpg",
      number: "03",
    },
    {
      ...SERVICES[3], // Medication Reminders
      size: "medium",
      cols: "lg:col-span-2 md:col-span-4 col-span-12",
      image: "/images/services/medication-reminders.jpg",
      number: "04",
    },
    {
      ...SERVICES[4], // Transportation
      size: "medium",
      cols: "lg:col-span-2 md:col-span-4 col-span-12",
      image: "/images/services/transportation.jpg",
      number: "05",
    },
    {
      ...SERVICES[5], // Errands & Shopping
      size: "medium",
      cols: "lg:col-span-2 md:col-span-4 col-span-12",
      image: "/images/services/errands-shopping.jpg",
      number: "06",
    },
    {
      ...SERVICES[6], // Light Housekeeping
      size: "medium",
      cols: "lg:col-span-2 md:col-span-4 col-span-12",
      image: "/images/services/light-housekeeping.jpg",
      number: "07",
    },
    {
      ...SERVICES[7], // Hospital Transition
      size: "medium",
      cols: "lg:col-span-2 md:col-span-4 col-span-12",
      image: "/images/services/hospital-transition.jpg",
      number: "08",
    },
    {
      ...SERVICES[8], // Respite Care
      size: "large",
      cols: "lg:col-span-3 md:col-span-6 col-span-12",
      image: "/images/services/respite-care.jpg",
      number: "09",
    },
    {
      ...SERVICES[9], // Alzheimer's Care
      size: "large",
      cols: "lg:col-span-3 md:col-span-6 col-span-12",
      image: "/images/services/alzheimers-care.jpg",
      number: "10",
    },
  ];

  return (
    <div className="relative">
      <JsonLd type="LocalBusiness" />
      <JsonLd type="FAQ" data={FAQS} />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative overflow-hidden bg-white pt-10 pb-20 md:py-24">
        {/* Soft blue gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-sky-medium/35 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute top-1/3 left-0 w-[450px] h-[450px] rounded-full bg-sky-50/70 blur-3xl -z-10 -translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold tracking-wide uppercase mb-6"
              >
                <Heart size={12} className="fill-brand-blue/10" />
                <span>Premium In-Home Support Network</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-[1.08] mb-6"
              >
                Compassionate Care.<br />
                <span className="bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">Trusted Caregivers.</span><br />
                Right Nearby.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed text-slate-500 max-w-xl mb-8"
              >
                We connect families with certified, empathetic local caregivers. Experience custom home care blueprints designed for safety, comfort, and real human connection.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
              >
                <Button href="/contact" variant="primary" size="lg">
                  Request Care
                </Button>
                <Button href="/about" variant="outline" size="lg">
                  Learn About Us
                </Button>
              </motion.div>

              {/* Inline trust items */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-100 pt-6 w-full max-w-lg"
              >
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="text-brand-emerald shrink-0" size={15} />
                  <span>Licensed &amp; Insured</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="text-brand-emerald shrink-0" size={15} />
                  <span>CNA &amp; HHA Mentored</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <CheckCircle2 className="text-brand-emerald shrink-0" size={15} />
                  <span>24/7 On-Call Support</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Premium Image & Floating Badges */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-100 bg-white"
              >
                <Image
                  src="/images/hero/hero.jpg"
                  alt="Compassionate Caregiver helping a senior woman walk"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
              </motion.div>

              {/* Floating Badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-12 -left-6 sm:-left-12 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-left text-xs font-bold text-brand-navy">Background Checked</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -right-4 sm:-right-8 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Heart size={18} className="fill-brand-blue/10" />
                </div>
                <div className="text-left text-xs font-bold text-brand-navy">Trusted Caregivers</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 left-6 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-left text-xs font-bold text-brand-navy">Available Nearby</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute bottom-1/3 -left-8 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Star size={18} className="fill-brand-blue/10" />
                </div>
                <div className="text-left text-xs font-bold text-brand-navy">Family Approved</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-1/4 -right-12 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  <Calendar size={18} />
                </div>
                <div className="text-left text-xs font-bold text-brand-navy">Flexible Scheduling</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
                className="absolute -bottom-6 right-10 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <Heart size={18} className="fill-rose-50" />
                </div>
                <div className="text-left text-xs font-bold text-brand-navy">Compassion First</div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-slate-50 border-y border-slate-100 py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-400 mr-2">Our Standards:</span>
            {[
              "Carefully Screened Caregivers",
              "Flexible Scheduling",
              "Personalized Care Plans",
              "Trusted by Families",
              "Non-Medical Home Care"
            ].map((pill, idx) => (
              <div 
                key={idx}
                className="glass-panel shadow-premium px-4 py-2 rounded-full text-xs font-bold text-slate-600 border border-white flex items-center gap-1.5 select-none"
              >
                <CheckCircle2 className="text-brand-teal w-3.5 h-3.5" />
                <span>{pill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (Redesigned Editorial Bento Grid) */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3 inline-block">
              Intelligent Home Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Comprehensive Care Blueprints
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Explore our core non-medical services. Each card is custom-proportioned inside an editorial grid layout representing specialized pathways.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-8 items-stretch">
            {bentoServices.map((service, idx) => {
              const IconComp = iconMap[service.iconName] || Heart;
              const isLarge = service.size === "large";

              return (
                <div
                  key={service.id}
                  className={`${service.cols} flex`}
                >
                  <div className="group relative w-full flex flex-col justify-between bg-slate-50/50 border border-slate-100 rounded-3xl overflow-hidden shadow-premium hover:shadow-xl hover:border-brand-blue/20 hover:-translate-y-1 transition-all duration-500 ease-out p-6 sm:p-8">
                    
                    {/* Background visual border helper */}
                    <div className="absolute inset-0 rounded-3xl p-[1.5px] bg-gradient-to-tr from-brand-blue/0 via-transparent to-brand-teal/0 group-hover:from-brand-blue/15 group-hover:via-transparent group-hover:to-brand-teal/15 transition-all duration-500 -z-10"></div>
                    <div className="absolute inset-[1.5px] bg-white rounded-3xl -z-10"></div>

                    {/* Image Box */}
                    <div className={`relative w-full rounded-2xl overflow-hidden mb-6 ${isLarge ? "h-64 sm:h-72" : "h-48"}`}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      {/* Floating Glass Icon Badge */}
                      <div className="absolute bottom-4 left-4 w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md text-brand-blue border border-white/40 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                        <IconComp size={20} />
                      </div>
                      {/* Service Index Number */}
                      <span className="absolute top-4 right-4 bg-brand-navy/60 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-extrabold text-white tracking-widest select-none">
                        {service.number}
                      </span>
                    </div>

                    {/* Copy Content */}
                    <div className="text-left flex-grow flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-blue transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                          {service.description}
                        </p>
                      </div>

                      {/* Benefits Preview */}
                      <div className="border-t border-slate-100 pt-4 mt-auto">
                        <ul className="space-y-2 mb-6">
                          {service.benefits.slice(0, isLarge ? 3 : 2).map((b, bidx) => (
                            <li key={bidx} className="flex items-center gap-2 text-xs text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0"></span>
                              <span className="truncate">{b}</span>
                            </li>
                          ))}
                        </ul>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal hover:text-brand-teal-hover transition-colors group/link"
                        >
                          <span>Request blueprint</span>
                          <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US */}
      <section id="why-us" className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3 inline-block">
              Vetting &amp; Safety
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Why Families Choose Caregivers Nearby
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We stand apart through our double-checked screenings, local matches, and responsive coordination blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-8 rounded-3xl shadow-premium hover:shadow-lg transition-all duration-300 flex items-start gap-5 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brand-sky flex items-center justify-center shrink-0 text-brand-blue shadow-sm border border-slate-100/50 group-hover:bg-brand-blue group-hover:text-white transition-colors duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-brand-navy mb-2.5 group-hover:text-brand-blue transition-colors">{item.title}</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3 inline-block">
              Our Journey Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Securing trusted home care with Caregivers Nearby is straightforward and stress-free.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto mt-12 pl-8 sm:pl-0">
            {/* SVG Connector Dotted Path */}
            <div className="absolute top-[48px] left-[8%] right-[8%] h-12 -z-10 hidden md:block select-none pointer-events-none">
              <svg className="w-full h-full text-brand-blue/20" preserveAspectRatio="none" viewBox="0 0 100 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M 0 5 C 25 12, 25 -2, 50 5 C 75 12, 75 -2, 100 5" strokeDasharray="6 6" />
              </svg>
            </div>
            
            <div className="block md:hidden absolute left-0 top-0 bottom-0 w-0.5 bg-slate-200/80 -translate-x-3.5 select-none pointer-events-none"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {STEPS.map((step, idx) => (
                <div key={idx} className="flex flex-col items-start md:items-center text-left md:text-center px-4 group">
                  <div className="w-14 h-14 rounded-full bg-white border-2 border-brand-blue text-brand-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-108 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 z-10 cursor-default select-none border-brand-blue/20">
                    {step.number}
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mt-5 mb-2.5 group-hover:text-brand-blue transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3 inline-block">
              Family Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Real Experiences from Real Families
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Read verified testimonials from family members who have designed care plans with our network caregivers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100/80 p-8 rounded-3xl shadow-premium hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between h-full relative overflow-hidden group"
              >
                <div className="absolute -top-4 -right-2 text-slate-50/70 text-9xl font-serif select-none pointer-events-none group-hover:text-slate-100 transition-colors duration-300">
                  &ldquo;
                </div>

                <div className="relative z-10 text-left">
                  <div className="flex items-center gap-1.5 text-brand-gold mb-6">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={15} className="fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-8 relative">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-slate-100/50 pt-5 mt-auto relative z-10">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100">
                    <Image
                      src={`/images/testimonials/avatar${idx + 1}.jpg`}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-brand-navy text-sm">{item.author}</p>
                    <p className="text-xs text-slate-400 font-semibold">{item.relation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CAREER SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-navy rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-teal/10 blur-3xl -z-0 translate-x-1/4 -translate-y-1/4"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              
              {/* Left Column: Benefits */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5">
                  Careers
                </span>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mb-5">
                  Join America&apos;s Most Trusted Network.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
                  We support our caregiver family with competitive pay, flexible shifts, PTO, and training.
                </p>

                {/* Benefits List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mb-8 border-b border-slate-800 pb-8">
                  {RECRUITMENT_BENEFITS.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="text-brand-teal shrink-0 mt-0.5" size={16} />
                      <div className="text-xs">
                        <p className="font-bold text-white mb-0.5">{item.title}</p>
                        <p className="text-slate-400 leading-normal">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button href="/contact?subject=caregiver" variant="secondary" size="lg">
                  Submit Caregiver Application
                </Button>
              </div>

              {/* Right Column: Scrub Caregiver */}
              <div className="lg:col-span-5 relative flex justify-center items-center">
                <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2rem] overflow-hidden border border-slate-800 bg-slate-900 shadow-lg">
                  <Image
                    src="/images/caregivers/caregivers.jpg"
                    alt="Professional Smiling Caregiver in Scrubs"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Floating Badges */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-10 -left-6 glass-panel-dark shadow-xl px-3.5 py-2.5 rounded-xl flex items-center gap-2 border border-white/5 select-none"
                >
                  <Briefcase size={16} className="text-brand-teal" />
                  <span className="text-xs font-bold text-white">Top Pay Rates</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-10 -right-6 glass-panel-dark shadow-xl px-3.5 py-2.5 rounded-xl flex items-center gap-2 border border-white/5 select-none"
                >
                  <Award size={16} className="text-brand-teal" />
                  <span className="text-xs font-bold text-white">Paid CNA Training</span>
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section id="faq" className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3 inline-block">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Find immediate answers regarding screening reviews, schedules, and care coordinations.
            </p>
          </div>

          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 9. FINAL EMOTIONAL CTA */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-sky-medium/25 blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6">
            Ready to Find Compassionate Care?
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Let us build a customized Care Blueprint matching clinical needs and personality fits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/contact?type=request" variant="primary" size="lg">
              Request Care
            </Button>
            <Button href="/contact?type=apply" variant="outline" size="lg">
              Become a Caregiver
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
