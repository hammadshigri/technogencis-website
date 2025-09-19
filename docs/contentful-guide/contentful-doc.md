---
Contentful code for blogs or case studies
---

// src/app/(marketing)/blogs/page.jsx

import { fetchAllPosts } from "@/lib/contentful";
import BlogsClient from "./BlogsClient";

export const revalidate = 60; // ISR - cache refresh every 60s

export default async function BlogsPage() {
const posts = await fetchAllPosts();
return <BlogsClient posts={posts} />;
}

//src/lib/contentful.js
import { createClient } from "contentful";

export const client = createClient({
space: process.env.CONTENTFUL_SPACE_ID,
accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

function mapPost(item) {
}

export async function fetchAllPosts() {
const res = await client.getEntries({
content_type: "blogPost",
include: 2,
order: "-fields.publishDate",
});
return res.items.map(mapPost);
}

export async function fetchPostBySlug(slug) {
const res = await client.getEntries({
content_type: "blogPost",
"fields.slug": slug,
include: 2,
});
if (!res.items.length) return null;
return mapPost(res.items[0]);
}

// [slug]

// src/app/(marketing)/blogs/[slug]/page.jsx
import { fetchAllPosts, fetchPostBySlug } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

export async function generateStaticParams() {
const posts = await fetchAllPosts();
return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }) {
const post = await fetchPostBySlug(params.slug);
if (!post) return <div>Not found</div>;

return (
<div className="container-inner mx-auto px-4 py-12">
{/_ Banner _/}
{post.heroImage && (
<div className="rounded-xl overflow-hidden shadow-sm">
<img
            src={post.heroImage}
            alt={post.title}
            className="w-full h-80 object-cover"
          />
</div>
)}

      {/* Meta */}
      <div className="mt-6 flex items-center justify-between">
        <div>
          <div className="text-[7px] mb-7 bg-[var(--secondary)] w-fit px-5 py-1 rounded-[10px]  sm:text-[10px] uppercase text-[var(--primary)] font-semibold">
            {post.category?.title}
          </div>
          <h1 className="text-2xl font-bold text-[var(--primary)]">
            {post.title}
          </h1>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            {post.author?.photo && (
              <img
                src={post.author.photo}
                alt={post.author.name}
                className="w-9 h-9 rounded-full object-cover object-top mr-3"
              />
            )}
            <div>
              <div className="font-medium text-gray-700">
                {post.author?.name}
              </div>
              <div className="text-xs text-gray-400">
                {post.publishDate
                  ? new Date(post.publishDate).toLocaleDateString()
                  : ""}{" "}
                · {post.readingTime ? `${post.readingTime} min read` : ""}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <article className="blog-content max-w-none mt-8">
        {post.body ? (
          documentToReactComponents(post.body)
        ) : (
          <p>{post.excerpt}</p>
        )}
      </article>
    </div>

);
}
