import { redirect } from "next/navigation";
import { auth, signOut } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-brand-navy">
      <div className="flex min-h-screen">
        <AdminSidebar
          email={session.user.email}
          role={session.user.role}
          signOutAction={signOutAction}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <main className="relative flex-1 overflow-x-hidden p-4 md:p-8 lg:p-10">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,_rgba(13,183,200,0.12),_transparent_60%)]" />
            <div className="relative mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
