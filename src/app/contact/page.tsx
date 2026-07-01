"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, Clock, ShieldCheck, AlertCircle, CheckCircle2, Send, Heart } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/schema";
import { submitContactForm } from "@/app/actions/contact";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      preferredContact: "email",
      agreeToContact: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Collect standard fields along with a mock honeypot field
    const payload = {
      ...data,
      honeypot: (document.getElementById("honeypot") as HTMLInputElement)?.value || "",
    };

    try {
      // 1. Client-Side Web3Forms Submission (Main Admin Email)
      // Web3Forms blocks server-side requests to prevent spam, so it MUST run in the browser.
      const formattedService = data.serviceNeeded
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const formattedPreferredContact = data.preferredContact
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "09897199-a6c3-4b13-9e30-d20c6c861b9b",
          subject: "New Contact Form Submission - Caregivers Nearby",
          from_name: "Caregivers Nearby Website",
          "Visitor Name": `${data.firstName} ${data.lastName}`,
          "Email Address": data.email,
          "Phone Number": data.phone,
          "Service Needed": formattedService,
          "Preferred Contact Method": formattedPreferredContact,
          "Care Details / Message": data.message,
          "Submission Time": new Date().toLocaleString(),
        }),
      });

      const web3Result = await web3Response.json();
      if (!web3Result.success) {
        throw new Error(web3Result.message || "Failed to submit request via Web3Forms.");
      }

      // 2. Execute Next.js Server Action (For Validation, Fallback Email, Rate Limiting)
      const result = await submitContactForm(payload, "client-browser");
      if (result.success) {
        setSuccess(true);
        setToastMessage("Inquiry submitted successfully!");
        reset();
        setTimeout(() => setToastMessage(null), 5000);
      } else {
        setSubmitError(result.error || "An error occurred during submission.");
        setToastMessage(result.error || "Submission failed.");
        setTimeout(() => setToastMessage(null), 5000);
      }
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
      setToastMessage(err.message || "Something went wrong.");
      setTimeout(() => setToastMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: "companion-care", label: "Companion Care" },
    { value: "personal-assistance", label: "Personal Assistance" },
    { value: "meal-preparation", label: "Meal Preparation" },
    { value: "medication-reminders", label: "Medication Reminders" },
    { value: "transportation", label: "Transportation & Escort" },
    { value: "errands-shopping", label: "Errands & Shopping" },
    { value: "light-housekeeping", label: "Light Housekeeping" },
    { value: "hospital-transition", label: "Hospital Transition" },
    { value: "respite-care", label: "Respite Care" },
    { value: "alzheimers-care", label: "Alzheimer's & Dementia Support" },
  ];

  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "Contact Us", item: "https://www.caregiversnearby.com/contact" },
  ];

  return (
    <div className="relative bg-[#FAFAFA]">
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HEADER */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sky/20 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl text-left">
            <span className="text-sm uppercase tracking-widest text-brand-teal font-bold mb-4 inline-block">
              Connect With Us
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-navy tracking-tight mb-8 leading-tight">
              Let's design your family's <span className="text-brand-blue">Care Blueprint.</span>
            </h1>
            <p className="text-slate-500 text-lg sm:text-xl leading-relaxed font-light">
              Ready to find the perfect caregiver match? Submit your intake request or call our care coordinators directly to get started.
            </p>
          </div>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">

            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 flex flex-col gap-10 text-left">

              {/* Premium Image */}
              <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100">
                <Image
                  src="/images/contact/contact.png"
                  alt="Care coordinator talking on the phone with a family"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Direct Info List */}
              <div className="flex flex-col gap-6">
                <a href="tel:+14047542651" className="flex items-start gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-premium hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-sky flex items-center justify-center shadow-sm shrink-0 text-brand-blue group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">Call Direct</h3>
                    <p className="text-slate-500 text-base mb-1">+1 404-754-2651</p>
                    <p className="text-sm text-slate-400 font-light">Direct support active 24/7.</p>
                  </div>
                </a>

                <a href="mailto:caregiversnearby@gmail.com" className="flex items-start gap-5 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-premium hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 rounded-2xl bg-brand-sky flex items-center justify-center shadow-sm shrink-0 text-brand-blue group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-lg mb-1">Email Support</h3>
                    <p className="text-slate-500 text-base mb-1">caregiversnearby@gmail.com</p>
                    <p className="text-sm text-slate-400 font-light">General inquiries and care coordination.</p>
                  </div>
                </a>
              </div>

              {/* Secure intake guarantee */}
              <div className="p-6 rounded-[2rem] bg-brand-navy flex items-start gap-4 shadow-xl">
                <ShieldCheck className="text-brand-teal shrink-0 mt-1" size={28} strokeWidth={1.5} />
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  <strong className="text-white font-bold block mb-1">Secure Intake</strong>
                  Your information is encrypted and protected. We do not sell or share contact details with third-party networks.
                </p>
              </div>

            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              {success ? (
                <div className="bg-white rounded-[3rem] p-12 text-center shadow-2xl border border-slate-100 animate-fadeIn h-full flex flex-col items-center justify-center min-h-[600px]">
                  <div className="w-24 h-24 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-bold text-brand-navy mb-4">Care Inquiry Received</h3>
                  <p className="text-slate-500 mb-10 leading-relaxed max-w-md mx-auto text-lg font-light">
                    Thank you! Your inquiry was successfully registered. Our care coordinators will reach out shortly to discuss your custom blueprint.
                  </p>
                  <Button onClick={() => setSuccess(false)} variant="outline" size="lg">
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl flex flex-col gap-8 text-left border border-slate-100"
                >
                  <div>
                    <h3 className="text-3xl font-bold text-brand-navy mb-2">Intake Request</h3>
                    <p className="text-slate-500 font-light">Please provide the details below so we can best assist you.</p>
                  </div>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-semibold flex items-center gap-3">
                      <AlertCircle size={20} className="shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Filter (Invisible to user) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave this field blank</label>
                    <input id="honeypot" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="firstName" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Jane"
                        className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${errors.firstName ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                          }`}
                        {...register("firstName")}
                      />
                      {errors.firstName && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="lastName" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${errors.lastName ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                          }`}
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="jane@example.com"
                        className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${errors.email ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                          }`}
                        {...register("email")}
                      />
                      {errors.email && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Phone Number *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(555) 000-0000"
                        className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${errors.phone ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                          }`}
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="serviceNeeded" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Service Needed *
                    </label>
                    <select
                      id="serviceNeeded"
                      className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${errors.serviceNeeded ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                        }`}
                      {...register("serviceNeeded")}
                    >
                      <option value="">-- Select Service Needed --</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.serviceNeeded && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={14} />
                        {errors.serviceNeeded.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Message / Care Details *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      placeholder="Please share any requirements or preferences..."
                      className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none ${errors.message ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                        }`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={14} />
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Preferred Contact Method</span>
                    <div className="flex gap-8">
                      {["email", "phone", "text"].map((method) => (
                        <label key={method} className="flex items-center gap-2.5 text-base text-slate-600 cursor-pointer capitalize">
                          <input
                            type="radio"
                            value={method}
                            className="w-5 h-5 text-brand-blue border-slate-300 focus:ring-brand-blue cursor-pointer"
                            {...register("preferredContact")}
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                    {errors.preferredContact && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={14} />
                        {errors.preferredContact.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="flex items-start gap-3 mt-4 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-brand-blue border-slate-300 rounded focus:ring-brand-blue cursor-pointer mt-1"
                        {...register("agreeToContact")}
                      />
                      <span className="text-sm text-slate-500 leading-relaxed font-light">
                        I agree to be contacted by Caregivers Nearby coordinators regarding home care blueprint inquiries.
                      </span>
                    </label>
                    {errors.agreeToContact && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={14} />
                        {errors.agreeToContact.message}
                      </span>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : <Send size={18} />}
                    variant="primary"
                    className="mt-6 h-14 text-lg shadow-xl shadow-brand-blue/20 rounded-2xl"
                    fullWidth
                  >
                    {isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry"}
                  </Button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Success Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-[#0B2D52] text-white px-6 py-4 rounded-2xl shadow-2xl border border-[#E5EEF5]/20 flex items-center gap-3 z-50 transition-all duration-300">
          <CheckCircle2 className="text-[#0DB7C8] w-6 h-6 shrink-0" />
          <span className="font-semibold text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
