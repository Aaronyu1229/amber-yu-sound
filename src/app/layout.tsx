import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Amber Yu Studio — Premium Casino Game Audio & Sound Design",
  description:
    "Classically trained composer crafting immersive audio for slot games, live casino & iGaming studios worldwide. Music composition, sound design, voice over & trailer audio.",
  keywords: [
    "Casino Game Sound Design",
    "Slot Game Music Composer",
    "iGaming Audio Production",
    "Sound Effects for Slot Games",
    "Bonus & Jackpot Sound Design",
    "Game Trailer Audio Production",
    "Freelance Casino Game Audio",
  ],
  openGraph: {
    title: "Amber Yu Studio — Premium Casino Game Audio",
    description:
      "Classically trained composer crafting immersive audio for slot games, live casino & iGaming studios worldwide.",
    type: "website",
    locale: "en_US",
    siteName: "Amber Yu Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amber Yu Studio — Premium Casino Game Audio",
    description:
      "Classically trained composer crafting immersive audio for slot games, live casino & iGaming studios worldwide.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
