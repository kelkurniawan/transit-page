import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts } from "@/lib/blog";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("blog.title"),
    description: t("blog.description"),
    alternates: {
      canonical: locale === "id" ? "/blog" : "/en/blog",
      languages: {
        id: "/blog",
        en: "/en/blog",
        "x-default": "/blog",
      },
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = getAllPosts(locale);
  const dateLocale = locale === "id" ? "id-ID" : "en-US";

  return (
    <>
      <Navbar />
      <main>
        <section style={{ paddingTop: 140, paddingBottom: 80 }}>
          <div className="container">
            <div className="section-header">
              <div className="section-label">{t("label")}</div>
              <h1 className="section-title">{t("title")}</h1>
              <p className="section-subtitle">{t("subtitle")}</p>
            </div>
            {posts.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--gray-500)" }}>
                {t("empty")}
              </p>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => (
                  <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div className="blog-card-body">
                      <span className="blog-card-tag">{post.tag}</span>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <div className="blog-card-meta">
                        <span>
                          {new Date(post.date).toLocaleDateString(dateLocale, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
