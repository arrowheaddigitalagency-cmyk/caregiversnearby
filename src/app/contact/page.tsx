"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, Clock, MapPin, AlertTriangle, ArrowRight, ShieldCheck } from "lucide-react";
import { SITE_INFO } from "@/lib/data/content";
import ContactForm from "@/components/forms/ContactForm";
import JsonLd from "@/components/seo/JsonLd";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service") || "";

  const contactMethods = [
    {
      icon: <Phone className="w-5.5 h-5.5 text-brand-blue" />,
      title: "Call Direct",
      text: SITE_INFO.phone,
      subText: "Speak directly with a care advisor 24/7.",
      href: `tel:${SITE_INFO.phone}`,
    },
    {
      icon: <Mail className="w-5.5 h-5.5 text-brand-blue" />,
      title: "Email Support",
      text: SITE_INFO.email,
      subText: "General inquiries and partnerships.",
      href: `mailto:${SITE_INFO.email}`,
    },
    {
      icon: <Clock className="w-5.5 h-5.5 text-brand-blue" />,
      title: "Hours of Support",
      text: "Office: Mon-Fri, 8 AM - 6 PM EST",
      subText: "On-call caregiver support is active 24/7.",
      href: null,
    },
  ];

  return (
    <>
      {/* 1. HEADER SECTION */}
      <section className="relative bg-gradient-to-b from-brand-sky via-brand-sky/20 to-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-sky-medium/35 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight leading-[1.08] mb-6">
            Connecting Your Family to Quality Care
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            Have questions about pricing, schedule matching, or specialized care? Reach out via our online blueprint intake, email us, or call our Boston headquarters directly.
          </p>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT FORM & INFORMATION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-6 xl:col-span-7">
              <ContactForm defaultCareType={serviceParam} />
            </div>

            {/* Right Column: Contact Details, Map Placeholder & Emergency Info */}
            <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-8">
              
              {/* Emergency Advisory Box */}
              <div className="p-6 bg-amber-50/50 border border-amber-100 rounded-2xl flex items-start gap-4 text-slate-700 text-xs sm:text-sm leading-relaxed shadow-sm">
                <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={24} />
                <div>
                  <p className="font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Care Notice
                  </p>
                  <p className="text-slate-600">
                    {SITE_INFO.emergencyNotice}
                  </p>
                </div>
              </div>

              {/* Direct Info List */}
              <div className="flex flex-col gap-6">
                {contactMethods.map((method, idx) => {
                  const content = (
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50/50 border border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0">
                        {method.icon}
                      </div>
                      <div className="text-left text-sm">
                        <h3 className="font-bold text-brand-navy mb-0.5">{method.title}</h3>
                        <p className="font-semibold text-slate-700">{method.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{method.subText}</p>
                      </div>
                    </div>
                  );

                  return method.href ? (
                    <a key={idx} href={method.href} className="block group">
                      {content}
                    </a>
                  ) : (
                    <div key={idx}>{content}</div>
                  );
                })}
              </div>

              {/* Address / Headquarters Info */}
              <div className="p-6 border border-slate-100 rounded-2xl bg-slate-50/50 shadow-sm flex items-start gap-4">
                <MapPin className="text-brand-blue shrink-0 mt-1" size={20} />
                <div className="text-left text-sm">
                  <h3 className="font-bold text-brand-navy mb-1">Boston Headquarters</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {SITE_INFO.address}
                  </p>
                  
                  {/* Map Graphic representation */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden bg-slate-200 border border-slate-100 flex items-center justify-center">
                    {/* Visual styled grid background representing map */}
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    {/* Simulated Map Marker */}
                    <div className="relative flex flex-col items-center">
                      <div className="absolute -top-1 w-10 h-10 bg-brand-blue/20 rounded-full animate-ping"></div>
                      <MapPin className="w-8 h-8 text-brand-blue fill-brand-blue/10 relative z-10 filter drop-shadow-md" />
                      <span className="mt-2 text-[10px] font-bold text-brand-navy bg-white px-2 py-0.5 rounded-full border border-slate-100 shadow-sm">
                        Office Location
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vetting disclaimer */}
              <div className="p-5 border border-slate-100 rounded-2xl bg-white/50 flex items-center gap-3.5">
                <ShieldCheck className="text-brand-emerald shrink-0" size={24} />
                <p className="text-xs text-slate-500 leading-relaxed text-left">
                  <strong>Secure Intake:</strong> Your information is protected. We do not sell or share contact details with third-party networks. All records comply with privacy and health data standards.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function Contact() {
  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "Contact Us", item: "https://www.caregiversnearby.com/contact" },
  ];

  return (
    <Suspense fallback={
      <div className="py-24 text-center text-slate-500 font-semibold">
        Loading care contact blueprint...
      </div>
    }>
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />
      <ContactPageContent />
    </Suspense>
  );
}
