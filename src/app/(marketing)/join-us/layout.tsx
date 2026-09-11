import type { Metadata } from "next";
import { getPageMetadata } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata("join-us", "/join-us");
}

export default function JoinUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
