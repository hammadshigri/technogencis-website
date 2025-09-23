import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://technogencis.com';
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
