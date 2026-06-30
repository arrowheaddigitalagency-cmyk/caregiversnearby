"use client";

import React, { useState } from "react";
import { Search, MapPin, CheckCircle, Bell, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CoverageMap() {
  const [zipCode, setZipCode] = useState("");
  const [searchResult, setSearchResult] = useState<{
    status: "active" | "expansion" | null;
    message: string;
  }>({ status: null, message: "" });
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistSuccess, setWaitlistSuccess] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipCode.trim()) return;

    // Simulating coverage check: 01 and 02 are New England/MA zip prefixes where we are active
    const cleanZip = zipCode.trim();
    if (/^(01|02)/.test(cleanZip)) {
      setSearchResult({
        status: "active",
        message: "Great news! Caregivers Nearby has active, background-checked caregivers available in your community. We can begin care as early as tomorrow.",
      });
    } else {
      setSearchResult({
        status: "expansion",
        message: `Caregivers Nearby is expanding rapidly! Zip code ${cleanZip} is marked as a Future Expansion Zone. Join our local family waitlist to be notified as soon as local care matches launch.`,
      });
    }
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail.trim()) return;
    setWaitlistSuccess(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
      {/* Left side: Interactive Finder */}
      <div className="lg:col-span-5 bg-white border border-slate-100 p-6 sm:p-8 rounded-2xl shadow-premium">
        <span className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-2.5 inline-block">
          Service Locations
        </span>
        <h3 className="text-2xl font-bold text-brand-navy mb-4">
          Check Availability Nearby
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          We are currently serving communities throughout Massachusetts and New England, with plans to expand our trusted care network nationwide. Enter your ZIP code to verify.
        </p>

        {/* Search form */}
        <form onSubmit={handleSearch} className="flex gap-2.5 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              pattern="[0-9]*"
              maxLength={5}
              placeholder="Enter 5-digit ZIP code"
              value={zipCode}
              onChange={(e) => {
                setZipCode(e.target.value.replace(/\D/g, ""));
                setSearchResult({ status: null, message: "" });
              }}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
            />
          </div>
          <Button type="submit" size="sm" variant="primary">
            Check
          </Button>
        </form>

        {/* Results view */}
        {searchResult.status === "active" && (
          <div className="p-5 bg-emerald-50/50 border border-emerald-100 rounded-xl flex items-start gap-3.5 animate-fadeIn">
            <CheckCircle className="text-brand-emerald shrink-0 mt-0.5" size={20} />
            <div className="text-sm">
              <p className="font-bold text-slate-800 mb-1">Active Coverage</p>
              <p className="text-slate-600 leading-relaxed mb-4">{searchResult.message}</p>
              <Button href="/contact?type=request" variant="secondary" size="sm">
                Request Care Consultation
              </Button>
            </div>
          </div>
        )}

        {searchResult.status === "expansion" && (
          <div className="p-5 bg-amber-50/50 border border-amber-100 rounded-xl flex items-start gap-3.5 animate-fadeIn">
            <Bell className="text-brand-gold shrink-0 mt-0.5" size={20} />
            <div className="text-sm w-full">
              <p className="font-bold text-slate-800 mb-1">Expansion Zone</p>
              <p className="text-slate-600 leading-relaxed mb-4">{searchResult.message}</p>
              
              {!waitlistSuccess ? (
                <form onSubmit={handleWaitlistSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter email address"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    className="flex-grow px-3 py-2 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:border-brand-blue"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-brand-gold text-white font-semibold rounded-lg text-xs hover:bg-amber-600 transition-colors cursor-pointer"
                  >
                    Join Waitlist
                  </button>
                </form>
              ) : (
                <p className="text-xs text-brand-emerald font-semibold flex items-center gap-1.5 mt-2 bg-white p-2 rounded-lg border border-emerald-100">
                  <CheckCircle size={14} /> You've been successfully added to the waitlist!
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right side: Styled SVG Map representation */}
      <div className="lg:col-span-7 flex justify-center items-center relative p-4 bg-slate-50/60 rounded-3xl border border-slate-100 min-h-[360px]">
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto text-slate-300 max-h-[400px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          {/* Mock Simplified USA Map Paths */}
          <path
            d="M150,150 L250,140 L350,120 L450,140 L550,120 L650,80 L750,70 L800,100 L850,90 L900,120 L870,200 L850,220 L860,250 L840,280 L880,300 L850,330 L800,340 L780,380 L730,360 L710,400 L680,380 L650,420 L620,410 L580,450 L530,420 L480,460 L450,480 L400,450 L380,480 L350,460 L320,480 L280,460 L240,430 L220,450 L180,410 L150,400 L120,380 L100,340 L70,300 L90,260 L60,220 L80,180 Z"
            className="fill-slate-100 stroke-slate-200"
          />
          {/* New England Active Region highlight */}
          <path
            d="M800,100 L850,90 L900,120 L870,200 L850,220 L840,200 L820,180 L810,140 Z"
            className="fill-brand-sky/60 stroke-brand-blue/30"
          />

          {/* Map Node Pulses */}
          {/* Boston - Active Node */}
          <circle cx="850" cy="140" r="14" className="fill-brand-blue/20 stroke-brand-blue/10 animate-ping" />
          <circle cx="850" cy="140" r="6" className="fill-brand-blue" />
          <text x="850" y="125" textAnchor="middle" className="fill-brand-navy font-bold text-[10px] select-none">
            Boston (HQ)
          </text>

          {/* New York - Expansion Node */}
          <circle cx="810" cy="180" r="12" className="fill-brand-teal/20 stroke-brand-teal/10 animate-pulse" />
          <circle cx="810" cy="180" r="5" className="fill-brand-teal" />
          <text x="810" y="198" textAnchor="middle" className="fill-slate-500 font-medium text-[8px] select-none">
            New York
          </text>

          {/* Chicago - Expansion Node */}
          <circle cx="680" cy="200" r="4" className="fill-brand-teal/70" />
          <text x="680" y="215" textAnchor="middle" className="fill-slate-500 font-medium text-[8px] select-none">
            Chicago
          </text>

          {/* Los Angeles - Expansion Node */}
          <circle cx="200" cy="380" r="4" className="fill-brand-teal/70" />
          <text x="200" y="395" textAnchor="middle" className="fill-slate-500 font-medium text-[8px] select-none">
            Los Angeles
          </text>

          {/* Miami - Expansion Node */}
          <circle cx="780" cy="460" r="4" className="fill-brand-teal/70" />
          <text x="780" y="475" textAnchor="middle" className="fill-slate-500 font-medium text-[8px] select-none">
            Miami
          </text>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3.5 py-2.5 rounded-xl border border-slate-100 flex gap-4 text-[10px] font-semibold text-slate-600 shadow-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-blue inline-block"></span>
            <span>Active Network</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-teal inline-block"></span>
            <span>Expansion Zones</span>
          </div>
        </div>
      </div>
    </div>
  );
}
