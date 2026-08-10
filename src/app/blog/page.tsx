import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileCTABar from "@/components/MobileCTABar";

export const metadata: Metadata = {
  title: "Blog — Tips Ekspedisi & Logistik Jakarta Bandung",
  description:
    "Baca artikel dan tips seputar jasa ekspedisi, pengiriman barang, logistik, dan angkutan cargo rute Jakarta-Bandung dari PT Transit Mega Raja.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main>
        <section style={{ paddingTop: 140, paddingBottom: 80 }}>
          <div className="container">
            <div className="section-header">
              <div className="section-label">Blog</div>
              <h1 className="section-title">Artikel &amp; Tips Ekspedisi Jakarta Bandung</h1>
              <p className="section-subtitle">
                Informasi seputar jasa pengiriman barang, tips logistik, dan panduan ekspedisi
                darat rute Jakarta-Bandung untuk kebutuhan bisnis Anda.
              </p>
            </div>
            {posts.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--gray-500)" }}>
                Artikel segera hadir. Nantikan tips dan informasi seputar ekspedisi Jakarta-Bandung.
              </p>
            ) : (
              <div className="blog-grid">
                {posts.map((post) => (
                  <a key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                    <div className="blog-card-body">
                      <span className="blog-card-tag">{post.tag}</span>
                      <h3>{post.title}</h3>
                      <p>{post.description}</p>
                      <div className="blog-card-meta">
                        <span>{new Date(post.date).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric" })}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileCTABar />
    </>
  );
}
