import type {MetadataRoute} from "next";
import {getAllPosts} from "@/lib/blog";
import {routing} from "@/i18n/routing";

export const dynamic = "force-static";

const baseUrl = "https://transitexpress.my.id";

function urlFor(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${baseUrl}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      {
        url: urlFor(locale, ""),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: urlFor(locale, "/blog"),
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }
    );

    for (const post of getAllPosts(locale)) {
      entries.push({
        url: urlFor(locale, `/blog/${post.slug}`),
        lastModified: post.date ? new Date(post.date) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return entries;
}
