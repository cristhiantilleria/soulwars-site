import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://soulwars-site.vercel.app";
  const now = new Date();
  const factions = ["shinigami","hollow","quincy","fullbringer","vaizard","bount","sinner"];

  return [
    { url: base,                          lastModified: now, changeFrequency: "weekly",  priority: 1    },
    { url: `${base}/#factions`,           lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${base}/#stats`,              lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/#mobs`,               lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/#perks`,              lastModified: now, changeFrequency: "monthly", priority: 0.8  },
    { url: `${base}/#builds`,             lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/#tips`,               lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${base}/updates`,             lastModified: now, changeFrequency: "daily",   priority: 0.9  },
    ...factions.map(slug => ({
      url: `${base}/factions/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    { url: `${base}/llms.txt`,            lastModified: now, changeFrequency: "weekly",  priority: 0.5  },
    { url: `${base}/llms-full.txt`,       lastModified: now, changeFrequency: "weekly",  priority: 0.5  },
  ];
}
