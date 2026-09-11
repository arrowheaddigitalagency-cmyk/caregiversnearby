import Link from "next/link";

export function ContentTable({
  rows,
  editBase,
  publicBase,
}: {
  rows: {
    id: string;
    title: string;
    slug: string;
    status: string;
    updatedAt: Date;
  }[];
  editBase: string;
  publicBase: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-[0_12px_40px_rgba(11,45,82,0.05)]">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-100 bg-slate-50/80 text-slate-500">
          <tr>
            <th className="px-5 py-3.5 font-medium">Title</th>
            <th className="px-5 py-3.5 font-medium">Status</th>
            <th className="px-5 py-3.5 font-medium">Updated</th>
            <th className="px-5 py-3.5 font-medium" />
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={4} className="px-5 py-10 text-center text-slate-500">
                No entries yet.
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-brand-navy">{row.title}</p>
                  <p className="text-xs text-slate-500">
                    {publicBase}/{row.slug}
                  </p>
                </td>
                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      row.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-500">
                  {row.updatedAt.toLocaleDateString()}
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    href={`${editBase}/${row.id}`}
                    className="font-semibold text-brand-teal hover:underline"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
