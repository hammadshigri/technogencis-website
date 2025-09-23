import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const url = new URL(req.url);
  const secret =
    req.headers.get('x-revalidate-secret') || url.searchParams.get('secret');
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return new Response(JSON.stringify({ message: 'Invalid secret' }), {
      status: 401,
    });
  }

  try {
    let slug: string | undefined;
    try {
      const body = await req.json();
      // Attempt to derive slug from typical Contentful webhook payloads
      slug =
        body?.slug ||
        body?.fields?.slug ||
        body?.entry?.fields?.slug?.['en-US'] ||
        body?.sys?.id;
    } catch (_) {
      // no body or invalid JSON
    }

    // Revalidate list
    revalidatePath('/blogs');
    // Revalidate detail if we have a slug
    if (slug) revalidatePath(`/blogs/${slug}`);

    return Response.json({ revalidated: true, slug: slug || null });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Error revalidating' }), {
      status: 500,
    });
  }
}
