"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLocale } from "@/lib/i18n";
import { insights } from "@/lib/insights-data";

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

export default function InsightsList() {
  const { ref, isVisible } = useScrollReveal();
  const { t, locale } = useLocale();

  // Sort newest first
  const sorted = [...insights].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  if (sorted.length === 0) {
    return (
      <section className="py-20 md:py-24">
        <div className="max-w-3xl mx-auto px-6 text-center text-ivory/60">
          {t.pages.insights.empty}
        </div>
      </section>
    );
  }

  const [featured, ...rest] = sorted;
  const featuredBody = featured[locale];

  return (
    <section className="py-16 md:py-24" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 space-y-16 md:space-y-20">
        {/* Featured article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Link
            href={`/insights/${featured.slug}`}
            className="group grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            <div
              className={`relative aspect-[4/3] md:aspect-[5/4] rounded-2xl overflow-hidden bg-gradient-to-br ${featured.gradient}`}
            >
              <Image
                src={featured.coverImage}
                alt={featuredBody.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-85 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-bg/30" />
              <span className="absolute top-4 left-4 text-[10px] tracking-[3px] uppercase bg-bg/70 backdrop-blur-sm px-3 py-1 rounded-full text-gold z-10">
                {featuredBody.tag}
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <span className="text-[10px] tracking-[3px] uppercase text-purple">
                {formatDate(featured.date, locale)} · {featuredBody.readTime}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-medium leading-tight text-ivory group-hover:text-gold transition-colors">
                {featuredBody.title}
              </h2>
              <p className="text-ivory/65 leading-relaxed">
                {featuredBody.excerpt}
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-gold tracking-[1.5px] uppercase mt-2">
                {t.pages.insights.readMore}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Rest of articles — grid */}
        {rest.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item, i) => {
              const body = item[locale];
              return (
                <motion.div
                  key={item.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                >
                  <Link
                    href={`/insights/${item.slug}`}
                    className="group flex flex-col bg-bg2 rounded-2xl overflow-hidden border border-ivory/5 hover:border-gold/30 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className={`relative h-44 bg-gradient-to-br ${item.gradient}`}>
                      <Image
                        src={item.coverImage}
                        alt={body.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-bg/40" />
                      <span className="absolute top-4 left-4 text-[10px] tracking-[3px] uppercase bg-bg/70 backdrop-blur-sm px-3 py-1 rounded-full text-gold z-10">
                        {body.tag}
                      </span>
                    </div>
                    <div className="p-6 flex flex-col gap-3 flex-1">
                      <span className="text-[10px] tracking-[2.5px] uppercase text-ivory/40">
                        {formatDate(item.date, locale)} · {body.readTime}
                      </span>
                      <h3 className="font-display text-lg font-medium text-ivory group-hover:text-gold transition-colors">
                        {body.title}
                      </h3>
                      <p className="text-sm text-ivory/55 leading-relaxed line-clamp-3">
                        {body.excerpt}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
