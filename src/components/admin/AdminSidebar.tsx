"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Newspaper,
  MapPinned,
  ImageIcon,
  Settings,
  Users,
  ExternalLink,
  LogOut,
} from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  adminOnly?: boolean;
};

const NAV: NavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "Dashboard home",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/pages",
    label: "Pages",
    description: "Meta & page copy",
    icon: FileText,
  },
  {
    href: "/admin/blog",
    label: "Blog",
    description: "Articles & images",
    icon: Newspaper,
  },
  {
    href: "/admin/locations",
    label: "Local SEO",
    description: "City / county pages",
    icon: MapPinned,
  },
  {
    href: "/admin/media",
    label: "Media",
    description: "Upload images",
    icon: ImageIcon,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Business info",
    icon: Settings,
  },
  {
    href: "/admin/users",
    label: "Users",
    description: "Team access",
    icon: Users,
    adminOnly: true,
  },
];

export function AdminSidebar({
  email,
  role,
  signOutAction,
}: {
  email?: string | null;
  role?: string | null;
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname();
  const isAdmin = role === "ADMIN";
  const items = NAV.filter((item) => !item.adminOnly || isAdmin);

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <aside className="relative hidden w-72 shrink-0 overflow-hidden md:flex md:flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-[#071a33] via-[#0B2D52] to-[#0a243f]" />
        <div className="absolute -right-16 top-24 h-48 w-48 rounded-full bg-brand-teal/20 blur-3xl" />
        <div className="absolute -left-10 bottom-20 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="border-b border-white/10 px-6 py-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">
              SEO Studio
            </p>
            <p className="mt-2 font-heading text-xl font-bold text-white">
              Caregivers Nearby
            </p>
            <p className="mt-1 text-xs text-white/55">
              Content & ranking control center
            </p>
          </div>

          <nav className="flex flex-1 flex-col gap-1.5 p-4">
            {items.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start gap-3 rounded-2xl px-3.5 py-3 transition ${
                    active
                      ? "bg-white text-brand-navy shadow-lg shadow-black/10"
                      : "text-white/75 hover:bg-white/8 hover:text-white"
                  }`}
                >
                  <span
                    className={`mt-0.5 rounded-xl p-2 ${
                      active
                        ? "bg-brand-teal/15 text-brand-teal"
                        : "bg-white/5 text-white/70 group-hover:bg-white/10"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">
                      {item.label}
                    </span>
                    <span
                      className={`block text-[11px] ${
                        active ? "text-slate-500" : "text-white/45"
                      }`}
                    >
                      {item.description}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="relative z-10 border-t border-white/10 p-5">
            <p className="truncate text-sm font-medium text-white">{email}</p>
            <p className="mt-0.5 text-[11px] uppercase tracking-wider text-brand-teal">
              {role}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <form action={signOutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign out
                </button>
              </form>
              <Link
                href="/"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                View site
              </Link>
            </div>
          </div>
        </div>
      </aside>

      <div className="border-b border-slate-200 bg-white md:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-teal">
              SEO Studio
            </p>
            <p className="font-heading font-bold text-brand-navy">Admin</p>
          </div>
          <Link href="/" className="text-xs font-semibold text-brand-teal">
            View site
          </Link>
        </div>
        <nav className="flex gap-2 overflow-x-auto px-3 pb-3">
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${
                  active
                    ? "bg-brand-navy text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
