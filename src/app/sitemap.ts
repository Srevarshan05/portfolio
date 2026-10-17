import type { MetadataRoute } from "next";

const SITE = "https://www.srevarshan.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE, lastModified: now, changeFrequency: "weekly", priority: 1, images: [`${SITE}/og-image.png`, `${SITE}/Profile.jpg`] },
    { url: `${SITE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];
}
