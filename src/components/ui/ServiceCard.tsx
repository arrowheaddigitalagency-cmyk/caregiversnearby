"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, HeartHandshake, User, Utensils, Clock, Car, ShoppingBag, Home, Activity, Coffee, BrainCircuit } from "lucide-react";
import { Service } from "@/lib/data/content";
import { openCareModal } from "@/components/ui/ActionModal";

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

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = iconMap[service.iconName] || HeartHandshake;

  return (
    <div 
      onClick={() => openCareModal("info", service.title)}
      className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100/80 shadow-premium hover:shadow-2xl hover:border-transparent transition-all duration-500 ease-out hover:-translate-y-1.5 h-full cursor-pointer"
    >
      {/* Visual Hover Gradient Border Overlay */}
      <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-tr from-brand-blue/0 via-brand-teal/0 to-brand-gold/0 group-hover:from-brand-blue/30 group-hover:via-brand-teal/30 group-hover:to-brand-gold/30 transition-all duration-500 -z-10"></div>
      <div className="absolute inset-[1px] bg-white rounded-3xl -z-10"></div>

      {/* Image Section */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          priority={false}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent opacity-70"></div>
        
        {/* Floating Glass Icon Box */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center shadow-md text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 border border-white/40">
          <IconComponent className="w-5.5 h-5.5" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 text-left">
        <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300 mb-2">
          {service.title}
        </h3>
        <p className="text-xs sm:text-sm leading-relaxed text-slate-500 flex-grow mb-6">
          {service.description}
        </p>

        {/* Benefits list (preview of top 2) */}
        <ul className="mb-6 space-y-2.5 text-xs text-slate-600 border-t border-slate-100 pt-4">
          {service.benefits.slice(0, 2).map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0"></span>
              <span className="truncate">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Link / Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            openCareModal("info", service.title);
          }}
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-teal hover:text-brand-teal-hover transition-colors mt-auto group/link cursor-pointer text-left"
        >
          <span>Learn more</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
