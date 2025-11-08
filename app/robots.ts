import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dashboard/*",
      },
    ],
    sitemap: "https://notes-app.vikramsamak.com/sitemap.xml",
  };
}
