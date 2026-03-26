"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Music, Volume2, Mic, Film } from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { portfolioItems } from "@/lib/constants";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const assetIcons = [Music, Volume2, Mic, Film];

export default function PortfolioDetailPage() {
  const params = useParams();
  const { t } = useLocale();
  const slug = params.slug as string;

  // Find the portfolio item by slug
  const itemIndex = portfolioItems.findIndex((p) => p.slug === slug);
  const item = portfolioItems[itemIndex];
  const detail = t.portfolioDetail.items[itemIndex];

  if (!item || !detail) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-ivory mb-4">
            Project not found
          </h1>
          <Link
            href="/portfolio"
            className="text-gold hover:text-gold/80 transition-colors"
          >
            {t.portfolioDetail.backLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={item.heroImage}
          alt={item.title}
          fill
          className="object-cover opacity-30"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              {t.portfolioDetail.backLabel}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-[10px] tracking-[3px] uppercase text-purple bg-purple-dim px-3 py-1 rounded-full">
              {t.portfolio.items[itemIndex].type}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-ivory mt-4 mb-3">
              {item.title}
            </h1>
            <p className="text-ivory/50 text-lg">
              {t.portfolio.items[itemIndex].services}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Meta Bar */}
      <section className="border-y border-ivory/5 bg-bg2">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-5 gap-6"
            initial="hidden"
            animate="visible"
          >
            {[
              { label: t.portfolioDetail.clientLabel, value: detail.client },
              { label: t.portfolioDetail.genreLabel, value: detail.genre },
              { label: t.portfolioDetail.yearLabel, value: detail.year },
              {
                label: t.portfolioDetail.platformLabel,
                value: detail.platform,
              },
              {
                label: t.portfolioDetail.durationLabel,
                value: detail.duration,
              },
            ].map((meta, i) => (
              <motion.div key={meta.label} custom={i} variants={fadeUp}>
                <p className="text-[10px] tracking-[2px] uppercase text-muted mb-1">
                  {meta.label}
                </p>
                <p className="text-sm text-ivory font-medium">{meta.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Left Column — Main narrative */}
            <div className="md:col-span-2 space-y-16">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-4">
                  {t.portfolioDetail.overviewTitle}
                </h2>
                <p className="text-ivory/70 leading-relaxed">
                  {detail.overview}
                </p>
              </motion.div>

              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-4">
                  {t.portfolioDetail.challengeTitle}
                </h2>
                <p className="text-ivory/70 leading-relaxed">
                  {detail.challenge}
                </p>
              </motion.div>

              {/* Approach */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-4">
                  {t.portfolioDetail.approachTitle}
                </h2>
                <p className="text-ivory/70 leading-relaxed">
                  {detail.approach}
                </p>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-4">
                  {t.portfolioDetail.resultTitle}
                </h2>
                <p className="text-ivory/70 leading-relaxed">
                  {detail.result}
                </p>
              </motion.div>

              {/* Testimonial */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="border-l-2 border-gold/30 pl-8 py-4"
              >
                <p className="text-ivory/80 italic text-lg leading-relaxed mb-4">
                  &ldquo;{detail.testimonial}&rdquo;
                </p>
                <p className="text-sm text-muted">
                  — {detail.testimonialAuthor}
                </p>
              </motion.div>
            </div>

            {/* Right Column — Sidebar */}
            <div className="space-y-8">
              {/* Client Info Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-bg2 rounded-xl p-6 border border-ivory/5"
              >
                <p className="text-[10px] tracking-[2px] uppercase text-muted mb-2">
                  {t.portfolioDetail.clientLabel}
                </p>
                <p className="text-ivory font-display text-lg font-medium mb-2">
                  {detail.client}
                </p>
                <p className="text-ivory/50 text-sm leading-relaxed">
                  {detail.clientRole}
                </p>
              </motion.div>

              {/* Asset Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-bg2 rounded-xl p-6 border border-ivory/5"
              >
                <h3 className="text-xs tracking-[3px] uppercase text-gold font-medium mb-6">
                  {t.portfolioDetail.assetsTitle}
                </h3>
                <div className="space-y-4">
                  {detail.assets.map((asset, i) => {
                    const Icon = assetIcons[i % assetIcons.length];
                    return (
                      <div
                        key={asset.label}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                            <Icon size={14} className="text-gold" />
                          </div>
                          <span className="text-sm text-ivory/70">
                            {asset.label}
                          </span>
                        </div>
                        <span className="font-display text-xl font-semibold text-ivory">
                          {asset.count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {t.portfolio.items[itemIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-purple-dim text-purple"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg2">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-ivory mb-6">
              {t.portfolioDetail.ctaTitle}
            </h2>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 bg-gold text-bg text-sm font-semibold tracking-wider uppercase rounded-full hover:bg-gold/90 transition-colors"
            >
              {t.portfolioDetail.ctaButton}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
