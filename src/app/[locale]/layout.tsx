import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import AnalyticsEvents from "@/components/AnalyticsEvents";
import { routing } from "@/i18n/routing";
import "../globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: {
      default: t("title"),
      template: t("titleTemplate"),
    },
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    authors: [{ name: "Transit" }],
    creator: "Transit",
    metadataBase: new URL("https://transitexpress.my.id"),
    alternates: {
      canonical: locale === "id" ? "/" : "/en",
      languages: {
        id: "/",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: locale === "id" ? "/" : "/en",
      siteName: "Transit",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("twitterTitle"),
      description: t("twitterDescription"),
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
}

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

  const t = await getTranslations({ locale, namespace: "Schema" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: "Transit",
    legalName: "PT Transit Mega Raja",
    description: t("company.description"),
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
    name: t("bandungBranch.name"),
    parentOrganization: { "@type": "Organization", name: "PT Transit Mega Raja" },
    description: t("bandungBranch.description"),
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
    inLanguage: locale === "id" ? "id-ID" : "en-US",
    publisher: { "@type": "Organization", name: "PT Transit Mega Raja" },
  };

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
        {/* .fade-in mulai dari opacity:0 dan hanya dibuka oleh IntersectionObserver.
            Tanpa JS seluruh konten tak terlihat. */}
        <noscript>
          <style>{`.fade-in { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <AnalyticsEvents />
        <Analytics />
        {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
      </body>
    </html>
  );
}
