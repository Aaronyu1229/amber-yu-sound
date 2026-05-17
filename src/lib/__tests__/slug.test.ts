import { describe, it, expect } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("5 Key Principles of Sound")).toBe("5-key-principles-of-sound");
  });
  it("strips punctuation and collapses dashes", () => {
    expect(slugify("Hello --- World!!!")).toBe("hello-world");
  });
  it("trims leading/trailing hyphens", () => {
    expect(slugify("  --Edge--  ")).toBe("edge");
  });
  it("drops non-ascii (CJK) leaving ascii", () => {
    expect(slugify("奧丁 Crown of Odin")).toBe("crown-of-odin");
  });
  it("returns empty string for no ascii", () => {
    expect(slugify("奧丁王冠")).toBe("");
  });
});
