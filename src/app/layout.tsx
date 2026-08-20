import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import Script from "next/script";
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
  verification: {
    google: "gBEfO_WXgZaRHtGJSEDYHAfqPLQ9eqOsoD_9RTsf6AM",
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
      <head>
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MK34SK6K');`}
        </Script>
        {/* End Google Tag Manager */}
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-white text-brand-navy">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MK34SK6K"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YSJ91HSBK3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YSJ91HSBK3');
          `}
        </Script>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
