"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, Clock, ShieldCheck, AlertCircle, CheckCircle2, Send } from "lucide-react";
import { contactSchema, ContactFormData } from "@/lib/schema";
import { submitContactForm } from "@/app/actions/contact";
import Button from "@/components/ui/Button";
import JsonLd from "@/components/seo/JsonLd";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
      // Execute Next.js Server Action
      const result = await submitContactForm(payload, "client-browser");
      if (result.success) {
        setSuccess(true);
        reset();
      } else {
        setSubmitError(result.error || "An error occurred during submission.");
      }
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
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
    <div className="relative">
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HEADER */}
      <section className="relative bg-gradient-to-b from-brand-sky via-brand-sky/20 to-white py-16 sm:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-brand-sky-medium/35 blur-3xl -z-10 translate-x-1/4 -translate-y-1/4"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-brand-blue font-bold mb-3.5 inline-block">
            Connect With Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-navy tracking-tight mb-6">
            Begin Your Care Consultation
          </h1>
          <p className="text-slate-500 text-base leading-relaxed">
            Ready to design a custom Care Blueprint? Submit the Resend-powered contact intake form, or call our care coordinators directly.
          </p>
        </div>
      </section>

      {/* 2. SPLIT LAYOUT */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 flex flex-col gap-8 text-left">
              
              {/* Caregiver Image with scrubs */}
              <div className="relative h-72 w-full rounded-3xl overflow-hidden border border-slate-100 shadow-md bg-slate-100">
                <Image
                  src="/images/contact/contact.jpg"
                  alt="Hiring coordinator smiling warmly in scrubs"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Direct Info List */}
              <div className="flex flex-col gap-5">
                <a href="tel:+14047542651" className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:border-slate-200 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 text-brand-blue">
                    <Phone className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-0.5">Call Direct</h3>
                    <p className="font-semibold text-slate-700 text-sm">+1 404-754-2651</p>
                    <p className="text-xs text-slate-400 mt-1">Direct support active 24/7.</p>
                  </div>
                </a>

                <a href="mailto:info@caregiversnearby.com" className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:border-slate-200 transition-colors group">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 text-brand-blue">
                    <Mail className="w-5 h-5 group-hover:scale-105 transition-transform" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-0.5">Email Support</h3>
                    <p className="font-semibold text-slate-700 text-sm">info@caregiversnearby.com</p>
                    <p className="text-xs text-slate-400 mt-1">General inquiries and caregiver applications.</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0 text-brand-blue">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-navy text-sm mb-0.5">Business Hours</h3>
                    <p className="font-semibold text-slate-700 text-sm">Office: Mon-Fri, 8 AM - 6 PM EST</p>
                    <p className="text-xs text-slate-400 mt-1">Care coordinators remain on-call 24/7.</p>
                  </div>
                </div>
              </div>

              {/* Secure intake guarantee */}
              <div className="p-5 border border-slate-100 rounded-2xl bg-white/50 flex items-center gap-3.5">
                <ShieldCheck className="text-brand-emerald shrink-0" size={24} />
                <p className="text-xs text-slate-500 leading-relaxed">
                  <strong>Secure Intake:</strong> Your information is encrypted and protected. We do not sell or share contact details with third-party networks.
                </p>
              </div>

            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              {success ? (
                <div className="bg-brand-sky/40 border border-brand-blue/15 rounded-3xl p-8 sm:p-12 text-center shadow-sm animate-fadeIn">
                  <div className="w-16 h-16 bg-brand-emerald/10 text-brand-emerald rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-3">Care Inquiry Received</h3>
                  <p className="text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto text-sm">
                    Thank you! Your inquiry was successfully registered in our database and a confirmation email has been dispatched. Our team will contact you shortly.
                  </p>
                  <Button onClick={() => setSuccess(false)} variant="outline">
                    Send Another Inquiry
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-premium flex flex-col gap-5 text-left"
                >
                  <h3 className="text-xl font-bold text-brand-navy mb-1.5">Intake Request Form</h3>

                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Filter (Invisible to user) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="honeypot">Leave this field blank</label>
                    <input id="honeypot" name="honeypot" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* First Name & Last Name Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="firstName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        First Name *
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
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                          <AlertCircle size={12} />
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="lastName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
                          errors.lastName ? "border-red-300 bg-red-50/10" : "border-slate-200"
                        }`}
                        {...register("lastName")}
                      />
                      {errors.lastName && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                          <AlertCircle size={12} />
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Email Address *
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
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                          <AlertCircle size={12} />
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Phone Number *
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
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                          <AlertCircle size={12} />
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Service Needed Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="serviceNeeded" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Service Needed *
                    </label>
                    <select
                      id="serviceNeeded"
                      className={`w-full px-4 py-3 rounded-xl border text-sm bg-white transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue ${
                        errors.serviceNeeded ? "border-red-300 bg-red-50/10" : "border-slate-200"
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
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                        <AlertCircle size={12} />
                        {errors.serviceNeeded.message}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Message / Care Details *
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      placeholder="Please details any physical assistance requirements, schedule preferences, or cognitive goals..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none ${
                        errors.message ? "border-red-300 bg-red-50/10" : "border-slate-200"
                      }`}
                      {...register("message")}
                    />
                    {errors.message && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                        <AlertCircle size={12} />
                        {errors.message.message}
                      </span>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preferred Contact Method</span>
                    <div className="flex gap-6 mt-1.5">
                      {["email", "phone", "text"].map((method) => (
                        <label key={method} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer capitalize">
                          <input
                            type="radio"
                            value={method}
                            className="w-4 h-4 text-brand-blue border-slate-300 focus:ring-brand-blue cursor-pointer"
                            {...register("preferredContact")}
                          />
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                    {errors.preferredContact && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-0.5">
                        <AlertCircle size={12} />
                        {errors.preferredContact.message}
                      </span>
                    )}
                  </div>

                  {/* Agreement Checkbox */}
                  <div className="flex flex-col gap-1">
                    <label className="flex items-start gap-2.5 mt-3 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-brand-blue border-slate-300 rounded focus:ring-brand-blue cursor-pointer mt-0.5"
                        {...register("agreeToContact")}
                      />
                      <span className="text-xs text-slate-500 leading-normal select-none">
                        I agree to be contacted by Caregivers Nearby coordinates regarding home care blue-print inquiries.
                      </span>
                    </label>
                    {errors.agreeToContact && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1.5">
                        <AlertCircle size={12} />
                        {errors.agreeToContact.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    icon={isSubmitting ? undefined : <Send size={15} />}
                    variant="primary"
                    className="mt-4"
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
    </div>
  );
}
