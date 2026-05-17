"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { saveArticle, type ArticleInput } from "@/app/admin/actions";
import { slugify } from "@/lib/slug";
import type { InsightBody } from "@/lib/insights-data";
import type { AdminInsight } from "@/lib/insights-source";
import BlockEditor from "@/components/admin/BlockEditor";
import ImageUpload from "@/components/admin/ImageUpload";

const GRADIENTS = [
  "from-amber-900/40 to-purple-900/40",
  "from-purple-900/40 to-amber-900/40",
  "from-emerald-900/40 to-bg",
];

const emptyBody = (): InsightBody => ({
  title: "",
  subtitle: "",
  excerpt: "",
  readTime: "",
  tag: "",
  sections: [],
});

export default function ArticleForm({
  existing,
}: {
  existing?: AdminInsight;
}) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<"zh" | "en">("zh");

  const [slug, setSlug] = useState(existing?.slug ?? "");
  const [date, setDate] = useState(
    existing?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [author, setAuthor] = useState(
    existing?.author ?? "Amber Yu, Founder & Composer",
  );
  const [coverImage, setCoverImage] = useState(existing?.coverImage ?? "");
  const [gradient, setGradient] = useState(
    existing?.gradient ?? GRADIENTS[0],
  );
  const [en, setEn] = useState<InsightBody>(existing?.en ?? emptyBody());
  const [zh, setZh] = useState<InsightBody>(existing?.zh ?? emptyBody());

  const body = lang === "zh" ? zh : en;
  const setBody = lang === "zh" ? setZh : setEn;

  function field<K extends keyof InsightBody>(
    key: K,
    value: InsightBody[K],
  ) {
    setBody({ ...body, [key]: value });
  }

  function submit(status: "draft" | "published") {
    setError(null);
    const finalSlug = slug.trim() || slugify(en.title);
    const input: ArticleInput = {
      id: existing?.id,
      slug: finalSlug,
      date,
      author,
      coverImage,
      gradient,
      status,
      en,
      zh,
    };
    start(async () => {
      const res = await saveArticle(input);
      if (res.ok) router.push("/admin");
      else setError(res.error);
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="text-xs text-ivory/50">
          Slug
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="auto from EN title"
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
          />
        </label>
        <label className="text-xs text-ivory/50">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory [color-scheme:dark]"
          />
        </label>
        <label className="text-xs text-ivory/50">
          Author
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
          />
        </label>
        <label className="text-xs text-ivory/50">
          Gradient
          <select
            value={gradient}
            onChange={(e) => setGradient(e.target.value)}
            className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
          >
            {GRADIENTS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="text-xs text-ivory/50 mb-1">Cover image</p>
        <ImageUpload value={coverImage} onChange={setCoverImage} />
      </div>

      <div className="flex gap-2">
        {(["zh", "en"] as const).map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLang(l)}
            className={`text-xs px-3 py-1.5 rounded-full border ${
              lang === l
                ? "bg-gold/15 border-gold/40 text-gold"
                : "border-ivory/10 text-ivory/60"
            }`}
          >
            {l === "zh" ? "中文" : "English"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {(["title", "subtitle", "excerpt", "readTime", "tag"] as const).map(
          (k) => (
            <label key={k} className="block text-xs text-ivory/50">
              {k}
              <input
                value={body[k] as string}
                onChange={(e) => field(k, e.target.value)}
                className="mt-1 w-full bg-bg border border-ivory/10 rounded px-3 py-2 text-sm text-ivory"
              />
            </label>
          ),
        )}
      </div>

      <div>
        <p className="text-xs text-ivory/50 mb-2">Body blocks ({lang})</p>
        <BlockEditor
          blocks={body.sections}
          onChange={(sections) => field("sections", sections)}
        />
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="flex gap-3">
        <button
          type="button"
          disabled={pending}
          onClick={() => submit("draft")}
          className="px-4 py-2 rounded-lg border border-ivory/15 text-ivory/80 text-sm disabled:opacity-50"
        >
          Save draft
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => submit("published")}
          className="px-4 py-2 rounded-lg bg-gold/20 border border-gold/40 text-gold text-sm disabled:opacity-50"
        >
          Publish
        </button>
      </div>
    </div>
  );
}
