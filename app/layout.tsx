import "./globals.css";
import { ReactNode } from "react";
import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";

const siteUrl = "https://comedores-industriales.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Comedor Industrial y Servicio de Catering en Tijuana | Food The Child",
  description:
    "Comedor industrial y servicio de catering en Tijuana. Menus diarios, box lunch y eventos corporativos. Calidad, higiene y sabor casero para empresas.",
  alternates: {
    canonical: "/",
    languages: {
      "es-MX": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteUrl,
    siteName: "Food The Child",
    title: "Comedor Industrial y Servicio de Catering en Tijuana | Food The Child",
    description: "Comedor industrial, cocina industrial y catering para empresas en Tijuana y alrededores.",
    images: [
      {
        url: "/assets/comedor.jpg",
        alt: "Food The Child - Comedor industrial y catering en Tijuana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Comedor Industrial y Servicio de Catering en Tijuana | Food The Child",
    description: "Comedor industrial, cocina industrial y catering para empresas en Tijuana.",
    images: ["/assets/comedor.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Caterer",
    name: "Food The Child",
    url: siteUrl,
    telephone: "+52 664 186 8056",
    logo: `${siteUrl}/assets/logo.png`,
    image: `${siteUrl}/assets/comedor.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Calle Jose Lopez Portillo Ote. 10661-3",
      addressLocality: "Tijuana",
      addressRegion: "BC",
      addressCountry: "MX",
    },
    areaServed: ["Tijuana", "Baja California", "Rosarito"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
    ],
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteUrl,
    name: "Food The Child",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/?s={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  },
];

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es-MX">
      <head>
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
