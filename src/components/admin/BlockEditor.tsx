"use client";

import type { InsightSection } from "@/lib/insights-data";
import ImageUpload from "@/components/admin/ImageUpload";

const KINDS: InsightSection["kind"][] = [
  "p",
  "h2",
  "h3",
  "ul",
  "quote",
  "image",
];

function emptyBlock(kind: InsightSection["kind"]): InsightSection {
  switch (kind) {
    case "ul":
      return { kind: "ul", items: [""] };
    case "image":
      return { kind: "image", url: "", alt: "", caption: "" };
    default:
      return { kind, text: "" };
  }
}

export default function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: InsightSection[];
  onChange: (next: InsightSection[]) => void;
}) {
  function update(i: number, next: InsightSection) {
    onChange(blocks.map((b, idx) => (idx === i ? next : b)));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= blocks.length) return;
    const copy = [...blocks];
    [copy[i], copy[j]] = [copy[j], copy[i]];
    onChange(copy);
  }
  function remove(i: number) {
    onChange(blocks.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-3">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="border border-ivory/10 rounded-lg p-3 space-y-2"
        >
          <div className="flex items-center justify-between">
            <select
              value={b.kind}
              onChange={(e) =>
                update(
                  i,
                  emptyBlock(e.target.value as InsightSection["kind"]),
                )
              }
              className="bg-bg border border-ivory/10 rounded px-2 py-1 text-xs text-ivory"
            >
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
            <div className="space-x-2 text-xs">
              <button
                type="button"
                onClick={() => move(i, -1)}
                className="text-ivory/50"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                className="text-ivory/50"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-rose-400"
              >
                ✕
              </button>
            </div>
          </div>

          {b.kind === "ul" ? (
            <textarea
              rows={4}
              value={b.items.join("\n")}
              onChange={(e) =>
                update(i, { kind: "ul", items: e.target.value.split("\n") })
              }
              placeholder="One item per line"
              className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
            />
          ) : b.kind === "image" ? (
            <div className="space-y-2">
              <ImageUpload
                value={b.url}
                onChange={(url) => update(i, { ...b, url })}
              />
              <input
                value={b.alt}
                onChange={(e) => update(i, { ...b, alt: e.target.value })}
                placeholder="Alt text (required)"
                className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
              />
              <input
                value={b.caption ?? ""}
                onChange={(e) =>
                  update(i, { ...b, caption: e.target.value })
                }
                placeholder="Caption (optional)"
                className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
              />
            </div>
          ) : (
            <textarea
              rows={b.kind === "p" ? 4 : 2}
              value={b.text}
              onChange={(e) => update(i, { ...b, text: e.target.value })}
              className="w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
            />
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...blocks, emptyBlock("p")])}
        className="text-xs text-gold border border-gold/30 rounded px-3 py-1.5"
      >
        + Add block
      </button>
    </div>
  );
}
