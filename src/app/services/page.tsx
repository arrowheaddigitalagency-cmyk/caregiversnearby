"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Check, HeartHandshake, User, Utensils, Clock, Car, ShoppingBag, Home, Activity, Coffee, BrainCircuit } from "lucide-react";
import { SERVICES, SITE_INFO } from "@/lib/data/content";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

const iconMap: Record<string, React.ComponentType<any>> = {
  HeartHandshake,
  User,
  Utensils,
  Clock,
  Car,
  ShoppingBag,
  Home,
  Activity,
  Coffee,
  BrainCircuit,
};

export default function Services() {
  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "Services", item: "https://www.caregiversnearby.com/services" },
  ];

  return (
    <>
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HEADER SECTION */}
      <section className="relative bg-gradient-to-b from-brand-sky via-brand-sky/20 to-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-sky-medium/35 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
            Care Blueprints
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight leading-[1.08] mb-6">
            In-Home Services Designed for Safety &amp; Comfort
          </h1>
          <p className="text-slate-500 text-base sm:text-lg leading-relaxed">
            We provide a broad range of non-medical care services from part-time companion visits to round-the-clock specialized support. Every care plan is customized to individual routines and lifestyle goals.
          </p>
        </div>
      </section>

      {/* 2. SERVICES BLUEPRINTS LIST */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {SERVICES.map((service, idx) => {
            const IconComponent = iconMap[service.iconName] || HeartHandshake;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={service.id}
                id={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-b border-slate-100 pb-20 last:border-0 last:pb-0 scroll-mt-24`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-5 relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-md ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  {/* Floating Icon Box */}
                  <div className="absolute bottom-6 left-6 w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg text-brand-blue border border-white/40">
                    <IconComponent className="w-7 h-7" />
                  </div>
                </div>

                {/* Details Column */}
                <div
                  className={`lg:col-span-7 flex flex-col items-start text-left ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <h2 className="text-3xl font-bold text-brand-navy tracking-tight mb-4">
                    {service.title}
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                    {service.detailedDescription}
                  </p>

                  <h3 className="text-sm font-semibold text-brand-navy uppercase tracking-wider mb-4 border-b border-slate-50 pb-2 w-full">
                    Key Care Benefits Include:
                  </h3>
                  
                  {/* Benefits Grid */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
                    {service.benefits.map((benefit, bidx) => (
                      <li key={bidx} className="flex items-start gap-2.5 text-slate-600 text-sm leading-relaxed">
                        <div className="w-5 h-5 rounded-full bg-brand-sky text-brand-blue flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                          <Check size={12} className="stroke-[3]" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={`/contact?type=request&service=${service.id}`}
                    variant="primary"
                    icon={<ArrowRight size={16} />}
                  >
                    Request {service.title}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SAFETY AND SCREENING BLUEPRINT */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white border border-slate-100 rounded-3xl p-8 sm:p-12 shadow-premium">
          <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-3.5 inline-block">
            Safety First
          </span>
          <h2 className="text-3xl font-bold text-brand-navy tracking-tight mb-6">
            The Safe In-Home Care Standard
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto mb-8">
            Safety is built into every step of our network operation. From our mandatory triple-checked background checks to our values-based matched caregiver introductory meetings, we ensure your family receives care that is clinical, licensed, secure, and compassionate.
          </p>
          <div className="flex gap-4 justify-center">
            <Button href="/contact?type=request" variant="primary">
              Schedule Home Consult
            </Button>
            <Button href="/about" variant="outline">
              Learn Vetting Process
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
