"use client";

import { useState, useTransition } from "react";
import { changeOwnPassword, resetUserPassword } from "@/app/admin/actions";

export function ChangeOwnPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    if (newPassword !== confirm) {
      setError("New passwords do not match");
      return;
    }
    startTransition(async () => {
      const result = await changeOwnPassword({ currentPassword, newPassword });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage("Password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    });
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-3 rounded-[1.5rem] border border-white bg-white p-5 shadow-[0_12px_40px_rgba(11,45,82,0.05)]"
    >
      <h2 className="font-heading text-lg font-bold">Change your password</h2>
      <p className="text-sm text-slate-500">
        Enter your current password, then choose a new one (8+ characters).
      </p>
      <input
        type="password"
        required
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        placeholder="Current password"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        required
        minLength={8}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      <input
        type="password"
        required
        minLength={8}
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm new password"
        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? <p className="text-sm text-emerald-700">{message}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-2xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {pending ? "Updating…" : "Update password"}
      </button>
    </form>
  );
}

export function ResetUserPasswordForm({
  userId,
  email,
}: {
  userId: string;
  email: string;
}) {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setError("");
    startTransition(async () => {
      const result = await resetUserPassword({ userId, newPassword });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setMessage("Password reset");
      setNewPassword("");
      setOpen(false);
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-brand-teal hover:underline"
      >
        Reset password
      </button>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-end gap-2">
      <p className="text-[11px] text-slate-500">New password for {email}</p>
      <input
        type="password"
        required
        minLength={8}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New password (8+)"
        className="w-44 rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
      {message ? <p className="text-xs text-emerald-700">{message}</p> : null}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xs text-slate-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={pending}
          className="text-xs font-semibold text-brand-navy"
        >
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
