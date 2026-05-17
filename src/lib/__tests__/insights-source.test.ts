import { describe, it, expect } from "vitest";
import { rowToInsight, type InsightRow } from "@/lib/insights-source";

const row: InsightRow = {
  id: "1",
  slug: "a",
  status: "published",
  date: "2026-04-18",
  author: "Amber",
  cover_image: "https://x.supabase.co/c.jpg",
  gradient: "from-a to-b",
  en: {
    title: "T",
    subtitle: "S",
    excerpt: "E",
    readTime: "6 min",
    tag: "Tag",
    sections: [{ kind: "p", text: "hi" }],
  },
  zh: {
    title: "標題",
    subtitle: "副",
    excerpt: "摘",
    readTime: "6 分鐘",
    tag: "標籤",
    sections: [{ kind: "p", text: "嗨" }],
  },
  created_at: "2026-04-18T00:00:00Z",
  updated_at: "2026-04-18T00:00:00Z",
};

describe("rowToInsight", () => {
  it("maps a DB row to the public Insight shape", () => {
    const i = rowToInsight(row);
    expect(i.slug).toBe("a");
    expect(i.coverImage).toBe("https://x.supabase.co/c.jpg");
    expect(i.gradient).toBe("from-a to-b");
    expect(i.en.title).toBe("T");
    expect(i.zh.sections[0]).toEqual({ kind: "p", text: "嗨" });
  });
});
