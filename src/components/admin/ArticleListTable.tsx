"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { setStatus } from "@/app/admin/actions";
import type { AdminInsight } from "@/lib/insights-source";

const FILTERS = ["all", "draft", "published", "archived"] as const;
type Filter = (typeof FILTERS)[number];

export default function ArticleListTable({
  items,
}: {
  items: AdminInsight[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [pending, start] = useTransition();

  const shown = items.filter(
    (i) => filter === "all" || i.status === filter,
  );

  function confirmArchive(i: AdminInsight) {
    if (
      !window.confirm(
        `Archive "${i.en.title || i.slug}"? It will be hidden from the public site but can be restored from the Archived filter.`,
      )
    )
      return;
    start(() =>
      setStatus(i.id, i.slug, "archived").then(() => location.reload()),
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs px-3 py-1.5 rounded-full border ${
                filter === f
                  ? "bg-gold/15 border-gold/40 text-gold"
                  : "border-ivory/10 text-ivory/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <Link
          href="/admin/new"
          className="text-xs px-4 py-2 rounded-lg bg-gold/20 border border-gold/40 text-gold"
        >
          + New article
        </Link>
      </div>

      <table className="w-full text-sm">
        <thead className="text-ivory/40 text-xs uppercase tracking-wider">
          <tr className="text-left border-b border-ivory/10">
            <th className="py-3">Title</th>
            <th>Status</th>
            <th>Date</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((i) => (
            <tr key={i.id} className="border-b border-ivory/5">
              <td className="py-3 text-ivory">{i.en.title || i.slug}</td>
              <td className="text-ivory/60">{i.status}</td>
              <td className="text-ivory/60">{i.date}</td>
              <td className="text-right space-x-3">
                <Link href={`/admin/edit/${i.id}`} className="text-gold">
                  Edit
                </Link>
                <Link
                  href={`/admin/preview/${i.slug}`}
                  className="text-ivory/60"
                >
                  Preview
                </Link>
                {i.status === "archived" ? (
                  <button
                    disabled={pending}
                    onClick={() =>
                      start(() =>
                        setStatus(i.id, i.slug, "draft").then(() =>
                          location.reload(),
                        ),
                      )
                    }
                    className="text-ivory/60"
                  >
                    Restore
                  </button>
                ) : (
                  <button
                    disabled={pending}
                    onClick={() => confirmArchive(i)}
                    className="text-rose-400"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
          {shown.length === 0 && (
            <tr>
              <td colSpan={4} className="py-8 text-center text-ivory/40">
                No articles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
