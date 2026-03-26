"use client";

import PageBanner from "@/components/ui/PageBanner";
import Services from "@/components/Services";
import Process from "@/components/Process";
import { useLocale } from "@/lib/i18n";
import { bannerImages } from "@/lib/constants";

export default function ServicesPage() {
  const { t } = useLocale();

  return (
    <>
      <PageBanner
        title={t.pages.services.title}
        subtitle={t.pages.services.subtitle}
        backgroundImage={bannerImages.services}
      />
      <Services />
      <Process />
    </>
  );
}
