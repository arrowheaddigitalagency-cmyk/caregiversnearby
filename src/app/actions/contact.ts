"use server";

import { Resend } from "resend";
import { contactSchema, ContactFormData } from "@/lib/schema";


// Simple in-memory rate limiter (stores timestamp by client identifiers/IPs)
const rateLimitCache = new Map<string, number>();


export async function submitContactForm(formData: any, clientIp: string = "unknown") {
  try {
    // 1. Rate Limiting Check (Max 1 submit per 60 seconds)
    const now = Date.now();
    const lastSubmitTime = rateLimitCache.get(clientIp);
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      const waitTime = Math.ceil((60000 - (now - lastSubmitTime)) / 1000);
      return { 
        success: false, 
        error: `Too many submissions. Please wait ${waitTime} seconds before sending another request.` 
      };
    }
    
    // 2. Honeypot Field Check
    if (formData.honeypot && formData.honeypot !== "") {
      console.warn("Spam attempt blocked via Honeypot check.");
      return { success: false, error: "Submission blocked by spam filters." };
    }

    // 3. Zod validation
    const parsedData = contactSchema.safeParse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      serviceNeeded: formData.serviceNeeded,
      otherService: formData.otherService,
      message: formData.message,
      preferredContact: formData.preferredContact,
      agreeToContact: formData.agreeToContact === "true" || formData.agreeToContact === true,
    });

    if (!parsedData.success) {
      return { success: false, error: parsedData.error.issues[0].message };
    }

    const data = parsedData.data;

    // 4. Update Rate Limit Cache
    rateLimitCache.set(clientIp, now);

    // 5. Resend Email Delivery
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "caregiversnearby@gmail.com";

    if (apiKey) {
      const resend = new Resend(apiKey);

      let formattedService = data.serviceNeeded.replace(/-/g, " ");
      if (data.serviceNeeded === "other" && data.otherService) {
        formattedService = `Other: ${data.otherService}`;
      }

      // A. Admin notification email
      try {
        await resend.emails.send({
          from: `Caregivers Nearby Portal <${fromEmail}>`,
          to: receiverEmail,
          replyTo: data.email,
          subject: "New Contact Form Submission - Caregivers Nearby",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #E5EEF5; border-radius: 20px; background-color: #FFFFFF; text-align: left;">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #E5EEF5; padding-bottom: 25px;">
                <img src="https://www.caregiversnearby.com/logo/caregiverslogo.png" alt="Caregivers Nearby Logo" style="max-height: 50px; width: auto; margin-bottom: 15px;" />
                <h2 style="color: #0B2D52; margin: 0; font-size: 22px; font-weight: bold; letter-spacing: -0.5px;">New Contact Form Submission</h2>
                <p style="color: #0DB7C8; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; tracking-wider;">Caregivers Nearby Portal</p>
              </div>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600; width: 40%;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${data.firstName} ${data.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Email Address</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;"><a href="mailto:${data.email}" style="color: #0DB7C8; text-decoration: none;">${data.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Phone Number</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;"><a href="tel:${data.phone}" style="color: #0DB7C8; text-decoration: none;">${data.phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Service Needed</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${formattedService}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Preferred Contact Method</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52; text-transform: capitalize;">${data.preferredContact}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Submission Time</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="margin-bottom: 20px;">
                <h4 style="color: #0B2D52; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Message / Care Details</h4>
                <div style="background-color: #F8FBFD; border-left: 4px solid #0DB7C8; padding: 15px; border-radius: 4px; color: #0B2D52; line-height: 1.6; font-size: 15px;">
                  ${data.message.replace(/\n/g, "<br/>")}
                </div>
              </div>
            </div>
          `,
        });
      } catch (adminError) {
        console.error("Resend admin notification email failed:", adminError);
      }

      // B. User confirmation email
      // Uses receiverEmail as sender so Resend can deliver it (no custom domain needed)
      try {
        await resend.emails.send({
          from: `Caregivers Nearby <${fromEmail}>`,
          to: receiverEmail, // send to admin, who forwards — OR use custom domain in FROM_EMAIL for direct user delivery
          replyTo: data.email,
          subject: `[AUTO-REPLY] We've Received Your Request - ${data.firstName} ${data.lastName}`,
          html: `<p>This is an auto-reply confirmation for ${data.firstName} ${data.lastName} (${data.email}). Their inquiry has been received.</p>`,
        });
      } catch {}

      // C. Direct user confirmation — works only when FROM_EMAIL is a verified custom domain
      try {
        await resend.emails.send({
          from: `Caregivers Nearby <${fromEmail}>`,
          to: data.email,
          subject: "We've Received Your Request - Caregivers Nearby",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 35px; border: 1px solid #E5EEF5; border-radius: 24px; background-color: #FFFFFF; text-align: left;">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #E5EEF5; padding-bottom: 25px;">
                <img src="https://www.caregiversnearby.com/logo/caregiverslogo.png" alt="Caregivers Nearby Logo" style="max-height: 50px; width: auto; margin-bottom: 15px;" />
                <p style="color: #0DB7C8; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; tracking-wider;">Compassionate Care. Trusted Caregivers. Right Nearby.</p>
              </div>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${data.firstName},</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Thank you for contacting Caregivers Nearby.</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">We have successfully received your request. Our team will review your inquiry and contact you as soon as possible.</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">If this is an urgent matter, please call us directly at <strong>+1 404-754-2651</strong>.</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">Thank you for trusting Caregivers Nearby.</p>
              <div style="border-top: 1px solid #E5EEF5; padding-top: 25px;">
                <p style="color: #62819f; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">Compassionate Care. Trusted Caregivers. Right Nearby.</p>
                <p style="color: #0B2D52; font-size: 15px; font-weight: bold; margin: 10px 0 0 0;">Caregivers Nearby</p>
                <p style="margin: 3px 0 0 0; font-size: 14px;"><a href="mailto:caregiversnearby@gmail.com" style="color: #0DB7C8; text-decoration: none;">caregiversnearby@gmail.com</a></p>
              </div>
            </div>
          `,
        });
      } catch (userEmailError) {
        console.error("Resend user confirmation email failed:", userEmailError);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action contact form error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
