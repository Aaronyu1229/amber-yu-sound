"use client";

import { LocaleProvider } from "@/lib/i18n";
import { AudioPlayerProvider } from "@/lib/audio/AudioPlayerContext";
import Nav from "./Nav";
import Footer from "./Footer";
import GlobalPlayerBar from "./GlobalPlayerBar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <AudioPlayerProvider>
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <GlobalPlayerBar />
      </AudioPlayerProvider>
    </LocaleProvider>
  );
}
