import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.caregiversnearby.com"),
  title: {
    default: "Caregivers Nearby | Compassionate Care. Trusted Caregivers. Right Nearby.",
    template: "%s | Caregivers Nearby"
  },
  description: "Find trusted local caregivers for seniors and individuals needing home assistance. Caregivers Nearby offers Companion Care, Personal Assistance, Respite Care, and specialized Dementia Care.",
  keywords: ["caregivers nearby", "elderly care", "in-home care", "companion care", "respite care", "dementia care", "home health aide", "senior care"],
  authors: [{ name: "Caregivers Nearby Team" }],
  creator: "Caregivers Nearby",
  publisher: "Caregivers Nearby",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Caregivers Nearby | Compassionate Care. Trusted Caregivers. Right Nearby.",
    description: "Premium, trusted local caregiver matching network. Helping seniors age safely in the comfort of their own homes.",
    url: "https://www.caregiversnearby.com",
    siteName: "Caregivers Nearby",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Caregivers Nearby | Trusted Caregivers Right Nearby",
    description: "Premium local caregiver network. Compassionate home care matching services for seniors and families.",
    creator: "@caregiversnearby",
  },
  icons: {
    icon: [
      { url: "/logo/fav-icon.svg", type: "image/svg+xml" },
      { url: "/logo/fav-icon.png", type: "image/png" }
    ],
    apple: "/logo/fav-icon.png",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-white text-brand-navy">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
