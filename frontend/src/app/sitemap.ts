import type { MetadataRoute } from 'next';
import { fetchAllPosts, fetchAllCaseStudies } from '@/lib/contentful';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://technogencis.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/services',
    '/industries',
    '/case-studies',
    '/about',
    '/contact',
    '/blogs',
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const [posts, cases] = await Promise.all([
    fetchAllPosts(),
    fetchAllCaseStudies(),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blogs/${p.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  const caseRoutes: MetadataRoute.Sitemap = cases.map((c) => ({
    url: `${baseUrl}/case-studies/${c.slug}`,
    changeFrequency: 'weekly',
    priority: 0.5,
  }));

  return [...staticRoutes, ...blogRoutes, ...caseRoutes];
}
