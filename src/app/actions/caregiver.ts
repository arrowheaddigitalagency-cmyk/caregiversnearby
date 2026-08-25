"use server";

import { Resend } from "resend";
import { caregiverSchema, CaregiverFormData } from "@/lib/schema";
import { getStateFullName } from "@/lib/states";

// Simple in-memory rate limiter (stores timestamp by client identifiers/IPs)
const rateLimitCache = new Map<string, number>();

export async function submitCaregiverForm(formData: any, clientIp: string = "unknown") {
  try {
    // 1. Rate Limiting Check (Max 1 submit per 60 seconds)
    const now = Date.now();
    const lastSubmitTime = rateLimitCache.get(clientIp);
    if (lastSubmitTime && now - lastSubmitTime < 60000) {
      const waitTime = Math.ceil((60000 - (now - lastSubmitTime)) / 1000);
      return { 
        success: false, 
        error: `Too many submissions. Please wait ${waitTime} seconds before submitting another application.` 
      };
    }
    
    // 2. Honeypot Field Check
    if (formData.honeypot && formData.honeypot !== "") {
      console.warn("Spam attempt blocked via Honeypot check.");
      return { success: false, error: "Submission blocked by spam filters." };
    }

    // 3. Zod validation
    const parsedData = caregiverSchema.safeParse({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      experience: formData.experience,
      availability: formData.availability,
      state: formData.state,
      aboutMe: formData.aboutMe,
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

      // A. Admin notification email
      try {
        await resend.emails.send({
          from: `Caregivers Nearby Portal <${fromEmail}>`,
          to: receiverEmail,
          replyTo: data.email,
          subject: `New Caregiver Application - ${data.firstName} ${data.lastName}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #E5EEF5; border-radius: 20px; background-color: #FFFFFF; text-align: left;">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #E5EEF5; padding-bottom: 25px;">
                <img src="https://www.caregiversnearby.com/logo/caregiverslogo.png" alt="Caregivers Nearby Logo" style="max-height: 50px; width: auto; margin-bottom: 15px;" />
                <h2 style="color: #0B2D52; margin: 0; font-size: 22px; font-weight: bold; letter-spacing: -0.5px;">New Caregiver Application</h2>
                <p style="color: #0DB7C8; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; tracking-wider;">Join Our Team Intake</p>
              </div>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600; width: 40%;">Applicant Name</td>
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
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">State</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${getStateFullName(data.state)}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Years of Experience</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${data.experience}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">General Availability</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${data.availability}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #62819f; font-weight: 600;">Submission Time</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5EEF5; color: #0B2D52;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
              <div style="margin-bottom: 20px;">
                <h4 style="color: #0B2D52; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">Experience & Background Details</h4>
                <div style="background-color: #F8FBFD; border-left: 4px solid #0DB7C8; padding: 15px; border-radius: 4px; color: #0B2D52; line-height: 1.6; font-size: 15px;">
                  ${data.aboutMe.replace(/\n/g, "<br/>")}
                </div>
              </div>
            </div>
          `,
        });
      } catch (adminError) {
        console.error("Resend admin caregiver notification email failed:", adminError);
      }

      // B. User confirmation email — works when FROM_EMAIL is a verified custom domain
      try {
        await resend.emails.send({
          from: `Caregivers Nearby <${fromEmail}>`,
          to: data.email,
          subject: "Thank You for Applying - Caregivers Nearby",
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 35px; border: 1px solid #E5EEF5; border-radius: 24px; background-color: #FFFFFF; text-align: left;">
              <div style="text-align: center; margin-bottom: 30px; border-bottom: 1px solid #E5EEF5; padding-bottom: 25px;">
                <img src="https://www.caregiversnearby.com/logo/caregiverslogo.png" alt="Caregivers Nearby Logo" style="max-height: 50px; width: auto; margin-bottom: 15px;" />
                <p style="color: #0DB7C8; margin: 5px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; tracking-wider;">Compassionate Care. Trusted Caregivers. Right Nearby.</p>
              </div>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Hi ${data.firstName},</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">Thank you for your interest in joining our caregiving team at Caregivers Nearby!</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">We have successfully received your caregiver application. Our recruitment team is currently reviewing applications and will reach out to you if your qualifications and availability match our current needs.</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 16px 0;">In the meantime, feel free to visit our website to learn more about the care options and quality standards we provide to our clients.</p>
              <p style="color: #0B2D52; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">Thank you for your dedication to compassionate care.</p>
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
    console.error("Server Action caregiver form error:", error);
    return { success: false, error: error.message || "An unexpected error occurred." };
  }
}
