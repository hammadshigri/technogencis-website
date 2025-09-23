import type { Metadata } from 'next';
import Image from 'next/image';
import { fetchAllPosts, fetchPostBySlug } from '@/lib/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  return {
    title: post?.title ? `${post.title} — Blog` : 'Blog',
    description: post?.excerpt,
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: post?.heroImage ? [{ url: post.heroImage } as any] : undefined,
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) {
    return (
      <main className="container mx-auto px-4 section-y">
        <h1 className="text-2xl font-semibold">Not found</h1>
        <p className="mt-2 text-muted-foreground">This post does not exist.</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 section-y">
      {post.heroImage ? (
        <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-xl elevation-1">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : null}

      <header className="mt-6">
        <div className="text-xs mb-3 inline-flex px-3 py-1 rounded-full bg-accent/20 text-accent-foreground">
          {post.category?.title}
        </div>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          {post.author?.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.author.photo}
              alt={post.author?.name || ''}
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : null}
          <div>
            <div className="font-medium text-foreground">
              {post.author?.name}
            </div>
            <div className="text-xs">
              {post.publishDate
                ? new Date(post.publishDate).toLocaleDateString()
                : ''}
              {post.readingTime ? ` · ${post.readingTime} min read` : ''}
            </div>
          </div>
        </div>
      </header>

      <article className="prose prose-neutral dark:prose-invert max-w-none mt-8 prose-headings:font-semibold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:pl-4 prose-blockquote:py-2">
        {post.body ? (
          documentToReactComponents(post.body as any)
        ) : (
          <p>{post.excerpt}</p>
        )}
      </article>
    </main>
  );
}
