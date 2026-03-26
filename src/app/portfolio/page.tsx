"use client";

import PageBanner from "@/components/ui/PageBanner";
import Portfolio from "@/components/Portfolio";
import { useLocale } from "@/lib/i18n";
import { bannerImages } from "@/lib/constants";

export default function PortfolioPage() {
  const { t } = useLocale();

  return (
    <>
      <PageBanner
        title={t.pages.portfolio.title}
        subtitle={t.pages.portfolio.subtitle}
        backgroundImage={bannerImages.portfolio}
      />
      <Portfolio />
    </>
  );
}
