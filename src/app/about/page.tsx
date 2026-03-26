"use client";

import PageBanner from "@/components/ui/PageBanner";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import { useLocale } from "@/lib/i18n";
import { bannerImages } from "@/lib/constants";

export default function AboutPage() {
  const { t } = useLocale();

  return (
    <>
      <PageBanner
        title={t.pages.about.title}
        subtitle={t.pages.about.subtitle}
        backgroundImage={bannerImages.about}
      />
      <About />
      <Testimonials />
    </>
  );
}
