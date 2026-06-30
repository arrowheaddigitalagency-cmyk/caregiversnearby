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
} from "lucide-react";
import { SERVICES, WHY_US, STEPS, TESTIMONIALS, FAQS, SITE_INFO } from "@/lib/data/content";
import Button from "@/components/ui/Button";
import ServiceCard from "@/components/ui/ServiceCard";
import Accordion from "@/components/ui/Accordion";
import CoverageMap from "@/components/map/CoverageMap";
import JsonLd from "@/components/seo/JsonLd";

// Map icon names to Lucide icons for the feature section
const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldCheck,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
};

export default function Home() {
  return (
    <>
      {/* Schema Markups */}
      <JsonLd type="LocalBusiness" />
      <JsonLd type="FAQ" data={FAQS} />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-sky via-brand-sky/20 to-white pt-8 pb-20 md:py-24">
        {/* Background decorative circles */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-sky-medium/30 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-teal-50/40 blur-3xl -z-10 -translate-x-1/4 translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Heading & Info */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-semibold tracking-wide uppercase mb-6"
              >
                <Heart size={12} className="fill-brand-blue/10" />
                <span>Now Serving New England Families</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-[1.08] mb-6"
              >
                Compassionate Care.<br />
                <span className="text-brand-blue">Trusted Caregivers.</span><br />
                Right Nearby.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg leading-relaxed text-slate-500 max-w-xl mb-8"
              >
                We match certified, empathetic local caregivers with seniors and individuals needing daily support. Experience personalized care blueprints designed for safety, comfort, and real companionship.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
              >
                <Button href="/contact?type=request" variant="primary" size="lg">
                  Request Care
                </Button>
                <Button href="/caregivers" variant="outline" size="lg">
                  Become a Caregiver
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 gap-y-4 gap-x-6 border-t border-slate-100 pt-6 w-full max-w-md"
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <CheckCircle className="text-brand-emerald shrink-0" size={16} />
                  <span>Background Checked</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <CheckCircle className="text-brand-emerald shrink-0" size={16} />
                  <span>Licensed &amp; Insured</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <CheckCircle className="text-brand-emerald shrink-0" size={16} />
                  <span>Personalized Matching</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                  <CheckCircle className="text-brand-emerald shrink-0" size={16} />
                  <span>24/7 Care Support</span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Hero Image & Floating Cards */}
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/80 bg-white"
              >
                <Image
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
                  alt="Compassionate Caregiver helping a senior woman"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </motion.div>

              {/* Floating Glass Card 1: Background Checked */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 -left-6 sm:-left-12 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 max-w-[190px] border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-emerald/10 text-brand-emerald flex items-center justify-center shrink-0">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Security</p>
                  <p className="text-xs font-bold text-brand-navy">Background Checked</p>
                </div>
              </motion.div>

              {/* Floating Glass Card 2: Trusted Caregivers */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-1/4 -right-4 sm:-right-8 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 max-w-[190px] border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Heart size={18} className="fill-brand-blue/10" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Network</p>
                  <p className="text-xs font-bold text-brand-navy">Trusted Caregivers</p>
                </div>
              </motion.div>

              {/* Floating Glass Card 3: Personalized Matching */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 left-1/4 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 max-w-[200px] border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-teal/10 text-brand-teal flex items-center justify-center shrink-0">
                  <Sparkles size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Matching</p>
                  <p className="text-xs font-bold text-brand-navy">Personalized Fit</p>
                </div>
              </motion.div>

              {/* Floating Glass Card 4: Available Nearby */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-10 right-4 glass-panel shadow-premium px-4 py-3 rounded-2xl flex items-center gap-2.5 max-w-[170px] border border-white/60 select-none"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Location</p>
                  <p className="text-xs font-bold text-brand-navy">Available Nearby</p>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <section className="py-20 bg-white border-t border-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
            Our Care Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-6">
            &ldquo;The Caregiver Network America Can Trust.&rdquo;
          </h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-500 max-w-2xl mx-auto">
            We believe that home care is more than assistance—it is a commitment to dignity, companionship, and clinical safety. Every caregiver in our network is thoroughly screened, vetted, and selected based on clinical competence and human empathy.
          </p>
        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
              Dedicated Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Comprehensive Care Services
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Explore our wide range of premium home care services tailored to your family's specific needs, physical goals, and scheduling requirements.
            </p>
          </div>

          {/* Grid of 10 Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href="/services" variant="outline">
              View Detailed Service Blueprints
            </Button>
          </div>
        </div>
      </section>

      {/* 4. WHY FAMILIES CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
              Our Differentiators
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Why Families Choose Us
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We stand apart through our rigorous screening protocols, values-based caregiver matching, and commitment to flexible care plans.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_US.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-8 rounded-2xl shadow-premium hover:shadow-lg transition-all duration-300 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center shrink-0 text-brand-blue shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy mb-2">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
              Simple Steps
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              How It Works
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We have refined our intake process to make securing trusted home care seamless, swift, and completely stress-free.
            </p>
          </div>

          {/* Timeline Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {/* Visual connector line in desktop */}
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-[2px] bg-slate-200/60 -z-10"></div>

            {STEPS.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center px-4">
                {/* Step Circle */}
                <div className="w-14 h-14 rounded-full bg-white border-2 border-brand-blue text-brand-blue flex items-center justify-center font-bold text-lg shadow-md mb-6 z-10">
                  {step.number}
                </div>
                <h3 className="text-base font-bold text-brand-navy mb-2.5">{step.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Shared Experiences from Families
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Read authentic testimonials from families who rely on our local care coordinators and professional caregivers.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-8 rounded-2xl shadow-premium flex flex-col justify-between h-full"
              >
                <div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-brand-gold mb-6">
                    {[...Array(item.stars)].map((_, i) => (
                      <Star key={i} size={16} className="fill-brand-gold" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed italic mb-8">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Author Card */}
                <div className="flex items-center gap-3.5 border-t border-slate-50 pt-5 mt-auto">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-100">
                    <Image
                      src={item.imageUrl}
                      alt={item.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-brand-navy text-sm">{item.author}</p>
                    <p className="text-xs text-slate-500">{item.relation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ABOUT PREVIEW */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Image Column */}
            <div className="lg:col-span-5 relative h-96 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80"
                alt="Holding hands, companion care"
                fill
                className="object-cover"
              />
            </div>

            {/* Copy Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5">
                Our Story
              </span>
              <h2 className="text-3xl font-bold text-brand-navy tracking-tight mb-5">
                Built to Care for Families Like Our Own
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                Caregivers Nearby was founded out of a personal struggle. When our own grandfather needed support after a stroke, we spent weeks searching for someone trustworthy, certified, and compassionate who lived nearby. We found that the existing agencies felt cold and transactional, while independent listings lacked vetting and safety.
              </p>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
                We knew there had to be a better way. We built Caregivers Nearby to combine modern matching technology with local human care—creating an organization that treats your family exactly like our own.
              </p>

              <div className="flex gap-4">
                <Button href="/about" variant="primary">
                  Learn Our Full Story
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. CAREGIVER RECRUITMENT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-navy rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
            {/* Soft decorative light circles */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-blue/10 blur-3xl -z-0 translate-x-1/4 -translate-y-1/4"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Copy */}
              <div className="lg:col-span-7 flex flex-col items-start text-left">
                <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5">
                  We Are Hiring
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-5">
                  Are You a Compassionate Caregiver? Join Our Network.
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-xl">
                  We support our caregivers with competitive opportunities, flexible schedules, paid time off, and structured clinical training. Make a real difference in your local community.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <CheckCircle className="text-brand-teal shrink-0" size={16} />
                    <span>Competitive Pay Rates</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <CheckCircle className="text-brand-teal shrink-0" size={16} />
                    <span>Flexible Work Shifts</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <CheckCircle className="text-brand-teal shrink-0" size={16} />
                    <span>Paid CNA/HHA Training</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <CheckCircle className="text-brand-teal shrink-0" size={16} />
                    <span>Health &amp; PTO Packages</span>
                  </div>
                </div>

                <Button href="/caregivers" variant="secondary" size="lg">
                  Become a Caregiver
                </Button>
              </div>

              {/* Recruitment Photo */}
              <div className="lg:col-span-5 relative h-72 lg:h-96 w-full rounded-2xl overflow-hidden border border-white/5">
                <Image
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                  alt="Cheerful Caregivers"
                  fill
                  className="object-cover"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 9. COVERAGE SECTION */}
      <section id="coverage" className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
              Network Map
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Finding Trusted Care in Your Community
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We are actively matching caregivers in Massachusetts with plans to expand our digital matching hubs to other major US metropolitan regions soon.
            </p>
          </div>

          <CoverageMap />
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              Have questions about background checks, scheduling, or care coordinators? Find quick answers below.
            </p>
          </div>

          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 11. BOTTOM CTA */}
      <section className="py-24 bg-gradient-to-br from-brand-sky via-brand-sky/30 to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-sky-medium/20 blur-3xl -z-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6">
            Ready to Find Compassionate Care?
          </h2>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Let us design a personalized Care Blueprint for your loved one. Schedule a free home care consultation with our senior advisors today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button href="/contact?type=request" variant="primary" size="lg">
              Request Care
            </Button>
            <Button href="/caregivers" variant="outline" size="lg">
              Become a Caregiver
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
