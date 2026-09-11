import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";

async function loginAction(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");
  const callbackUrl = String(formData.get("callbackUrl") || "/admin");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl.startsWith("/admin") ? callbackUrl : "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect(`/admin/login?error=CredentialsSignin`);
    }
    throw error;
  }
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "CredentialsSignin";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#071a33] px-4">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative w-full max-w-md rounded-[1.75rem] border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-teal">
          SEO Studio
        </p>
        <h1 className="mt-2 font-heading text-3xl font-bold text-brand-navy">
          Sign in
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage website SEO, blog, and local landing pages.
        </p>
        <form action={loginAction} className="mt-6 space-y-4">
          <input
            type="hidden"
            name="callbackUrl"
            value={params.callbackUrl || "/admin"}
          />
          <div>
            <label className="mb-1 block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          {hasError ? (
            <p className="text-sm text-red-600">Invalid email or password</p>
          ) : null}
          <button
            type="submit"
            className="w-full rounded-2xl bg-brand-navy px-4 py-3 text-sm font-semibold text-white hover:bg-brand-navy-light"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
