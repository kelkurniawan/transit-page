import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import PainGain from "@/components/PainGain";
import Process from "@/components/Process";
import Route from "@/components/Route";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import FadeInObserver from "@/components/FadeInObserver";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa biaya jasa ekspedisi Jakarta Bandung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Biaya pengiriman barang dari Jakarta ke Bandung bervariasi tergantung jenis barang, volume, dan berat. Kami menawarkan harga kompetitif untuk pengiriman reguler maupun ekspres. Hubungi kami via WhatsApp untuk mendapatkan penawaran harga terbaik sesuai kebutuhan pengiriman Anda.",
      },
    },
    {
      "@type": "Question",
      name: "Berapa lama waktu pengiriman Jakarta ke Bandung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Pengiriman reguler memakan waktu 1-2 hari kerja, sementara layanan ekspres bisa sampai di hari yang sama (same-day delivery) tergantung waktu pickup. Kami memiliki jadwal pengiriman tetap setiap hari untuk memastikan barang Anda tiba tepat waktu.",
      },
    },
    {
      "@type": "Question",
      name: "Jenis barang apa saja yang bisa dikirim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Kami melayani pengiriman berbagai jenis barang termasuk bahan baku industri, produk manufaktur, elektronik, tekstil, spare part mesin, peralatan kantor, dan barang dagangan umum. Untuk barang dengan penanganan khusus, silakan konsultasikan terlebih dahulu dengan tim kami.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah ada layanan pickup barang dari lokasi pengirim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kami menyediakan layanan door-to-door pickup dari lokasi Anda di area Jakarta, Tangerang, Serpong (BSD), hingga Jabodetabek. Tim kami akan menjemput barang sesuai jadwal yang telah disepakati. Pengiriman juga dilakukan langsung ke alamat tujuan di Kota Bandung dan sekitarnya.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Transit melayani pengiriman dari Tangerang dan Serpong (BSD) ke Bandung?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, area penjemputan kami mencakup Jakarta, Tangerang, dan Serpong (BSD), serta sekitarnya. Barang Anda akan dijemput langsung dari lokasi dan dikirim ke Kota Bandung dan Bandung Raya via jalur darat. Layanan ini tersedia dua arah, baik dari Tangerang-Serpong ke Bandung maupun sebaliknya.",
      },
    },
    {
      "@type": "Question",
      name: "Bagaimana jaminan keamanan barang selama pengiriman?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Keamanan barang adalah prioritas utama kami. Setiap pengiriman ditangani oleh tim profesional yang berpengalaman. Barang dikemas dan dimuat dengan standar keamanan tinggi. Armada truk kami terawat dengan baik dan dilengkapi pengamanan yang memadai. Dengan pengalaman lebih dari 25 tahun, kami memiliki rekam jejak keamanan pengiriman yang sangat baik.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah bisa mengirim barang dari Bandung ke Jakarta?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, kami melayani pengiriman dua arah: dari Jakarta-Tangerang-Serpong ke Bandung dan sebaliknya. Rute kami mencakup area Jakarta, Tangerang, Serpong (BSD), hingga Kota Bandung dan Bandung Raya. Hubungi kami untuk informasi lebih lanjut mengenai jadwal dan tarif pengiriman.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah Transit melayani pengiriman untuk perusahaan (B2B)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ya, layanan utama kami adalah B2B — melayani kebutuhan logistik pabrik, perusahaan manufaktur, distributor, dan bisnis lainnya. Kami menyediakan kontrak pengiriman reguler dengan jadwal tetap, harga khusus untuk volume besar, dan layanan yang dapat disesuaikan dengan kebutuhan operasional bisnis Anda.",
      },
    },
    {
      "@type": "Question",
      name: "Sejak kapan Transit beroperasi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Transit (PT Transit Mega Raja) telah beroperasi sejak tahun 2001, menjadikan kami salah satu perusahaan jasa ekspedisi darat rute Jakarta-Bandung yang paling berpengalaman. Dengan lebih dari 25 tahun pengalaman, kami memahami seluk-beluk logistik dan pengiriman barang di koridor Jakarta-Bandung.",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: "Transit — Jasa Ekspedisi & Angkutan Barang Jakarta Bandung Sejak 2001",
  description:
    "Jasa ekspedisi & angkutan barang terpercaya rute dua arah Jakarta, Tangerang, Serpong (BSD) ⇄ Bandung sejak 2001. Pengiriman cepat via darat, tepat waktu, aman, harga transparan. Solusi logistik B2B untuk pabrik & bisnis. Konsultasi gratis via WhatsApp.",
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <PainGain />
        <Process />
        <Route />
        <FAQ />
        <CTA />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <FadeInObserver />
    </>
  );
}
