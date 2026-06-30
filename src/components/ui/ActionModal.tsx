"use client";

import React, { useState, useEffect } from "react";
import { X, Phone, Mail, Clock, ShieldCheck, Heart } from "lucide-react";
import Button from "@/components/ui/Button";

export type ModalMode = "request" | "apply" | "info";

interface OpenModalEventDetail {
  mode: ModalMode;
  title?: string;
}

export default function ActionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<ModalMode>("request");
  const [title, setTitle] = useState("");

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent<OpenModalEventDetail>;
      if (customEvent.detail) {
        setMode(customEvent.detail.mode);
        setTitle(customEvent.detail.title || "");
        setIsOpen(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
      }
    };

    window.addEventListener("open-care-modal", handleOpen);
    return () => window.removeEventListener("open-care-modal", handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeModal}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-slate-100 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header decoration */}
        <div className="bg-brand-sky p-6 flex justify-between items-start border-b border-slate-100/50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
              <Heart className="w-5.5 h-5.5 fill-brand-blue/10" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-brand-navy">
                {mode === "request" && "Schedule Care"}
                {mode === "apply" && "Join Our Network"}
                {mode === "info" && (title || "Service Details")}
              </h3>
              <p className="text-xs text-slate-500 font-semibold -mt-0.5">
                Caregivers Nearby
              </p>
            </div>
          </div>
          <button 
            onClick={closeModal} 
            className="p-1.5 rounded-lg hover:bg-slate-200/50 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-8 flex flex-col gap-6 text-left">
          {mode === "request" || mode === "info" ? (
            <>
              <p className="text-sm leading-relaxed text-slate-500">
                Ready to find compassionate care for your loved one? Speak directly with our care coordination team to design a personalized Care Blueprint.
              </p>
              
              <div className="flex flex-col gap-4">
                <a 
                  href="tel:+14047542651" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-brand-sky/40 border border-brand-blue/10 hover:bg-brand-sky/60 hover:border-brand-blue/20 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                    <Phone className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Call Our Coordinator</p>
                    <p className="text-lg font-bold text-brand-navy">+1 404-754-2651</p>
                  </div>
                </a>

                <a 
                  href="mailto:info@caregiversnearby.com?subject=Care%20Inquiry" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 hover:border-slate-200 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                    <Mail className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Email Our Care Team</p>
                    <p className="text-base font-bold text-brand-navy">info@caregiversnearby.com</p>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-slate-600">
                <ShieldCheck className="text-brand-emerald shrink-0" size={20} />
                <span>On-call caregiver coordinators are available 24/7 for urgent consultations.</span>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-slate-500">
                Thank you for your interest in joining America's most trusted care network. We support our professional caregivers with top pay, flexible shifts, and training.
              </p>

              <div className="flex flex-col gap-4">
                <a 
                  href="mailto:info@caregiversnearby.com?subject=Caregiver%20Application" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-brand-sky/40 border border-brand-blue/10 hover:bg-brand-sky/60 hover:border-brand-blue/20 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                    <Mail className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Submit Resume via Email</p>
                    <p className="text-base font-bold text-brand-navy">info@caregiversnearby.com</p>
                  </div>
                </a>

                <a 
                  href="tel:+14047542651" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/50 hover:border-slate-200 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center text-brand-blue shadow-sm shrink-0">
                    <Phone className="w-5.5 h-5.5 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wide">Call Recruitment Coordinator</p>
                    <p className="text-lg font-bold text-brand-navy">+1 404-754-2651</p>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <Clock className="text-brand-blue shrink-0" size={20} />
                <span>Hiring Office Hours: Monday to Friday, 9:00 AM - 5:00 PM EST.</span>
              </div>
            </>
          )}

          {/* Action Footer */}
          <div className="border-t border-slate-100 pt-6 flex justify-end">
            <Button onClick={closeModal} variant="outline" size="sm">
              Close
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

// Global Helper to open the modal
export function openCareModal(mode: ModalMode, title?: string) {
  const event = new CustomEvent<OpenModalEventDetail>("open-care-modal", {
    detail: { mode, title },
  });
  window.dispatchEvent(event);
}
