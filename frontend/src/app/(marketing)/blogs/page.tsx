import Link from 'next/link';
import { fetchAllPosts } from '@/lib/contentful';
import { Card } from '@/components/ui/card';

export const revalidate = 60;

export default async function BlogsPage() {
  const posts = await fetchAllPosts();

  return (
    <main className="container mx-auto px-4 section-y">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
        Blogs
      </h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Insights, announcements, and deep dives from our team.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.id}
            className="hover:shadow-md transition-shadow overflow-hidden"
          >
            {post.heroImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.heroImage}
                alt={post.title}
                className="w-full h-44 object-cover"
              />
            ) : null}
            <div className="p-6">
              <h2 className="text-xl font-medium">
                <Link href={`/blogs/${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt ? (
                <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              ) : null}
              <div className="mt-4 text-xs text-muted-foreground">
                {post.publishDate
                  ? new Date(post.publishDate).toLocaleDateString()
                  : null}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </main>
  );
}
