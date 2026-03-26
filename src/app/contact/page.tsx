"use client";

import PageBanner from "@/components/ui/PageBanner";
import Contact from "@/components/Contact";
import { useLocale } from "@/lib/i18n";
import { bannerImages } from "@/lib/constants";

export default function ContactPage() {
  const { t } = useLocale();

  return (
    <>
      <PageBanner
        title={t.pages.contact.title}
        subtitle={t.pages.contact.subtitle}
        backgroundImage={bannerImages.contact}
      />
      <Contact />
    </>
  );
}
