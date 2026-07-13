"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Mail, Clock, ShieldCheck, AlertCircle, CheckCircle2, Send, Briefcase, Calendar } from "lucide-react";
import { caregiverSchema, CaregiverFormData } from "@/lib/schema";
import { submitCaregiverForm } from "@/app/actions/caregiver";
import Button from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import JsonLd from "@/components/seo/JsonLd";
import { usStates, getStateFullName } from "@/lib/states";

export default function JoinUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<CaregiverFormData>({
    resolver: zodResolver(caregiverSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      experience: "",
      availability: "",
      state: "",
      aboutMe: "",
    },
  });

  const onSubmit = async (data: CaregiverFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Collect standard fields along with a mock honeypot field
    const payload = {
      ...data,
      honeypot: (document.getElementById("honeypot") as HTMLInputElement)?.value || "",
    };

    try {
      // 1. Client-Side Web3Forms Submission (Main Admin Email)
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f11d079b-ce79-431d-ae98-d4de25218c42",
          subject: `New Caregiver Application - ${data.firstName} ${data.lastName}`,
          from_name: "Caregivers Nearby Recruitment Portal",
          "Applicant Name": `${data.firstName} ${data.lastName}`,
          "Email Address": data.email,
          "Phone Number": data.phone,
          "Years of Experience": data.experience,
          "General Availability": data.availability,
          "State": getStateFullName(data.state),
          "Experience & Background": data.aboutMe,
          "Submission Time": new Date().toLocaleString(),
        }),
      });

      const web3Result = await web3Response.json();
      if (!web3Result.success) {
        throw new Error(web3Result.message || "Failed to submit application via Web3Forms.");
      }

      // 2. Execute Next.js Server Action (For Validation, Fallback Email, Rate Limiting)
      const result = await submitCaregiverForm(payload, "client-browser");
      if (result.success) {
        setSuccess(true);
        setToastMessage("Application submitted successfully!");
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

  const experienceOptions = [
    { value: "less-than-1", label: "Less than 1 year" },
    { value: "1-2", label: "1 to 2 years" },
    { value: "3-5", label: "3 to 5 years" },
    { value: "5-10", label: "5 to 10 years" },
    { value: "10-plus", label: "10+ years" },
  ];

  const availabilityOptions = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "live-in", label: "Live-In" },
    { value: "overnight", label: "Overnight / On-Call" },
    { value: "weekends", label: "Weekends Only" },
  ];


  const breadcrumbData = [
    { name: "Home", item: "https://www.caregiversnearby.com" },
    { name: "Join Us", item: "https://www.caregiversnearby.com/join-us" },
  ];

  return (
    <div className="relative bg-[#FAFAFA]">
      <JsonLd type="Breadcrumbs" data={breadcrumbData} />

      {/* 1. HEADER */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden border-b border-slate-100">
        {/* Background Image with Low Opacity */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1920&q=80"
            alt="Caregiver team support background"
            fill
            className="object-cover opacity-[0.15] select-none pointer-events-none"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-sky/20 blur-3xl z-0 translate-x-1/4 -translate-y-1/4 rounded-full"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-left">
            <span className="text-sm uppercase tracking-widest text-brand-teal font-bold mb-4 inline-block">
              Careers / Join Our Team
            </span>
            <h1 className="text-5xl sm:text-6xl font-bold text-brand-navy tracking-tight mb-8 leading-tight">
              Join us as a <span className="text-brand-blue">Caregiver.</span>
            </h1>
            <p className="text-slate-500 text-lg sm:text-xl leading-relaxed font-light">
              Make a meaningful difference in the lives of seniors in our community. We are looking for compassionate, dedicated, and trusted caregivers to join our expanding network.
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

              {/* Premium Image (Caregiver theme) */}
              <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80"
                  alt="Compassionate caregiver talking and supporting an elderly person with a smile"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Recruitment Message */}
              <div className="flex flex-col gap-6">
                <div className="p-8 rounded-[2rem] bg-white border border-slate-100 shadow-premium hover:shadow-xl transition-all duration-300">
                  <h3 className="font-bold text-brand-navy text-xl mb-4 flex items-center gap-2">
                    <Briefcase className="text-brand-teal" size={24} />
                    Why Join Our Network?
                  </h3>
                  <ul className="space-y-4 text-slate-500 font-light text-base">
                    <li className="flex items-start gap-2.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-teal mt-2"></span>
                      <span><strong>Flexible Scheduling:</strong> Match shifts around your personal availability.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-teal mt-2"></span>
                      <span><strong>Competitive Compensation:</strong> We value our caregivers and offer fair rates.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-teal mt-2"></span>
                      <span><strong>Meaningful Work:</strong> Provide premium one-on-one companion care and personal assistance.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-teal mt-2"></span>
                      <span><strong>Ongoing Support:</strong> Direct connection to our local care coordinators who support you.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Secure application guarantee */}
              <div className="p-6 rounded-[2rem] bg-brand-navy flex items-start gap-4 shadow-xl">
                <ShieldCheck className="text-brand-teal shrink-0 mt-1" size={28} strokeWidth={1.5} />
                <p className="text-sm text-white/80 leading-relaxed font-light">
                  <strong className="text-white font-bold block mb-1">Application Privacy</strong>
                  All submitted professional background details are encrypted, kept strictly confidential, and are only accessed by our hiring coordinators.
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
                  <h3 className="text-3xl font-bold text-brand-navy mb-4">Application Submitted!</h3>
                  <p className="text-slate-500 mb-10 leading-relaxed max-w-md mx-auto text-lg font-light">
                    Thank you for applying to join Caregivers Nearby. We have received your application and sent a confirmation email to you. Our coordinators will review your details shortly.
                  </p>
                  <Button onClick={() => setSuccess(false)} variant="outline" size="lg">
                    Submit Another Application
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="bg-white rounded-[3rem] p-8 sm:p-12 shadow-2xl flex flex-col gap-8 text-left border border-slate-100"
                >
                  <div>
                    <h3 className="text-3xl font-bold text-brand-navy mb-2">Caregiver Application</h3>
                    <p className="text-slate-500 font-light">Please fill in your details below. We look forward to reviewing your background.</p>
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="experience" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Years of Experience *
                      </label>
                      <Controller
                        control={control}
                        name="experience"
                        render={({ field: { value, onChange } }) => (
                          <CustomSelect
                            options={experienceOptions}
                            value={value}
                            onChange={onChange}
                            placeholder="-- Select Experience --"
                            error={errors.experience?.message}
                          />
                        )}
                      />
                      {errors.experience && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.experience.message}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="availability" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        General Availability *
                      </label>
                      <Controller
                        control={control}
                        name="availability"
                        render={({ field: { value, onChange } }) => (
                          <CustomSelect
                            options={availabilityOptions}
                            value={value}
                            onChange={onChange}
                            placeholder="-- Select Availability --"
                            error={errors.availability?.message}
                          />
                        )}
                      />
                      {errors.availability && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.availability.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="state" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        State *
                      </label>
                      <Controller
                        control={control}
                        name="state"
                        render={({ field: { value, onChange } }) => (
                          <CustomSelect
                            options={usStates}
                            value={value}
                            onChange={onChange}
                            placeholder="-- Select State --"
                            error={errors.state?.message}
                          />
                        )}
                      />
                      {errors.state && (
                        <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                          <AlertCircle size={14} />
                          {errors.state.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="aboutMe" className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                      Tell Us About Your Experience & Background * (Min 20 characters)
                    </label>
                    <textarea
                      id="aboutMe"
                      rows={5}
                      placeholder="Please share details about your history in caregiving, certifications (CPR, CNA, First Aid), and what makes you a trusted caregiver..."
                      className={`w-full px-5 py-4 rounded-2xl border text-base transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none ${errors.aboutMe ? "border-red-300 bg-red-50" : "border-slate-200 bg-[#FAFAFA]"
                        }`}
                      {...register("aboutMe")}
                    />
                    {errors.aboutMe && (
                      <span className="text-xs text-red-500 flex items-center gap-1.5 mt-1">
                        <AlertCircle size={14} />
                        {errors.aboutMe.message}
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
                    {isSubmitting ? "Submitting Application..." : "Submit Application"}
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
