import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://soulwars-site.vercel.app";
  return {
    rules: [
      { userAgent: "*",                  allow: "/" },
      { userAgent: "GPTBot",             allow: "/" },
      { userAgent: "ChatGPT-User",       allow: "/" },
      { userAgent: "OAI-SearchBot",      allow: "/" },
      { userAgent: "ClaudeBot",          allow: "/" },
      { userAgent: "Claude-Web",         allow: "/" },
      { userAgent: "anthropic-ai",       allow: "/" },
      { userAgent: "PerplexityBot",      allow: "/" },
      { userAgent: "YouBot",             allow: "/" },
      { userAgent: "Applebot",           allow: "/" },
      { userAgent: "Googlebot",          allow: "/" },
      { userAgent: "Google-Extended",    allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "Bytespider",         allow: "/" },
      { userAgent: "cohere-ai",          allow: "/" },
      { userAgent: "AI2Bot",             allow: "/" },
      { userAgent: "CCBot",              allow: "/" },
      { userAgent: "Diffbot",            allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
