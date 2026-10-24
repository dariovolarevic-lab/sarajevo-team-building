import type { MetadataRoute } from "next";
import { activities } from "@/lib/activities";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/activities`, lastModified: now, priority: 0.8 },
    ...activities.map((a) => ({
      url: `${site.url}/activities/${a.slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    { url: `${site.url}/contact`, lastModified: now, priority: 0.9 },
  ];
}
