import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import "../globals.css";

export const metadata: Metadata = {
  title: {
    default: "Transit — Jasa Ekspedisi & Angkutan Barang Jakarta Bandung",
    template: "%s | Transit",
  },
  description:
    "Transit - Jasa ekspedisi dan angkutan barang terpercaya rute dua arah Jakarta-Bandung dan Bandung-Jakarta sejak 2001. Pengiriman cepat, tepat waktu, dan aman untuk kebutuhan bisnis Anda.",
  keywords: [
    "jasa ekspedisi jakarta bandung",
    "cargo jakarta bandung",
    "angkutan barang jakarta bandung",
    "jasa antar barang jakarta bandung",
    "jasa kirim barang jakarta bandung",
    "transportasi darat jakarta bandung",
    "ekspedisi murah jakarta bandung",
    "pengiriman barang jakarta bandung",
    "logistik jakarta bandung",
    "trucking jakarta bandung",
    "jasa angkutan barang",
    "ekspedisi darat jakarta bandung",
    "freight forwarding jakarta bandung",
    "ekspedisi tangerang bandung",
    "ekspedisi serpong bandung",
    "ekspedisi bsd bandung",
    "cargo serpong bandung",
    "pengiriman barang tangerang ke bandung",
    "ekspedisi b2b jakarta bandung",
    "jasa pengiriman pabrik jakarta bandung",
    "jasa ekspedisi bandung jakarta",
    "cargo bandung jakarta",
    "angkutan barang bandung jakarta",
    "pengiriman barang bandung jakarta",
    "ekspedisi bandung ke jakarta",
    "kirim barang bandung ke jakarta",
    "trucking bandung jakarta",
    "ekspedisi bandung tangerang",
    "cargo bandung serpong bsd",
    "ekspedisi dua arah jakarta bandung",
  ],
  authors: [{ name: "Transit" }],
  creator: "Transit",
  metadataBase: new URL("https://transitexpress.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Transit — Jasa Ekspedisi Jakarta Bandung Sejak 2001",
    description:
      "Layanan angkutan barang terpercaya rute Jakarta-Bandung. Pengiriman cepat, tepat waktu, dan aman untuk kebutuhan bisnis Anda.",
    url: "https://transitexpress.my.id",
    siteName: "Transit",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Transit — Jasa Ekspedisi & Angkutan Barang Jakarta-Bandung",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Transit — Jasa Ekspedisi Jakarta Bandung",
    description:
      "Jasa ekspedisi dan angkutan barang terpercaya rute Jakarta-Bandung sejak 2001.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Transit",
  legalName: "PT Transit Mega Raja",
  description:
    "Jasa ekspedisi dan angkutan barang terpercaya rute Jakarta-Bandung sejak 2001. Melayani pengiriman cargo, barang industri, dan kebutuhan logistik B2B.",
  foundingDate: "2001",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Krekot Bunder IV No.61, RT.6/RW.6, Ps. Baru",
    addressLocality: "Jakarta Pusat",
    addressRegion: "DKI Jakarta",
    postalCode: "10710",
    addressCountry: "ID",
  },
  email: "transitmegaraja@gmail.com",
  url: "https://transitexpress.my.id",
  image: "https://transitexpress.my.id/images/og-image.jpg",
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.1656,
    longitude: 106.834,
  },
  hasMap: "https://www.google.com/maps/search/?api=1&query=Transit+Mega+Raja+Jl.+Krekot+Bunder+IV+No.61+Jakarta+Pusat",
  areaServed: [
    { "@type": "City", name: "Jakarta" },
    { "@type": "City", name: "Tangerang" },
    { "@type": "City", name: "Serpong" },
    { "@type": "City", name: "BSD" },
    { "@type": "City", name: "Bekasi" },
    { "@type": "City", name: "Bandung" },
  ],
  serviceType: [
    "Freight Transportation",
    "Cargo Delivery",
    "Land Freight",
    "B2B Logistics",
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "08:00",
    closes: "17:00",
  },
};

const bandungBranchJsonLd = {
  "@context": "https://schema.org",
  "@type": "MovingCompany",
  name: "Transit — Cabang Bandung",
  parentOrganization: { "@type": "Organization", name: "PT Transit Mega Raja" },
  description:
    "Cabang Bandung Transit — jasa ekspedisi dan angkutan barang rute Jakarta-Bandung via jalur darat.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Caringin No. 35-39",
    addressLocality: "Kota Bandung",
    addressRegion: "Jawa Barat",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.946533,
    longitude: 107.586784,
  },
  hasMap: "https://maps.app.goo.gl/iWfVQZmWnhBN67Ka7",
  email: "transitmegaraja@gmail.com",
  url: "https://transitexpress.my.id",
  areaServed: [
    { "@type": "City", name: "Bandung" },
    { "@type": "City", name: "Kabupaten Bandung" },
    { "@type": "City", name: "Bandung Barat" },
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Transit",
  url: "https://transitexpress.my.id",
  inLanguage: "id-ID",
  publisher: { "@type": "Organization", name: "PT Transit Mega Raja" },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bandungBranchJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
