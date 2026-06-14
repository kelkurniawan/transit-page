"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Berapa biaya jasa ekspedisi Jakarta Bandung?",
    a: "Biaya pengiriman barang dari Jakarta ke Bandung bervariasi tergantung jenis barang, volume, dan berat. Kami menawarkan harga kompetitif untuk pengiriman reguler maupun ekspres. Hubungi kami via WhatsApp untuk mendapatkan penawaran harga terbaik sesuai kebutuhan pengiriman Anda.",
  },
  {
    q: "Berapa lama waktu pengiriman Jakarta ke Bandung?",
    a: "Pengiriman reguler memakan waktu 1-2 hari kerja, sementara layanan ekspres bisa sampai di hari yang sama (same-day delivery) tergantung waktu pickup. Kami memiliki jadwal pengiriman tetap setiap hari untuk memastikan barang Anda tiba tepat waktu.",
  },
  {
    q: "Jenis barang apa saja yang bisa dikirim?",
    a: "Kami melayani pengiriman berbagai jenis barang termasuk bahan baku industri, produk manufaktur, elektronik, tekstil, spare part mesin, peralatan kantor, dan barang dagangan umum. Untuk barang dengan penanganan khusus, silakan konsultasikan terlebih dahulu dengan tim kami.",
  },
  {
    q: "Apakah ada layanan pickup barang dari lokasi pengirim?",
    a: "Ya, kami menyediakan layanan door-to-door pickup dari lokasi Anda di area Jakarta, Tangerang, Serpong (BSD), hingga Jabodetabek. Tim kami akan menjemput barang sesuai jadwal yang telah disepakati. Pengiriman juga dilakukan langsung ke alamat tujuan di Kota Bandung dan sekitarnya.",
  },
  {
    q: "Apakah Transit melayani pengiriman dari Tangerang dan Serpong (BSD) ke Bandung?",
    a: "Ya, area penjemputan kami mencakup Jakarta, Tangerang, dan Serpong (BSD), serta sekitarnya. Barang Anda akan dijemput langsung dari lokasi dan dikirim ke Kota Bandung dan Bandung Raya via jalur darat. Layanan ini tersedia dua arah, baik dari Tangerang-Serpong ke Bandung maupun sebaliknya.",
  },
  {
    q: "Bagaimana jaminan keamanan barang selama pengiriman?",
    a: "Keamanan barang adalah prioritas utama kami. Setiap pengiriman ditangani oleh tim profesional yang berpengalaman. Barang dikemas dan dimuat dengan standar keamanan tinggi. Armada truk kami terawat dengan baik dan dilengkapi pengamanan yang memadai. Dengan pengalaman lebih dari 25 tahun, kami memiliki rekam jejak keamanan pengiriman yang sangat baik.",
  },
  {
    q: "Apakah bisa mengirim barang dari Bandung ke Jakarta?",
    a: "Ya, kami melayani pengiriman dua arah: dari Jakarta-Tangerang-Serpong ke Bandung dan sebaliknya. Rute kami mencakup area Jakarta, Tangerang, Serpong (BSD), hingga Kota Bandung dan Bandung Raya. Hubungi kami untuk informasi lebih lanjut mengenai jadwal dan tarif pengiriman.",
  },
  {
    q: "Apakah Transit melayani pengiriman untuk perusahaan (B2B)?",
    a: "Ya, layanan utama kami adalah B2B — melayani kebutuhan logistik pabrik, perusahaan manufaktur, distributor, dan bisnis lainnya. Kami menyediakan kontrak pengiriman reguler dengan jadwal tetap, harga khusus untuk volume besar, dan layanan yang dapat disesuaikan dengan kebutuhan operasional bisnis Anda.",
  },
  {
    q: "Sejak kapan Transit beroperasi?",
    a: "Transit (PT Transit Mega Raja) telah beroperasi sejak tahun 2001, menjadikan kami salah satu perusahaan jasa ekspedisi darat rute Jakarta-Bandung yang paling berpengalaman. Dengan lebih dari 25 tahun pengalaman, kami memahami seluk-beluk logistik dan pengiriman barang di koridor Jakarta-Bandung.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <div className="section-header fade-in">
          <div className="section-label">Pertanyaan Umum</div>
          <h2 className="section-title">Frequently Asked Questions (FAQ)</h2>
          <p className="section-subtitle">
            Temukan jawaban untuk pertanyaan yang sering diajukan mengenai layanan jasa ekspedisi
            dan angkutan barang Jakarta-Bandung kami.
          </p>
        </div>
        <div className="faq-grid">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? " active" : ""}`}>
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <div
                className="faq-answer"
                style={{ maxHeight: openIndex === i ? "300px" : "0" }}
              >
                <div className="faq-answer-inner">{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
