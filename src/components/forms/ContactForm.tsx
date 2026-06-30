"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/schema";
import Button from "@/components/ui/Button";

interface ContactFormProps {
  defaultCareType?: string;
}

export default function ContactForm({ defaultCareType = "" }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      careType: defaultCareType,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  const careOptions = [
    { value: "companion-care", label: "Companion Care" },
    { value: "personal-assistance", label: "Personal Assistance" },
    { value: "meal-preparation", label: "Meal Preparation" },
    { value: "medication-reminders", label: "Medication Reminders" },
    { value: "transportation", label: "Transportation & Escort" },
    { value: "errands", label: "Errands & Shopping" },
    { value: "light-housekeeping", label: "Light Housekeeping" },
    { value: "hospital-transition", label: "Hospital Transition" },
    { value: "respite-care", label: "Respite Care" },
    { value: "dementia-care", label: "Alzheimer's & Dementia Companion Care" },
    { value: "general", label: "General Care Inquiry" },
  ];

  if (submitSuccess) {
    return (
      <div className="bg-brand-sky/40 border border-brand-blue/10 rounded-2xl p-8 text-center max-w-lg mx-auto shadow-sm">
        <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-bold text-brand-navy mb-3">Care Request Received</h3>
        <p className="text-slate-500 mb-6 leading-relaxed">
          Thank you for contacting Caregivers Nearby. Our care coordination team will review your requirements and reach out to you within the next 2 hours.
        </p>
        <Button onClick={() => setSubmitSuccess(false)} variant="outline">
          Send Another Request
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
        <h3 className="text-xl font-bold text-brand-navy">Request a Care Blueprint</h3>
        <p className="text-sm text-slate-500">
          Tell us about your needs and schedule a complimentary home care consultation.
        </p>
      </div>

      {/* Name Input */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="John Doe"
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
            errors.name ? "border-red-300 bg-red-50/10" : "border-slate-200"
          }`}
          {...register("name")}
        />
        {errors.name && (
          <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle size={12} />
            {errors.name.message}
          </span>
        )}
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
            placeholder="john@example.com"
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

      {/* Care Type Selection */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="careType" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Requested Service
        </label>
        <select
          id="careType"
          className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
            errors.careType ? "border-red-300 bg-red-50/10" : "border-slate-200"
          }`}
          {...register("careType")}
        >
          <option value="">-- Select a Care Service --</option>
          {careOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.careType && (
          <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle size={12} />
            {errors.careType.message}
          </span>
        )}
      </div>

      {/* Message Textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Tell Us About Your Loved One
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Please describe any physical or cognitive assistance needed, preferred scheduling, or general goals..."
          className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none ${
            errors.message ? "border-red-300 bg-red-50/10" : "border-slate-200"
          }`}
          {...register("message")}
        />
        {errors.message && (
          <span className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <AlertCircle size={12} />
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        icon={isSubmitting ? undefined : <Send size={16} />}
        variant="primary"
        className="mt-2"
        fullWidth
      >
        {isSubmitting ? "Submitting Request..." : "Request Care Consultation"}
      </Button>
    </form>
  );
}
