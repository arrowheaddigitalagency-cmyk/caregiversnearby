import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  serviceNeeded: z.string().min(1, { message: "Please select a service type." }),
  otherService: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  preferredContact: z.enum(["email", "phone", "text"]),
  agreeToContact: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms to be contacted.",
  }),
}).refine(
  (data) => data.serviceNeeded !== "other" || (data.otherService && data.otherService.trim().length >= 2),
  {
    message: "Please specify the service you need (at least 2 characters).",
    path: ["otherService"],
  }
);

export type ContactFormData = z.infer<typeof contactSchema>;

export const caregiverSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  experience: z.string().min(1, { message: "Please select your years of experience." }),
  availability: z.string().min(1, { message: "Please select your general availability." }),
  state: z.string().min(1, { message: "Please select your state." }),
  aboutMe: z.string().min(20, { message: "Please write at least 20 characters about your experience and background." }),
});

export type CaregiverFormData = z.infer<typeof caregiverSchema>;
