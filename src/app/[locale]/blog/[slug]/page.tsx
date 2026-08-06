import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  getPostBySlug,
  getAllPostSlugs,
  getAllPosts,
  getTranslatedSlug,
  findLocaleForSlug,
} from "@/lib/blog";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link, redirect } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const SITE_URL = "https://transitexpress.my.id";
const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(locale, slug);
  if (!post) return {};
  const path = locale === "id" ? `/blog/${slug}` : `/en/blog/${slug}`;
  const url = `${SITE_URL}${path}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: path },
    authors: [{ name: "Transit" }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/images/og-image.jpg"],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });
  const post = await getPostBySlug(locale, slug);
  if (!post) {
    // The slug doesn't exist in this locale. This commonly happens when
    // next-intl's Accept-Language detection redirects an unprefixed URL
    // (e.g. /blog/<indonesian-slug>) to a prefixed one (e.g.
    // /en/blog/<indonesian-slug>) — the slug is real, just under the wrong
    // locale, since ID/EN article slugs are deliberately different strings.
    // Resolve it to its pair in the active locale instead of 404ing.
    const ownerLocale = findLocaleForSlug(slug, locale);
    if (ownerLocale) {
      const ownerPost = await getPostBySlug(ownerLocale, slug);
      const pairedSlug = ownerPost
        ? getTranslatedSlug(ownerPost.translationKey, locale)
        : null;
      redirect({ href: pairedSlug ? `/blog/${pairedSlug}` : "/blog", locale });
    }
    // Genuinely unknown slug in every locale — a real 404.
    notFound();
  }

  const path = locale === "id" ? `/blog/${slug}` : `/en/blog/${slug}`;
  const url = `${SITE_URL}${path}`;
  const homeUrl = locale === "id" ? SITE_URL : `${SITE_URL}/en`;
  const blogUrl = locale === "id" ? `${SITE_URL}/blog` : `${SITE_URL}/en/blog`;
  const dateLocale = locale === "id" ? "id-ID" : "en-US";
  const related = getAllPosts(locale).filter((p) => p.slug !== slug).slice(0, 2);

  const slugMap = Object.fromEntries(
    routing.locales.map((l) => [
      l,
      l === locale ? slug : getTranslatedSlug(post.translationKey, l),
    ])
  ) as Record<string, string | null>;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    image: `${SITE_URL}/images/og-image.jpg`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "Transit" },
    publisher: {
      "@type": "Organization",
      name: "PT Transit Mega Raja",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.svg` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumbHome"), item: homeUrl },
      { "@type": "ListItem", position: 2, name: t("breadcrumbBlog"), item: blogUrl },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navbar slugMap={slugMap} />
      <article className="blog-post">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">{t("breadcrumbHome")}</Link> <span>/</span>{" "}
          <Link href="/blog">{t("breadcrumbBlog")}</Link> <span>/</span> <span>{post.tag}</span>
        </nav>
        <div className="section-label">{post.tag}</div>
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          {new Date(post.date).toLocaleDateString(dateLocale, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content! }}
        />

        <div className="blog-post-cta">
          <h3>{t("ctaHeading")}</h3>
          <p>{t("ctaBody")}</p>
          <a href={WA_LINK} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
            {t("ctaButton")}
          </a>
        </div>

        {related.length > 0 && (
          <div className="blog-related">
            <h2>{t("relatedHeading")}</h2>
            <div className="blog-related-grid">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-related-card">
                  <span className="blog-card-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--gray-200)" }}>
          <Link href="/blog" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>
            {t("backLink")}
          </Link>
        </div>
      </article>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
