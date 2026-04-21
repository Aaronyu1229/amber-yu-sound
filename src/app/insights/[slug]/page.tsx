"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { insights, type InsightSection } from "@/lib/insights-data";
import Button from "@/components/ui/Button";

function formatDate(iso: string, locale: string): string {
  const d = new Date(iso);
  if (locale === "zh") {
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function Section({ block }: { block: InsightSection }) {
  switch (block.kind) {
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl font-medium text-ivory mt-12 mb-4 leading-tight">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="font-display text-xl font-medium text-ivory mt-8 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p className="text-ivory/75 leading-[1.85] text-[15px] md:text-base mb-5">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="space-y-2 mb-6 pl-1">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex gap-3 text-ivory/75 leading-relaxed text-[15px]"
            >
              <span className="text-gold mt-[6px] shrink-0 w-1.5 h-1.5 rounded-full bg-gold" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-10 pl-6 border-l-2 border-gold">
          <p className="font-display text-xl md:text-2xl italic text-ivory/90 leading-relaxed">
            &ldquo;{block.text}&rdquo;
          </p>
        </blockquote>
      );
    default:
      return null;
  }
}

export default function InsightDetailPage() {
  const params = useParams();
  const { t, locale } = useLocale();
  const slug = params.slug as string;

  const item = insights.find((p) => p.slug === slug);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-ivory mb-4">
            Article not found
          </h1>
          <Link
            href="/insights"
            className="text-gold hover:text-gold/80 transition-colors"
          >
            {t.pages.insights.backToList}
          </Link>
        </div>
      </div>
    );
  }

  const body = item[locale];

  // Find previous + next articles for end-of-article navigation
  const sorted = [...insights].sort((a, b) => b.date.localeCompare(a.date));
  const idx = sorted.findIndex((i) => i.slug === slug);
  const prev = sorted[idx + 1];
  const next = sorted[idx - 1];

  return (
    <>
      {/* Hero banner */}
      <section className="relative h-[55vh] min-h-[420px] flex items-end overflow-hidden">
        <Image
          src={item.coverImage}
          alt={body.title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 pb-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm text-ivory/60 hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              {t.pages.insights.backToList}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="text-[10px] tracking-[3px] uppercase text-gold">
              {body.tag} · {body.readTime}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-medium text-ivory leading-tight">
              {body.title}
            </h1>
            <p className="text-ivory/70 text-base md:text-lg leading-relaxed max-w-2xl">
              {body.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-10 pb-8 border-b border-ivory/10"
        >
          <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/25 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-gold">
              {item.author.slice(0, 1)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-ivory">{item.author}</span>
            <span className="text-xs text-ivory/50">
              {t.pages.insights.publishedOn} {formatDate(item.date, locale)}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {body.sections.map((block, i) => (
            <Section key={i} block={block} />
          ))}
        </motion.div>
      </article>

      {/* CTA */}
      <section className="border-t border-ivory/5 bg-bg2">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <h2 className="font-display text-2xl md:text-3xl text-ivory mb-6">
            {t.pages.insights.ctaTitle}
          </h2>
          <Button href="/contact" variant="primary">
            <Mail size={14} /> {t.pages.insights.ctaButton}
          </Button>
        </div>
      </section>

      {/* Prev / Next */}
      {(prev || next) && (
        <nav className="border-t border-ivory/5">
          <div className="max-w-3xl mx-auto px-6 py-12 grid gap-6 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/insights/${prev.slug}`}
                className="group flex flex-col gap-1 text-left"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[3px] uppercase text-ivory/40">
                  <ArrowLeft size={11} /> PREV
                </span>
                <span className="text-sm text-ivory group-hover:text-gold transition-colors">
                  {prev[locale].title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/insights/${next.slug}`}
                className="group flex flex-col gap-1 sm:text-right sm:items-end"
              >
                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-[3px] uppercase text-ivory/40">
                  NEXT <ArrowRight size={11} />
                </span>
                <span className="text-sm text-ivory group-hover:text-gold transition-colors">
                  {next[locale].title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </nav>
      )}
    </>
  );
}
