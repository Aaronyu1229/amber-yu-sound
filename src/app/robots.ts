import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // admin-temp is an unindexed temp endpoint; explicit deny so it
        // never accidentally appears in search results.
        disallow: ["/api/", "/admin-temp"],
      },
    ],
    sitemap: "https://dolcenforte.com/sitemap.xml",
    host: "https://dolcenforte.com",
  };
}
