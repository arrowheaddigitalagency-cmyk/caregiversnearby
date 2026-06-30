import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  careType: z.string().min(1, { message: "Please select a care service type." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const caregiverSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  experience: z.string().min(1, { message: "Please select your years of experience." }),
  availability: z.string().min(1, { message: "Please select your general availability." }),
  aboutMe: z.string().min(20, { message: "Please write at least 20 characters about your experience and background." }),
});

export type CaregiverFormData = z.infer<typeof caregiverSchema>;
