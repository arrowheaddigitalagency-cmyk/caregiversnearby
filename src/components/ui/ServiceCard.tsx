import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartHandshake, User, Utensils, Clock, Car, ShoppingBag, Home, Activity, Coffee, BrainCircuit } from "lucide-react";
import { Service } from "@/lib/data/content";

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
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-premium hover:shadow-2xl transition-all duration-500 ease-out hover:-translate-y-1.5 h-full">
      {/* Image Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={service.imageUrl}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          priority={false}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-80"></div>
        
        {/* Floating Icon Box */}
        <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-md text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
          <IconComponent className="w-6 h-6" />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-blue transition-colors duration-300 mb-2.5">
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 flex-grow mb-6">
          {service.description}
        </p>

        {/* Benefits list (preview of top 2) */}
        <ul className="mb-6 space-y-2 text-xs text-slate-600 border-t border-slate-50 pt-4">
          {service.benefits.slice(0, 2).map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-teal shrink-0"></span>
              <span className="truncate">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* Link / Button */}
        <Link
          href={`/services#${service.id}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-teal hover:text-brand-teal-hover transition-colors mt-auto group/link"
        >
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
