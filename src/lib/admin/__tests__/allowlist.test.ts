import { describe, it, expect } from "vitest";
import { isAdminEmail } from "@/lib/admin/allowlist";

describe("isAdminEmail", () => {
  it("matches case-insensitively and trims", () => {
    expect(isAdminEmail("Amber@Example.com", "amber@example.com")).toBe(true);
    expect(isAdminEmail("amber@example.com", " amber@example.com , bob@x.com")).toBe(true);
  });
  it("rejects non-listed", () => {
    expect(isAdminEmail("eve@evil.com", "amber@example.com")).toBe(false);
  });
  it("rejects when email or list is empty/undefined", () => {
    expect(isAdminEmail(undefined, "amber@example.com")).toBe(false);
    expect(isAdminEmail("amber@example.com", undefined)).toBe(false);
    expect(isAdminEmail("amber@example.com", "")).toBe(false);
  });
});
