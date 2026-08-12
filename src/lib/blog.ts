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

/**
 * Artikel terkait untuk ditampilkan di akhir sebuah artikel.
 *
 * Sebelumnya ini cuma `getAllPosts().slice(0, 2)` — yang berarti setiap artikel
 * menunjuk ke 2 artikel TERBARU yang sama, bukan yang relevan. Efeknya tidak ada
 * topical cluster: link internal menumpuk di dua halaman saja.
 *
 * Sekarang artikel bertag sama didahulukan, sisanya diisi artikel terbaru supaya
 * jumlahnya selalu penuh walau tag-nya cuma punya sedikit anggota.
 */
export function getRelatedPosts(
  locale: string,
  currentSlug: string,
  limit = 3
): BlogPost[] {
  const others = getAllPosts(locale).filter((p) => p.slug !== currentSlug);
  const current = getAllPosts(locale).find((p) => p.slug === currentSlug);
  if (!current) return others.slice(0, limit);

  const sameTag = others.filter((p) => p.tag === current.tag);
  const rest = others.filter((p) => p.tag !== current.tag);
  return [...sameTag, ...rest].slice(0, limit);
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

/**
 * Finds which locale a slug actually belongs to, searching every locale
 * directory under content/blog (optionally skipping one). Used to recover
 * from middleware locale-detection redirects that land on an unprefixed
 * article slug under the wrong locale (e.g. an English-preferring browser
 * redirected to /en/blog/<indonesian-slug>) — the slug is real, just not in
 * this locale, so it should resolve to its pair rather than 404.
 */
export function findLocaleForSlug(
  slug: string,
  excludeLocale?: string
): string | null {
  if (!fs.existsSync(contentRoot)) return null;
  const locales = fs
    .readdirSync(contentRoot)
    .filter((entry) => fs.statSync(path.join(contentRoot, entry)).isDirectory());

  for (const l of locales) {
    if (l === excludeLocale) continue;
    if (getAllPostSlugs(l).includes(slug)) return l;
  }
  return null;
}
