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
    if (apiKey) {
      const resend = new Resend(apiKey);

      // A. Admin notification email
      await resend.emails.send({
        from: "Caregivers Nearby Intake <onboarding@resend.dev>",
        to: "info@caregiversnearby.com",
        subject: `New Care Inquiry: ${data.firstName} ${data.lastName} - ${data.serviceNeeded}`,
        html: `
          <h3>New Care Inquiry Received</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Service Needed:</strong> ${data.serviceNeeded}</p>
          <p><strong>Preferred Contact Method:</strong> ${data.preferredContact}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #2563EB;">
            ${data.message.replace(/\n/g, "<br/>")}
          </blockquote>
          <p style="font-size:11px;color:#888;">Submitted at: ${new Date().toLocaleString()}</p>
        `,
      });

      // B. Visitor confirmation email
      await resend.emails.send({
        from: "Caregivers Nearby <onboarding@resend.dev>",
        to: data.email,
        subject: "We received your care inquiry - Caregivers Nearby",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #eee;border-radius:12px;">
            <h2 style="color:#2563EB;">Thank you for contacting Caregivers Nearby</h2>
            <p>Dear ${data.firstName},</p>
            <p>We have successfully received your inquiry for <strong>${data.serviceNeeded}</strong>.</p>
            <p>Our local care coordinators are reviewing your request and will follow up with you shortly via your preferred contact method (<strong>${data.preferredContact}</strong>).</p>
            <p>If you have any immediate questions, please call us directly at <strong>+1 404-754-2651</strong>.</p>
            <hr style="border:0;border-top:1px solid #eee;margin:20px 0;"/>
            <p style="font-size:12px;color:#666;">Warm regards,</p>
            <p style="font-weight:bold;color:#2563EB;margin:0;">Caregivers Nearby Team</p>
          </div>
        `,
      });
    } else {
      console.log("-----------------------------------------");
      console.log("MOCK EMAIL NOTIFICATION (Resend API key not set)");
      console.log(`To: info@caregiversnearby.com`);
      console.log(`Subject: New Inquiry - ${data.firstName} ${data.lastName}`);
      console.log(`To: ${data.email}`);
      console.log(`Subject: Care Inquiry Received`);
      console.log("-----------------------------------------");
    }

    return { success: true };
  } catch (error: any) {
    console.error("Server Action contact form error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
