import { ContentType } from "@prisma/client";
import { ContentEditor } from "@/components/admin/ContentEditor";

export default function NewLocationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">New local SEO page</h1>
        <p className="mt-1 text-sm text-slate-600">
          Example: title “In-Home Care in Madison, GA”, slug{" "}
          <code className="rounded bg-slate-100 px-1 text-xs">madison-ga</code>
        </p>
      </div>
      <ContentEditor type={ContentType.LOCATION} listPath="/admin/locations" />
    </div>
  );
}
