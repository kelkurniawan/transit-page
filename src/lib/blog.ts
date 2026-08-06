import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const contentRoot = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tag: string;
  translationKey: string;
  content?: string;
}

function dirFor(locale: string) {
  return path.join(contentRoot, locale);
}

export function getAllPosts(locale: string): BlogPost[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const { data } = matter(fs.readFileSync(path.join(dir, fileName), "utf8"));
      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        tag: data.tag ?? "Artikel",
        translationKey: data.translationKey ?? slug,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(
  locale: string,
  slug: string
): Promise<BlogPost | null> {
  const fullPath = path.join(dirFor(locale), `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const { data, content: mdContent } = matter(
    fs.readFileSync(fullPath, "utf8")
  );
  const processed = await remark().use(html).process(mdContent);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    tag: data.tag ?? "Artikel",
    translationKey: data.translationKey ?? slug,
    content: processed.toString(),
  };
}

export function getAllPostSlugs(locale: string): string[] {
  const dir = dirFor(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getTranslatedSlug(
  translationKey: string,
  targetLocale: string
): string | null {
  const match = getAllPosts(targetLocale).find(
    (p) => p.translationKey === translationKey
  );
  return match ? match.slug : null;
}
