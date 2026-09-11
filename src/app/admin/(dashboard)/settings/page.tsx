import { updateSiteSettings } from "@/app/admin/actions";
import { getSiteSettings } from "@/lib/cms";
import { auth } from "@/lib/auth";
import { isStaffAdmin } from "@/lib/roles";

export default async function AdminSettingsPage() {
  const session = await auth();
  const canEdit = isStaffAdmin(session?.user?.role);
  const settings = await getSiteSettings();

  const fields = [
    ["name", "Business name", settings.name],
    ["tagline", "Tagline", settings.tagline],
    ["phone", "Phone", settings.phone],
    ["email", "Email", settings.email],
    ["hours", "Hours", settings.hours],
    ["address", "Address", settings.address],
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Site settings</h1>
        <p className="mt-1 text-slate-600">
          Business info used in schema markup and contact surfaces.
          {!canEdit
            ? " You can view these values; only an Admin can edit them."
            : ""}
        </p>
      </div>

      {canEdit ? (
        <form
          action={updateSiteSettings}
          className="space-y-4 rounded-[1.5rem] border border-white bg-white p-6 shadow-[0_12px_40px_rgba(11,45,82,0.05)]"
        >
          {fields.map(([name, label, value]) => (
            <div key={name}>
              <label className="block text-sm font-medium">{label}</label>
              <input
                name={name}
                defaultValue={value}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-teal"
              />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium">Emergency notice</label>
            <textarea
              name="emergencyNotice"
              defaultValue={settings.emergencyNotice}
              rows={3}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-brand-teal"
            />
          </div>
          <button
            type="submit"
            className="rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white"
          >
            Save settings
          </button>
        </form>
      ) : (
        <div className="space-y-3 rounded-[1.5rem] border border-white bg-white p-6 shadow-[0_12px_40px_rgba(11,45,82,0.05)]">
          {fields.map(([name, label, value]) => (
            <div
              key={name}
              className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-sm font-medium text-brand-navy">
                {value || "—"}
              </p>
            </div>
          ))}
          <div className="rounded-xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Emergency notice
            </p>
            <p className="mt-1 text-sm font-medium text-brand-navy">
              {settings.emergencyNotice || "—"}
            </p>
          </div>
          <p className="text-sm text-amber-700">
            Read-only for SEO users. Ask an Admin if something needs updating.
          </p>
        </div>
      )}
    </div>
  );
}
