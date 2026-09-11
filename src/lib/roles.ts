import { Role } from "@prisma/client";

export function isSuperAdmin(role?: Role | string | null) {
  return role === Role.SUPER_ADMIN || role === "SUPER_ADMIN";
}

export function isStaffAdmin(role?: Role | string | null) {
  return (
    role === Role.SUPER_ADMIN ||
    role === Role.ADMIN ||
    role === "SUPER_ADMIN" ||
    role === "ADMIN"
  );
}

export function canCreateRole(
  actorRole: Role | string | null | undefined,
  targetRole: Role | string
) {
  if (isSuperAdmin(actorRole)) {
    return (
      targetRole === Role.ADMIN ||
      targetRole === Role.SEO ||
      targetRole === "ADMIN" ||
      targetRole === "SEO"
    );
  }
  if (actorRole === Role.ADMIN || actorRole === "ADMIN") {
    return targetRole === Role.SEO || targetRole === "SEO";
  }
  return false;
}

export function canManageUser(
  actorRole: Role | string | null | undefined,
  targetRole: Role | string
) {
  if (isSuperAdmin(actorRole)) {
    return targetRole !== Role.SUPER_ADMIN && targetRole !== "SUPER_ADMIN";
  }
  if (actorRole === Role.ADMIN || actorRole === "ADMIN") {
    return targetRole === Role.SEO || targetRole === "SEO";
  }
  return false;
}
