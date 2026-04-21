"use client";

import PageBanner from "@/components/ui/PageBanner";
import InsightsList from "@/components/InsightsList";
import { useLocale } from "@/lib/i18n";
import { bannerImages } from "@/lib/constants";

export default function InsightsPage() {
  const { t } = useLocale();

  return (
    <>
      <PageBanner
        title={t.pages.insights.title}
        subtitle={t.pages.insights.subtitle}
        backgroundImage={bannerImages.insights}
      />
      <InsightsList />
    </>
  );
}
