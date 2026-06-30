"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FilePlus, CheckCircle2, AlertCircle } from "lucide-react";
import { caregiverSchema, CaregiverFormData } from "@/lib/schema";
import Button from "@/components/ui/Button";

export default function CaregiverForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CaregiverFormData>({
    resolver: zodResolver(caregiverSchema),
  });

  const onSubmit = async (data: CaregiverFormData) => {
    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  const expOptions = [
    { value: "entry", label: "Less than 1 year" },
    { value: "mid-1", label: "1 to 3 years" },
    { value: "mid-2", label: "3 to 5 years" },
    { value: "senior", label: "5+ years" },
  ];

  const availOptions = [
    { value: "full-time", label: "Full-Time (30+ hours/week)" },
    { value: "part-time", label: "Part-Time (10-30 hours/week)" },
    { value: "overnight", label: "Overnight shifts" },
    { value: "live-in", label: "Live-In care" },
    { value: "flexible", label: "Flexible/On-Call" },
  ];

  if (submitSuccess) {
    return (
      <div className="bg-brand-sky/40 border border-brand-blue/10 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy mb-3">Application Submitted!</h3>
        <p className="text-slate-500 mb-6 leading-relaxed">
          Thank you for applying to the Caregivers Nearby network. Our recruitment coordinator will review your application and contact you for an interview within 24 business hours.
        </p>
        <Button onClick={() => setSubmitSuccess(false)} variant="outline">
          Apply Again
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-premium flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold text-brand-navy">Caregiver Application Form</h3>
        <p className="text-sm text-slate-500">
          Join a compassionate team. Fill out the application below, and let's get started.
        </p>
      </div>

      {/* Name Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Jane"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
              errors.firstName ? "border-red-300 bg-red-50/10" : "border-slate-200"
            }`}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Smith"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
              errors.lastName ? "border-red-300 bg-red-50/10" : "border-slate-200"
            }`}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      {/* Email & Phone Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="jane@example.com"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
              errors.email ? "border-red-300 bg-red-50/10" : "border-slate-200"
            }`}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(555) 000-0000"
            className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
              errors.phone ? "border-red-300 bg-red-50/10" : "border-slate-200"
            }`}
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {errors.phone.message}
            </span>
          )}
        </div>
      </div>

      {/* Experience & Availability Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="experience" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Years of Experience
          </label>
          <select
            id="experience"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
              errors.experience ? "border-red-300 bg-red-50/10" : "border-slate-200"
            }`}
            {...register("experience")}
          >
            <option value="">-- Select Experience --</option>
            {expOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.experience && (
            <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {errors.experience.message}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="availability" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
            Availability
          </label>
          <select
            id="availability"
            className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
              errors.availability ? "border-red-300 bg-red-50/10" : "border-slate-200"
            }`}
            {...register("availability")}
          >
            <option value="">-- Select Availability --</option>
            {availOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.availability && (
            <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
              <AlertCircle size={12} />
              {errors.availability.message}
            </span>
          )}
        </div>
      </div>

      {/* About Me / Background Textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="aboutMe" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Professional Background & Certifications
        </label>
        <textarea
          id="aboutMe"
          rows={4}
          placeholder="Please describe any certifications (e.g. HHA, CNA, CPR), relevant work history, and why you are passionate about caregiver work..."
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none ${
            errors.aboutMe ? "border-red-300 bg-red-50/10" : "border-slate-200"
          }`}
          {...register("aboutMe")}
        />
        {errors.aboutMe && (
          <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle size={12} />
            {errors.aboutMe.message}
          </span>
        )}
      </div>

      {/* Resume File Note (Mock Field) */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
        <FilePlus className="text-slate-400 shrink-0" size={20} />
        <div className="text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-0.5">Resume & Credentials</p>
          <p>You will be requested to upload copies of your CNA/HHA/CPR licenses and credentials during your screening phone call.</p>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        variant="secondary"
        className="mt-2"
        fullWidth
      >
        {isSubmitting ? "Submitting Application..." : "Submit Caregiver Application"}
      </Button>
    </form>
  );
}
