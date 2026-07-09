import DeviceSizeIndicator from "@/components/essential/DeviceSizeIndicator";
import { fontLexendDeca, fontPrata } from "@/components/essential/Fonts";
import config from "@/config/site.config.json";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

import "@/styles/styles.scss";

const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata = {
  title: {
    default: config.metaData.title,
    template: `%s | ${config.logoText}`,
  },
  description: config.metaData.description,
  keywords: config.metaData.keyword,
  authors: [{ name: config.metaData.author }],

  icons: {
    icon: "/images/favicon.png",
  },

  metadataBase: new URL(config.siteURL),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: config.metaData.title,
    description: config.metaData.description,
    url: config.siteURL,
    siteName: config.metaData.title,
    images: config.metaData.ogImage,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: config.metaData.title,
    description: config.metaData.description,
    images: config.metaData.ogImage,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fontPrata.variable} ${fontLexendDeca.variable}`}
    >
      <body className="font-secondary">
        {adsenseClientId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <NextTopLoader
          color="#ff4848"
          shadow="none"
          showSpinner={false}
          zIndex={9999999}
          height={2}
        />
        <DeviceSizeIndicator />
        {children}
      </body>
    </html>
  );
}
