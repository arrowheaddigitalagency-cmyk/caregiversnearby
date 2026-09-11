import { Role } from "@prisma/client";
import { auth } from "@/lib/auth";
import { createUser, deleteUser } from "@/app/admin/actions";
import { prisma } from "@/lib/db";

export default async function AdminUsersPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === Role.ADMIN;

  let users: Awaited<ReturnType<typeof prisma.user.findMany>> = [];
  try {
    users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    users = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Users</h1>
        <p className="mt-1 text-slate-600">
          SEO team accounts for the CMS. Only admins can create users.
        </p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-100">
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.name || "—"}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3 text-right">
                  {isAdmin && session?.user?.id !== user.id ? (
                    <form
                      action={async () => {
                        "use server";
                        await deleteUser(user.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="text-xs font-semibold text-red-600"
                      >
                        Delete
                      </button>
                    </form>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdmin ? (
        <form
          action={createUser}
          className="grid gap-3 rounded-xl border border-slate-200 bg-white p-5 md:grid-cols-2"
        >
          <h2 className="font-heading text-lg font-bold md:col-span-2">
            Add user
          </h2>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            name="name"
            placeholder="Name"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <input
            name="password"
            type="password"
            required
            minLength={8}
            placeholder="Password (8+)"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
          />
          <select
            name="role"
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
            defaultValue="SEO"
          >
            <option value="SEO">SEO</option>
            <option value="ADMIN">Admin</option>
          </select>
          <button
            type="submit"
            className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-semibold text-white md:col-span-2 md:w-fit"
          >
            Create user
          </button>
        </form>
      ) : (
        <p className="text-sm text-slate-500">
          Ask an admin to create additional SEO accounts.
        </p>
      )}
    </div>
  );
}
