import type { Metadata } from "next";
import "./globals.css";

const BASE = "https://soulwars-site.vercel.app";

export const metadata: Metadata = {
  title: "Soul Wars — Community Wiki v3.0",
  description:
    "The complete community guide for Bleach: Soul Wars v3.0 — factions, skill trees, builds, perks, mob levels, and new player tips. Post-wipe April 2026.",
  keywords: [
    "Soul Wars", "Bleach", "BYOND", "wiki", "guide", "builds", "skill tree",
    "Shinigami", "Hollow", "Quincy", "Arrancar", "Bankai", "Shikai", "Wandenreich",
    "Vaizard", "Fullbringer", "Bount", "Sinner", "perks", "factions", "Schrift",
  ],
  metadataBase: new URL(BASE),
  openGraph: {
    title: "Soul Wars — Community Wiki v3.0",
    description: "Complete guide for Bleach: Soul Wars v3.0 — faction skill trees, builds, and post-wipe data.",
    url: BASE,
    siteName: "Soul Wars Community Wiki",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Wars — Community Wiki v3.0",
    description: "Complete guide for Bleach: Soul Wars v3.0 — skill trees, builds, and post-wipe data.",
  },
  alternates: { canonical: BASE },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE}/#website`,
      url: BASE,
      name: "Soul Wars Community Wiki",
      description: "Community guide for Bleach: Soul Wars v3.0 — factions, skill trees, builds, perks, mob levels.",
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${BASE}/#webpage`,
      url: BASE,
      name: "Soul Wars — Community Wiki v3.0",
      isPartOf: { "@id": `${BASE}/#website` },
      description: "Complete guide for Bleach: Soul Wars v3.0. 7 factions with skill trees, stat formulas, mob table, perk system, build maker, and new-player tips.",
      inLanguage: "en-US",
      dateModified: new Date().toISOString(),
    },
    {
      "@type": "ItemList",
      "@id": `${BASE}/#factions`,
      name: "Soul Wars Factions",
      numberOfItems: 7,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Shinigami", url: `${BASE}/factions/shinigami` },
        { "@type": "ListItem", position: 2, name: "Hollow / Arrancar", url: `${BASE}/factions/hollow` },
        { "@type": "ListItem", position: 3, name: "Quincy / Wandenreich", url: `${BASE}/factions/quincy` },
        { "@type": "ListItem", position: 4, name: "Fullbringer", url: `${BASE}/factions/fullbringer` },
        { "@type": "ListItem", position: 5, name: "Vaizard", url: `${BASE}/factions/vaizard` },
        { "@type": "ListItem", position: 6, name: "Bount", url: `${BASE}/factions/bount` },
        { "@type": "ListItem", position: 7, name: "Sinner", url: `${BASE}/factions/sinner` },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap"
          rel="stylesheet"
        />
        <link rel="alternate" type="text/plain" title="LLMs.txt" href="/llms.txt" />
        <link rel="alternate" type="text/plain" title="LLMs-full.txt" href="/llms-full.txt" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-body noise">{children}</body>
    </html>
  );
}
