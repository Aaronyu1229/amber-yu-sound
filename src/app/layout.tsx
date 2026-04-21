import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Dolce & Forte — Premium Game Audio Studio",
  description:
    "Audio that keeps players spinning. Slot games · Live casino · iGaming — sound design crafted for retention, immersion, and brand recognition by Dolce & Forte.",
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
    title: "Dolce & Forte — Premium Game Audio Studio",
    description:
      "Audio that keeps players spinning. Slot games · Live casino · iGaming — sound design for retention, immersion, and brand recognition.",
    type: "website",
    locale: "en_US",
    siteName: "Dolce & Forte",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolce & Forte — Premium Game Audio Studio",
    description:
      "Audio that keeps players spinning. Slot games · Live casino · iGaming — sound design for retention, immersion, and brand recognition.",
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
