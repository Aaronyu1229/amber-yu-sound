import type { Metadata } from "next";

const title = "Tension — Emotion-tagged audio search for iGaming | Dolce & Forte";
const description = "Find iGaming audio by feeling. Tension ranks emotion-tagged sounds by tension, excitement, and win impact for the game moment you need.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/tension" },
  openGraph: { title, description, url: "/tension", type: "website" },
};

export default function TensionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
