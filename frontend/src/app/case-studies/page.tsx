import Link from 'next/link';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Stagger, StaggerItem } from '@/components/ux/Reveal';
import { fetchAllCaseStudies } from '@/lib/contentful';

export const metadata = { title: 'Case Studies' };
export const revalidate = 60;

export default async function CaseStudiesPage() {
  const items = await fetchAllCaseStudies();
  return (
    <div className="container py-16">
      <h1 className="text-3xl font-bold mb-8">Case Studies</h1>
      <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((c) => (
          <StaggerItem key={c.slug}>
            <Link
              href={`/case-studies/${c.slug}`}
              className="group block rounded-xl border overflow-hidden focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Card className="relative">
                <div className="relative h-56">
                  {c.heroImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.heroImage}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-white" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <div className="p-5">
                  <div className="text-lg font-semibold">{c.title}</div>
                  {c.excerpt ? (
                    <div className="text-sm text-muted-foreground line-clamp-2">
                      {c.excerpt}
                    </div>
                  ) : null}
                </div>
              </Card>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
