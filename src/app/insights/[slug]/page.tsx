import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getPublishedInsights,
  getPublishedInsight,
} from "@/lib/insights-source";
import InsightDetail from "@/components/InsightDetail";

const SITE_URL = "https://dolcenforte.com";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublishedInsight(slug);
  if (!item) return { title: "Article not found — Dolce & Forte" };

  const title = `${item.en.title} — Dolce & Forte`;
  const description = item.en.excerpt;
  const ogImage = item.coverImage.startsWith("http")
    ? item.coverImage
    : `${SITE_URL}${item.coverImage}`;
  const canonical = `${SITE_URL}/insights/${item.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage, width: 1280, height: 720, alt: item.en.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPublishedInsight(slug);
  if (!item) notFound();

  const all = await getPublishedInsights(); // already date-desc
  const idx = all.findIndex((i) => i.slug === slug);
  const prevRow = all[idx + 1];
  const nextRow = all[idx - 1];
  const prev = prevRow
    ? { slug: prevRow.slug, title: prevRow.en.title }
    : null;
  const next = nextRow
    ? { slug: nextRow.slug, title: nextRow.en.title }
    : null;

  return <InsightDetail item={item} prev={prev} next={next} />;
}
