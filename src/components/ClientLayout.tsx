"use client";

import { LocaleProvider } from "@/lib/i18n";
import Nav from "./Nav";
import Footer from "./Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <Nav />
      <main className="flex-1">{children}</main>
      <Footer />
    </LocaleProvider>
  );
}
