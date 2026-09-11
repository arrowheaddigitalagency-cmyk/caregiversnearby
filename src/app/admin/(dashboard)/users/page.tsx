import { Role } from "@prisma/client";
import { auth } from "@/lib/auth";
import { createUser, deleteUser } from "@/app/admin/actions";
import { prisma } from "@/lib/db";
import {
  ChangeOwnPasswordForm,
  ResetUserPasswordForm,
} from "@/components/admin/PasswordForms";
import {
  canCreateRole,
  canManageUser,
  isStaffAdmin,
  isSuperAdmin,
} from "@/lib/roles";

export default async function AdminUsersPage() {
  const session = await auth();
  const role = session?.user?.role;
  const staff = isStaffAdmin(role);
  const superAdmin = isSuperAdmin(role);

  if (!staff) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-3xl font-bold">Users</h1>
          <p className="mt-1 text-slate-600">
            Only admins can manage team accounts.
          </p>
        </div>
        <ChangeOwnPasswordForm />
      </div>
    );
  }

  let users: Awaited<ReturnType<typeof prisma.user.findMany>> = [];
  try {
    users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  } catch {
    users = [];
  }

  // Hide super admins from client admins
  const visibleUsers = superAdmin
    ? users
    : users.filter((u) => u.role !== Role.SUPER_ADMIN);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-3xl font-bold">Users</h1>
        <p className="mt-1 text-slate-600">
          {superAdmin
            ? "Super Admin: create client Admins and SEO users. Keep Super Admin credentials with the developer team."
            : "Create SEO team accounts and reset their passwords. You cannot create Super Admins."}
        </p>
      </div>

      <ChangeOwnPasswordForm />

      <div className="overflow-hidden rounded-[1.5rem] border border-white bg-white shadow-[0_12px_40px_rgba(11,45,82,0.05)]">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50/80 text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-medium">Email</th>
              <th className="px-5 py-3.5 font-medium">Name</th>
              <th className="px-5 py-3.5 font-medium">Role</th>
              <th className="px-5 py-3.5 font-medium" />
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user) => {
              const manageable =
                session?.user?.id !== user.id &&
                canManageUser(role, user.role);
              return (
                <tr
                  key={user.id}
                  className="border-b border-slate-50 last:border-0"
                >
                  <td className="px-5 py-4">{user.email}</td>
                  <td className="px-5 py-4">{user.name || "—"}</td>
                  <td className="px-5 py-4">{user.role}</td>
                  <td className="space-y-2 px-5 py-4 text-right">
                    {manageable ? (
                      <>
                        <ResetUserPasswordForm
                          userId={user.id}
                          email={user.email}
                        />
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
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form
        action={createUser}
        className="grid gap-3 rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)] md:grid-cols-2"
      >
        <h2 className="font-heading text-lg font-bold md:col-span-2">
          Add user
        </h2>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
        />
        <input
          name="name"
          placeholder="Name"
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
        />
        <input
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="Password (8+)"
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
        />
        <select
          name="role"
          className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
          defaultValue="SEO"
        >
          <option value="SEO">SEO</option>
          {canCreateRole(role, Role.ADMIN) ? (
            <option value="ADMIN">Admin</option>
          ) : null}
        </select>
        <button
          type="submit"
          className="rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white md:col-span-2 md:w-fit"
        >
          Create user
        </button>
      </form>
    </div>
  );
}
