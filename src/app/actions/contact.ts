"use server";

import { Resend } from "resend";
import { contactSchema, ContactFormData } from "@/lib/schema";
import fs from "fs";
import path from "path";

// Simple in-memory rate limiter (stores timestamp by client identifiers/IPs)
const rateLimitCache = new Map<string, number>();

async function verifyTurnstileToken(token: string, secretKey: string) {
  // Always approve standard Cloudflare testing keys without making a network request
  if (secretKey === "1x00000000000000000000000000000000") {
    console.log("Turnstile test key detected. Auto-approving submission.");
    return true;
  }

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Turnstile verification error:", error);
    // If it's a local development environment and we encounter a network fetch error, bypass the verification
    if (process.env.NODE_ENV === "development") {
      console.warn("Turnstile network verification failed in development. Bypassing check.");
      return true;
    }
    return false;
  }
}

export async function submitContactForm(formData: any, clientIp: string = "unknown", turnstileToken?: string) {
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

    // 2b. Turnstile Verification Check
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
    if (turnstileSecret) {
      if (!turnstileToken) {
        return { success: false, error: "Spam verification token is missing. Please try again." };
      }
      const isVerified = await verifyTurnstileToken(turnstileToken, turnstileSecret);
      if (!isVerified) {
        return { success: false, error: "Spam verification failed. Please try again." };
      }
    }

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

    // 6. Resend Email Deliveries
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "caregiversnearby@gmail.com";
    const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

    if (apiKey) {
      const resend = new Resend(apiKey);

      // A. Admin notification email
      await resend.emails.send({
        from: `Caregivers Nearby Portal <${fromEmail}>`,
        to: receiverEmail,
        subject: "New Contact Form Submission - Caregivers Nearby",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #E5EEF5; border-radius: 20px; background-color: #FFFFFF;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h2 style="color: #0B2D52; margin: 0; font-size: 24px; font-weight: bold; letter-spacing: -0.5px;">New Contact Form Submission</h2>
              <p style="color: #0DB7C8; margin: 5px 0 0 0; font-size: 14px; font-weight: 600; text-transform: uppercase; tracking-wider;">Caregivers Nearby</p>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600; width: 40%;">First Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${data.firstName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Last Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${data.lastName}</td>
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
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52; text-transform: capitalize;">${data.serviceNeeded.replace(/-/g, " ")}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Preferred Contact Method</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52; text-transform: capitalize;">${data.preferredContact}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Date & Time</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${new Date().toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">IP Address</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${clientIp}</td>
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
    } else {
      console.log("-----------------------------------------");
      console.log("MOCK EMAIL NOTIFICATION (Resend API key not set)");
      console.log(`To: ${receiverEmail}`);
      console.log(`Subject: New Contact Form Submission - Caregivers Nearby`);
      console.log(`To: ${data.email}`);
      console.log(`Subject: We've Received Your Request`);
      console.log("-----------------------------------------");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action contact form error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
