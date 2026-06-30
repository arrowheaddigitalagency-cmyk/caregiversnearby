"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2, UserCheck, PhoneCall, Heart, Award, ArrowUpRight, CalendarClock, TrendingUp, Users } from "lucide-react";
import { RECRUITMENT_BENEFITS } from "@/lib/data/content";
import CaregiverForm from "@/components/forms/CaregiverForm";
import JsonLd from "@/components/seo/JsonLd";

const iconMap: Record<string, React.ComponentType<any>> = {
  CalendarClock,
  Heart,
  TrendingUp,
  Users,
};

export default function Caregivers() {
  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "Join as Caregiver", item: "https://www.caregiversnearby.com/caregivers" },
  ];

  const requirements = [
    "Compassionate heart and a genuine desire to support local seniors and families.",
    "Successful completion of a multi-layer federal criminal background check and DMV record check.",
    "Active HHA, CNA, or PCA state certification is highly preferred, but not mandatory. We provide paid training.",
    "Minimum of 2 positive professional references related to care or client support.",
    "Valid U.S. driver's license, reliable personal vehicle, and active auto insurance.",
    "Up-to-date health screenings (TB test clearance and vaccination protocols)."
  ];

  const processes = [
    { step: "01", title: "Quick Online Application", text: "Submit your details, availability, and care experience via our simple form below." },
    { step: "02", title: "Initial Phone Screening", text: "We conduct a brief 15-minute phone alignment to review qualifications and goals." },
    { step: "03", title: "Values-Based Interview", text: "Meet with our care coordinators in person or online to assess competency and cultural fit." },
    { step: "04", title: "Double-Checked Screenings", text: "We initiate background checks and verify professional references." },
    { step: "05", title: "Paid Academy & Match", text: "Complete our caregiver orientation academy, verify credentials, and begin matching with families." }
  ];

  return (
    <>
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HERO HEADER */}
      <section className="relative bg-gradient-to-b from-brand-sky via-brand-sky/20 to-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-sky-medium/35 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Header copy */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
                Careers at Caregivers Nearby
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-[1.08] mb-6">
                Build a Career that Genuinely <span className="text-brand-blue">Matters</span>
              </h1>
              <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-xl">
                We believe that premium home care starts with caring for our staff. Caregivers Nearby connects local caregivers with consistent hours, competitive pay, paid training, and supportive family matches.
              </p>
            </div>

            {/* Header image */}
            <div className="lg:col-span-5 relative h-96 w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-xl bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80"
                alt="Smiling professional caregiver"
                fill
                className="object-cover"
                priority
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. RECRUITMENT BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
              Team Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Why Join the Caregivers Nearby Network?
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We provide leading employee packages and care matches because we respect and value our caregivers' critical work.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {RECRUITMENT_BENEFITS.map((item, idx) => {
              const IconComp = iconMap[item.iconName] || Heart;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 p-8 rounded-2xl shadow-premium hover:shadow-lg transition-all duration-300 flex flex-col items-start"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-sky flex items-center justify-center text-brand-blue mb-6 shadow-sm">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-3">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CORE HIRING REQUIREMENTS */}
      <section className="py-20 bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Requirements list */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5">
                Our Standards
              </span>
              <h2 className="text-3xl font-bold text-brand-navy tracking-tight mb-6">
                Caregiver Application Requirements
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-8">
                To maintain the highest levels of safety and trust for our families, we only admit candidates who satisfy all our credential reviews and behavioral checks.
              </p>

              <ul className="space-y-4 w-full">
                {requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm sm:text-base leading-relaxed">
                    <CheckCircle2 className="text-brand-teal shrink-0 mt-0.5" size={20} />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Styled helper panel */}
            <div className="lg:col-span-5 bg-white border border-slate-100 p-8 rounded-3xl shadow-premium">
              <div className="w-12 h-12 rounded-2xl bg-brand-sky flex items-center justify-center text-brand-blue mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-navy mb-4">Paid Training Academy</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Don't have a CNA or HHA state certification? No problem. Caregivers Nearby runs a fully accredited orientation and training academy that covers:
              </p>
              <ul className="space-y-3.5 text-xs font-semibold text-slate-600 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>
                  <span>Activities of Daily Living (ADLs) Protocols</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>
                  <span>Alzheimer's &amp; Dementia Cognitive Redirection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>
                  <span>Patient Transfers &amp; Fall Risk Management</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>
                  <span>Emergency Preparedness &amp; CPR Refresher</span>
                </li>
              </ul>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                * Our training program is free for hired candidates, and we reimburse hourly rates during course study.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. APPLICATION PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
              Hiring Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-navy tracking-tight mb-4">
              Our Five-Step Hiring Process
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
              We make applying fast and transparent. Here is what to expect after submitting your online application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processes.map((p, idx) => (
              <div key={idx} className="bg-slate-50/50 border border-slate-100 p-6 rounded-2xl text-left hover:border-slate-200 transition-colors">
                <span className="text-3xl font-extrabold text-brand-blue/30 block mb-4">
                  {p.step}
                </span>
                <h3 className="text-sm font-bold text-brand-navy mb-2">{p.title}</h3>
                <p className="text-xs leading-relaxed text-slate-500">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FORM SECTION */}
      <section id="apply-form" className="py-20 bg-slate-50/50 border-t border-slate-100 scroll-mt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <CaregiverForm />
        </div>
      </section>
    </>
  );
}
