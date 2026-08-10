import type { Metadata } from "next";
import { getPostBySlug, getAllPostSlugs, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileCTABar from "@/components/MobileCTABar";

const SITE_URL = "https://transitexpress.my.id";
const WA_LINK =
  "https://wa.me/6282124064792?text=Halo%2C%20saya%20ingin%20menanyakan%20layanan%20pengiriman%20barang.";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
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
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${slug}`;
  const related = getAllPosts().filter((p) => p.slug !== slug).slice(0, 2);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "id-ID",
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
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
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
      <Navbar />
      <article className="blog-post">
        <nav className="blog-breadcrumb" aria-label="Breadcrumb">
          <a href="/">Beranda</a> <span>/</span>{" "}
          <a href="/blog">Blog</a> <span>/</span> <span>{post.tag}</span>
        </nav>
        <div className="section-label">{post.tag}</div>
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          {new Date(post.date).toLocaleDateString("id-ID", {
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
          <h3>Butuh jasa ekspedisi Jakarta–Bandung yang terpercaya?</h3>
          <p>Konsultasi gratis dan dapatkan penawaran harga terbaik untuk kebutuhan pengiriman bisnis Anda.</p>
          <a href={WA_LINK} className="btn btn-wa btn-lg" target="_blank" rel="noopener noreferrer">
            Chat via WhatsApp
          </a>
        </div>

        {related.length > 0 && (
          <div className="blog-related">
            <h2>Artikel Lainnya</h2>
            <div className="blog-related-grid">
              {related.map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className="blog-related-card">
                  <span className="blog-card-tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1px solid var(--gray-200)" }}>
          <a href="/blog" style={{ color: "var(--blue)", fontWeight: 600, textDecoration: "none" }}>
            ← Kembali ke Blog
          </a>
        </div>
      </article>
      <Footer />
      <WhatsAppFloat />
      <MobileCTABar />
    </>
  );
}
