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
  Activity,
  Phone
} from "lucide-react";
import { SERVICES, WHY_US, STEPS, TESTIMONIALS, FAQS, SITE_INFO } from "@/lib/data/content";
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
  Activity
};

const stepIcons = [Phone, Calendar, Users, Heart, CheckCircle2];

export default function Home() {
  const bentoServices = [
    {
      ...SERVICES[0], // Companion Care
      cols: "col-span-12 lg:col-span-8",
      image: "/images/services/companion-care.jpg",
      number: "01",
      heightClass: "h-[28rem]",
    },
    {
      ...SERVICES[1], // Personal Assistance
      cols: "col-span-12 lg:col-span-4",
      image: "/images/services/personal-assistance.jpg",
      number: "02",
      heightClass: "h-[28rem]",
    },
    {
      ...SERVICES[2], // Meal Preparation
      cols: "col-span-12 md:col-span-6 lg:col-span-4",
      image: "/images/services/meal-preparation.jpg",
      number: "03",
      heightClass: "h-96",
    },
    {
      ...SERVICES[3], // Medication Reminders
      cols: "col-span-12 md:col-span-6 lg:col-span-4",
      image: "/images/services/medication-reminders.jpg",
      number: "04",
      heightClass: "h-96",
    },
    {
      ...SERVICES[4], // Transportation
      cols: "col-span-12 lg:col-span-4",
      image: "/images/services/transportation.jpg",
      number: "05",
      heightClass: "h-96",
    },
    {
      ...SERVICES[5], // Errands & Shopping
      cols: "col-span-12 lg:col-span-7",
      image: "/images/services/errands-shopping.jpg",
      number: "06",
      heightClass: "h-[30rem]",
    },
    {
      ...SERVICES[6], // Light Housekeeping
      cols: "col-span-12 lg:col-span-5",
      image: "/images/services/light-housekeeping.jpg",
      number: "07",
      heightClass: "h-[30rem]",
    },
    {
      ...SERVICES[7], // Hospital Transition
      cols: "col-span-12 md:col-span-6 lg:col-span-6",
      image: "/images/services/hospital-transition.jpg",
      number: "08",
      heightClass: "h-[26rem]",
    },
    {
      ...SERVICES[8], // Respite Care
      cols: "col-span-12 md:col-span-6 lg:col-span-6",
      image: "/images/services/respite-care.jpg",
      number: "09",
      heightClass: "h-[26rem]",
    },
    {
      ...SERVICES[9], // Alzheimer's Care
      cols: "col-span-12",
      image: "/images/services/alzheimers-care.jpg",
      number: "10",
      heightClass: "h-[36rem]",
    },
  ];

  return (
    <div className="relative bg-[#FAFAFA]">
      <JsonLd type="LocalBusiness" />
      <JsonLd type="FAQ" data={FAQS} />

      {/* 1. HERO SECTION */}
      <section id="hero" className="relative overflow-hidden bg-[#FAFAFA] pt-20 pb-32 min-h-[600px] lg:min-h-[750px] flex items-center">
        {/* Background Image Container with opacity overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/hero-trust.png"
            alt="Professional caregiver helping an elderly woman walk"
            fill
            className="object-cover object-right lg:object-[center_80%]"
            priority
          />
          {/* Desktop Left-to-Right Fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] via-[#FAFAFA]/95 to-transparent z-10 hidden lg:block w-full"></div>
          {/* Mobile Top-to-Bottom Fade - Higher opacity to ensure text is 100% readable on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAFA] via-[#FAFAFA]/95 to-[#FAFAFA]/85 z-10 lg:hidden block"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column - Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left z-20">
              
              {/* Small Trust Badge */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-100 shadow-sm text-brand-navy font-semibold text-xs tracking-wider uppercase mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse"></span>
                <span>Premium In-Home Care Network</span>
              </motion.div>

              {/* Large Emotional Headline - Reduced to text-4xl on mobile to prevent ugly wrapping */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold text-brand-navy tracking-tight leading-[1.1] mb-6"
              >
                Compassionate Care.<br />
                <span className="text-brand-blue bg-gradient-to-r from-brand-blue to-brand-teal bg-clip-text text-transparent">Trusted Professionals.</span><br />
                Right Nearby.
              </motion.h1>

              {/* Supporting Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-xl leading-relaxed text-slate-600 max-w-xl mb-8 font-light"
              >
                We connect families with certified, empathetic local caregivers. Experience custom home care blueprints designed for safety, comfort, and real human connection.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
              >
                <Button href="/contact" variant="primary" size="lg" className="h-14 px-8 text-base shadow-xl shadow-brand-blue/20">
                  Find Your Caregiver
                </Button>
                <Button href="/about" variant="outline" size="lg" className="h-14 px-8 text-base bg-white">
                  Discover Our Story
                </Button>
              </motion.div>

              {/* Below CTA: Trust Metrics - Uses grid + divide-x to prevent awkward wrapping on mobile */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-3 gap-1 sm:gap-6 border-t border-slate-100 pt-6 w-full max-w-xl divide-x divide-slate-200"
              >
                <div className="pr-1 sm:pr-4">
                  <p className="text-xl sm:text-2xl font-bold text-brand-navy">100%</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider leading-tight">Vetted Caregivers</p>
                </div>
                <div className="pl-2 sm:pl-6 pr-1 sm:pr-4">
                  <p className="text-xl sm:text-2xl font-bold text-brand-navy">24/7</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider leading-tight">On-Call Support</p>
                </div>
                <div className="pl-2 sm:pl-6">
                  <p className="text-xl sm:text-2xl font-bold text-brand-navy">Local</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider leading-tight">Community Experts</p>
                </div>
              </motion.div>

            </div>

            {/* Right Column: Floating Badges (overlaying background image, desktop only to prevent clutter on mobile) */}
            <div className="hidden lg:flex lg:col-span-5 relative h-[550px] w-full justify-center items-center lg:self-start lg:mt-12">
              
              {/* Trust Badges - translateY + opacity animations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.5 },
                  y: { repeat: Infinity, duration: 5, ease: "easeInOut" }
                }}
                className="absolute top-4 left-4 lg:-left-12 bg-white/95 backdrop-blur-md shadow-premium px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/60 select-none z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <span className="font-bold text-brand-navy text-sm">Background Checked</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.6 },
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut", delay: 0.3 }
                }}
                className="absolute top-1/4 right-4 lg:-right-8 bg-white/95 backdrop-blur-md shadow-premium px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/60 select-none z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Heart size={18} className="fill-brand-blue/10" />
                </div>
                <span className="font-bold text-brand-navy text-sm">Trusted by Families</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.7 },
                  y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 0.6 }
                }}
                className="absolute bottom-12 left-8 lg:-left-4 bg-white/95 backdrop-blur-md shadow-premium px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/60 select-none z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <span className="font-bold text-brand-navy text-sm">Local Caregivers</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, 6, 0] }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.8 },
                  y: { repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.9 }
                }}
                className="absolute bottom-24 right-8 lg:right-12 bg-white/95 backdrop-blur-md shadow-premium px-5 py-3 rounded-2xl flex items-center gap-3 border border-white/60 select-none z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                  <Heart size={18} className="fill-rose-50" />
                </div>
                <span className="font-bold text-brand-navy text-sm">Compassion First</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -6, 0] }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 0.9 },
                  y: { repeat: Infinity, duration: 5.2, ease: "easeInOut", delay: 1.2 }
                }}
                className="absolute top-1/2 left-4 lg:-left-20 hidden xl:flex bg-white/95 backdrop-blur-md shadow-premium px-5 py-3 rounded-2xl items-center gap-3 border border-white/60 select-none z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-sky flex items-center justify-center shrink-0 text-brand-blue">
                  <Users size={18} />
                </div>
                <span className="font-bold text-brand-navy text-sm">Personalized Matching</span>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST BAR */}
      <section className="bg-brand-navy py-8 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
            {[
              "Carefully Screened Caregivers",
              "Personalized Care Plans",
              "Trusted by Families",
              "Non-Medical Home Care",
              "Peace of Mind"
            ].map((pill, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 text-sm font-semibold text-slate-300 select-none"
              >
                <CheckCircle2 className="text-brand-teal w-4 h-4" />
                <span>{pill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SECTION (Redesigned Editorial Bento Grid) */}
      <section id="services" className="py-24 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6 leading-tight">
              A New Standard <br/> in Home Care.
            </h2>
            <p className="text-slate-500 text-lg sm:text-xl leading-relaxed font-light">
              We provide tailored care pathways designed with empathy, clinical insight, and a deep understanding of your family's unique needs.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-12 gap-6 items-stretch">
            {bentoServices.map((service, idx) => {
              const IconComp = iconMap[service.iconName] || Heart;

              return (
                <Link
                  href="/contact"
                  key={service.id}
                  className={`${service.cols} group relative rounded-3xl overflow-hidden cursor-pointer ${service.heightClass}`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
                  
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-xl group-hover:scale-110 transition-transform duration-500">
                        <IconComp size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-white/60 font-medium tracking-widest text-sm">{service.number}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    
                    <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      <p className="text-white/80 text-sm leading-relaxed mb-6 font-light max-w-sm">
                        {service.description}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-brand-teal group/link">
                        <span>Learn More</span>
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY FAMILIES TRUST US */}
      <section id="why-us" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl lg:-translate-y-8 lg:scale-105 z-10 border border-slate-100">
              <Image 
                src="/images/trust/family-trust.png" 
                alt="Family hugging and smiling with senior"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div>
              <span className="text-sm uppercase tracking-widest text-brand-teal font-bold mb-4 inline-block">
                Why Families Trust Caregivers Nearby
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6 leading-tight">
                Peace of mind is our promise.
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-light mb-10">
                Finding the right caregiver shouldn't be stressful. We handle the rigorous screening, background checks, and matching process so you can focus on what matters most: your loved one.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Carefully Screened Caregivers", desc: "Rigorous background checks and multi-step interviews." },
                  { title: "Personalized Care Matching", desc: "We pair caregivers based on clinical needs and personality fit." },
                  { title: "Compassion Before Everything", desc: "Empathy and kindness are non-negotiable standards." },
                  { title: "Local Professionals", desc: "Dedicated caregivers from your own community." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center shrink-0">
                      <ShieldCheck size={24} className="text-brand-blue" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-navy mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section id="how-it-works" className="py-32 bg-[#FAFAFA] relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-sky/10 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-sm uppercase tracking-widest text-brand-teal font-bold mb-4 inline-block">
              Our Journey Blueprints
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6">
              A Simple Path to Care
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed font-light">
              Securing trusted home care with Caregivers Nearby is straightforward and stress-free.
            </p>
          </div>

          <div className="relative">
            {/* Desktop Curved Timeline Line (animated drawing) */}
            <div className="absolute top-20 left-[10%] right-[10%] h-0.5 bg-slate-200/60 -z-10 hidden lg:block overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-blue via-brand-teal to-brand-blue w-full"
                initial={{ x: "-100%" }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Mobile Vertical Timeline Line (animated drawing) */}
            <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-slate-200/60 -translate-x-1/2 -z-10 lg:hidden overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-b from-brand-blue via-brand-teal to-brand-blue h-full origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>

            {/* Staggered Steps Container */}
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-8 relative z-10"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {STEPS.map((step, idx) => {
                const IconComp = stepIcons[idx] || CheckCircle2;
                return (
                  <motion.div 
                    key={idx} 
                    className="flex flex-col items-center text-center group relative w-full"
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                    }}
                  >
                    {/* Milestone Circle (always centered) */}
                    <div className="relative shrink-0 mb-6 lg:mb-8 z-20">
                      {/* Gradient Glass circle for step number */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-brand-teal text-white font-bold text-xs flex items-center justify-center shadow-lg border border-white/20 z-20">
                        {step.number}
                      </div>
                      
                      {/* Large Milestone Node */}
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center justify-center text-brand-blue group-hover:text-white group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-500 scale-100 group-hover:scale-110">
                        <IconComp size={28} strokeWidth={1.5} className="group-hover:rotate-12 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Content Card (Desktop rises slightly) */}
                    <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-slate-100/60 shadow-premium hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-center w-full z-10">
                      <h3 className="text-xl font-bold text-brand-navy mb-3 group-hover:text-brand-blue transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500 font-light">
                        {step.description}
                      </p>
                    </div>

                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6">
              Real Experiences from Real Families
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAFA] p-10 rounded-[2.5rem] flex flex-col justify-between h-full relative"
              >
                <div className="text-brand-blue mb-8">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.1667 15C14.1667 11.3181 17.1515 8.33333 20.8333 8.33333C24.5152 8.33333 27.5 11.3181 27.5 15C27.5 16.9142 26.6926 18.6397 25.3905 19.8519L16.6667 28.3333L14.4173 26.2422L21.724 19.1667H14.1667V15Z" fill="currentColor"/>
                    <path d="M3.33333 15C3.33333 11.3181 6.3181 8.33333 10 8.33333C13.6819 8.33333 16.6667 11.3181 16.6667 15C16.6667 16.9142 15.8592 18.6397 14.5572 19.8519L5.83333 28.3333L3.58398 26.2422L10.8907 19.1667H3.33333V15Z" fill="currentColor"/>
                  </svg>
                </div>

                <div className="relative z-10 text-left flex-grow">
                  <p className="text-brand-navy text-lg leading-relaxed font-medium mb-10">
                    "{item.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6 mt-auto">
                  <div className="text-left">
                    <p className="font-bold text-brand-navy text-base">{item.author}</p>
                    <p className="text-sm text-slate-500">{item.relation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ SECTION */}
      <section id="faq" className="py-24 bg-[#FAFAFA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 8. FINAL EMOTIONAL CTA */}
      <section className="py-32 bg-brand-navy relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-blue/20 blur-3xl -z-10"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-6xl font-bold text-white tracking-tight mb-8">
            Ready to find peace of mind?
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto mb-12 font-light">
            Let us match you with a trusted local caregiver who fits your family's unique needs and personality.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Button href="/contact?type=request" variant="primary" size="lg" className="h-14 px-8 text-base">
              Request Care Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
