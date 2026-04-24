"use client";

import Hero from "@/components/Hero";
import RecentWork from "@/components/RecentWork";
import Intro from "@/components/Intro";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <RecentWork />
      <Intro />
      <Services />
      <Testimonials />
    </>
  );
}
