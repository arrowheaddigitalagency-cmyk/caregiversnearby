import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("contact", "/contact");
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
