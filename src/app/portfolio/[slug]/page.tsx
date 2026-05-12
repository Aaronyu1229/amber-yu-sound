import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/constants";
import PortfolioDetailClient from "./PortfolioDetailClient";

const SITE_URL = "https://dolcenforte.com";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) return { title: "Project not found — Dolce & Forte" };

  const title = `${item.title} — ${item.services} | Dolce & Forte`;
  const description = `${item.title}: ${item.services} for an iGaming ${item.type.toLowerCase()} title. Tags: ${item.tags.join(", ")}.`;
  const ogImage = item.heroImage.startsWith("http")
    ? item.heroImage
    : `${SITE_URL}${item.heroImage}`;
  const canonical = `${SITE_URL}/portfolio/${item.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      images: [{ url: ogImage, width: 1280, height: 720, alt: item.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) notFound();

  const posterUrl = item.heroImage.startsWith("http")
    ? item.heroImage
    : `${SITE_URL}${item.heroImage}`;
  const videoUrl = item.videoSrc
    ? item.videoSrc.startsWith("http")
      ? item.videoSrc
      : `${SITE_URL}${item.videoSrc}`
    : item.youtubeId
      ? `https://www.youtube.com/watch?v=${item.youtubeId}`
      : undefined;

  // CreativeWork JSON-LD with embedded VideoObject when a video exists.
  // datePublished is set to a stable build-time year so SEO doesn't churn.
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: `${item.services} for ${item.title} — an iGaming ${item.type.toLowerCase()} title by Dolce & Forte.`,
    url: `${SITE_URL}/portfolio/${item.slug}`,
    image: posterUrl,
    keywords: item.tags.join(", "),
    genre: item.type,
    creator: {
      "@type": "Organization",
      name: "Dolce & Forte",
      url: SITE_URL,
    },
    inLanguage: ["en", "zh-TW"],
  };

  if (videoUrl) {
    jsonLd.video = {
      "@type": "VideoObject",
      name: `${item.title} — Game Demo`,
      description: `Audio demo for ${item.title}`,
      thumbnailUrl: posterUrl,
      contentUrl: videoUrl,
      uploadDate: "2025-01-01",
    };
  }

  return (
    <>
      <script
        type="application/ld+json"
        // JSON-LD is a static, server-rendered string injected into <head>.
        // dangerouslySetInnerHTML is the recommended approach for JSON-LD;
        // we control every byte of jsonLd, so there is no injection surface.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioDetailClient slug={slug} />
    </>
  );
}
