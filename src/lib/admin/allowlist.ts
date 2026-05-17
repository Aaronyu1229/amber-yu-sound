/** True iff `email` is present (case-insensitive) in the comma-separated `list`. */
export function isAdminEmail(
  email: string | undefined | null,
  list: string | undefined | null,
): boolean {
  if (!email || !list) return false;
  const target = email.trim().toLowerCase();
  if (!target) return false;
  return list
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean)
    .includes(target);
}
