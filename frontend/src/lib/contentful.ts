// Contentful CMS integration (server-only env usage)
import { createClient, Entry } from 'contentful';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  body?: any;
  heroImage?: string;
  category?: { title?: string };
  author?: { name?: string; photo?: string };
  publishDate?: string;
  readingTime?: number;
};

type CaseStudy = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  heroImage?: string;
  metrics?: Array<{ label: string; value: string }>; // optional structured metrics
  body?: any;
};

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID || '';
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN || '';

const client = createClient({
  space: SPACE_ID,
  accessToken: ACCESS_TOKEN,
});

function getAssetUrl(asset: any | undefined): string | undefined {
  const url = asset?.fields?.file?.url;
  if (!url) return undefined;
  // Ensure protocol for Next/Image
  return url.startsWith('http') ? url : `https:${url}`;
}

export function mapPost(entry: any): BlogPost {
  const fields: any = entry?.fields || {};
  const hero: any = fields.heroImage || fields.featuredImage || fields.image;
  const author: any = fields.author || {};
  const authorPhoto: any = author?.fields?.photo || author?.fields?.avatar;

  return {
    id: entry.sys.id,
    slug: (fields.slug as string) || entry.sys.id,
    title: (fields.title as string) || 'Untitled',
    excerpt:
      (fields.excerpt as string) || (fields.summary as string) || undefined,
    body: (fields.body as any) || (fields.content as any) || undefined,
    heroImage: getAssetUrl(hero),
    category: fields.category
      ? { title: fields.category?.fields?.title }
      : undefined,
    author: author
      ? {
          name: author?.fields?.name,
          photo: getAssetUrl(authorPhoto),
        }
      : undefined,
    publishDate:
      (fields.publishDate as string) ||
      (fields.publishedDate as string) ||
      (fields.date as string) ||
      undefined,
    readingTime: (fields.readingTime as number) || undefined,
  };
}

export async function fetchAllPosts(): Promise<BlogPost[]> {
  try {
    const res = await client.getEntries({
      content_type: 'blogPost',
      include: 2,
      order: ['-fields.publishDate'],
    });
    return res.items.map(mapPost);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const res = await client.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });
    if (!res.items.length) return null;
    return mapPost(res.items[0]);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

function mapCaseStudy(entry: any): CaseStudy {
  const fields: any = entry?.fields || {};
  const hero: any = fields.heroImage || fields.featuredImage || fields.image;
  return {
    id: entry.sys.id,
    slug: (fields.slug as string) || entry.sys.id,
    title: (fields.title as string) || 'Untitled',
    excerpt:
      (fields.excerpt as string) || (fields.summary as string) || undefined,
    heroImage: getAssetUrl(hero),
    metrics: (fields.metrics as any) || undefined,
    body: (fields.body as any) || (fields.content as any) || undefined,
  };
}

export async function fetchAllCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await client.getEntries({
      content_type: 'caseStudy',
      include: 2,
      order: ['-fields.publishDate'],
    });
    return res.items.map(mapCaseStudy);
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return [];
  }
}

export async function fetchCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const res = await client.getEntries({
      content_type: 'caseStudy',
      'fields.slug': slug,
      include: 2,
      limit: 1,
    });
    if (!res.items.length) return null;
    return mapCaseStudy(res.items[0]);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return null;
  }
}

export type { BlogPost, CaseStudy };
