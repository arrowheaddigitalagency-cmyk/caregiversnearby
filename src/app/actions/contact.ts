"use server";

import { Resend } from "resend";
import { contactSchema, ContactFormData } from "@/lib/schema";
import fs from "fs";
import path from "path";

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
    
    // 2. Honeypot Field Check (if filled, silently fail or return error to prevent spam bot submissions)
    if (formData.honeypot && formData.honeypot !== "") {
      console.warn("Spam attempt blocked via Honeypot check.");
      return { success: false, error: "Submission blocked by spam filters." };
    }

    // Turnstile verification removed as Web3Forms handles spam.

    // 3. Zod validation
    const parsedData = contactSchema.safeParse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      serviceNeeded: formData.serviceNeeded,
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

    // 5. Mock DB Persistence: Append record to local JSON file
    const dbDir = path.join(process.cwd(), "src/lib");
    const dbPath = path.join(dbDir, "db.json");
    
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    let database: any[] = [];
    if (fs.existsSync(dbPath)) {
      try {
        const fileContent = fs.readFileSync(dbPath, "utf-8");
        database = JSON.parse(fileContent);
      } catch (err) {
        console.error("Failed to parse db.json, resetting:", err);
      }
    }
    
    database.push({
      ...data,
      id: `enquiry_${Date.now()}`,
      clientIp,
      timestamp: new Date().toISOString(),
    });
    
    fs.writeFileSync(dbPath, JSON.stringify(database, null, 2));

    // 6. Web3Forms API Integration (Main Email Receiver for Admin)
    const web3formsAccessKey = "09897199-a6c3-4b13-9e30-d20c6c861b9b";
    
    try {
      const web3Response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: "New Contact Form Submission - Caregivers Nearby",
          from_name: "Caregivers Nearby Website",
          name: `${data.firstName} ${data.lastName}`,
          email: data.email, // This allows Web3Forms to send an auto-response to the user if enabled
          phone: data.phone,
          service_needed: data.serviceNeeded,
          preferred_contact: data.preferredContact,
          message: data.message,
          timestamp: new Date().toLocaleString(),
          ip_address: clientIp,
          // Adding logo field as requested, which Web3Forms can use in its email templates
          logo: "https://www.caregiversnearby.com/logo/logo.svg"
        }),
      });

      const web3Result = await web3Response.json();
      if (!web3Result.success) {
        console.error("Web3Forms error details:", web3Result);
        return { success: false, error: web3Result.message || "Failed to submit request via Web3Forms. Please try again." };
      }
    } catch (web3Error: any) {
      console.error("Web3Forms network error:", web3Error);
      return { success: false, error: "Network error trying to contact Web3Forms. Please try again." };
    }

    // 7. Resend Email Delivery (Visitor Confirmation Email Fallback)
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (apiKey) {
      const resend = new Resend(apiKey);

      try {
        // B. Visitor confirmation email
        await resend.emails.send({
          from: `Caregivers Nearby <${fromEmail}>`,
        to: data.email,
        subject: "We've Received Your Request",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 35px; border: 1px solid #E5EEF5; border-radius: 24px; background-color: #FFFFFF; text-align: left;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #E5EEF5; padding-bottom: 25px;">
              <h2 style="color: #0B2D52; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">Caregivers Nearby</h2>
              <p style="color: #0DB7C8; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; tracking-wider;">Compassionate Care. Trusted Caregivers. Right Nearby.</p>
            </div>
            
            <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${data.firstName},</p>
            
            <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Thank you for contacting Caregivers Nearby.</p>
            
            <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">We have successfully received your request.</p>
            
            <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Our team will review your inquiry and contact you as soon as possible.</p>
            
            <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 24px 0;">If this is an urgent matter, please call us directly.</p>
            
            <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">Thank you for trusting Caregivers Nearby.</p>
            
            <div style="border-top: 1px solid #E5EEF5; padding-top: 25px;">
              <p style="color: #62819f; font-size: 14px; line-height: 1.6; margin: 0; font-style: italic;">Compassionate Care. Trusted Caregivers. Right Nearby.</p>
              <p style="color: #0B2D52; font-size: 15px; font-weight: bold; margin: 10px 0 0 0;">Caregivers Nearby</p>
              <p style="margin: 3px 0 0 0; font-size: 14px;"><a href="mailto:caregiversnearby@gmail.com" style="color: #0DB7C8; text-decoration: none;">caregiversnearby@gmail.com</a></p>
            </div>
          </div>
        `,
        });
      } catch (resendError) {
        // Log the error but do not fail the request since Web3Forms successfully notified the admin
        console.error("Resend auto-response email to visitor failed:", resendError);
      }
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action contact form error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
