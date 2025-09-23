import { notFound } from 'next/navigation';
import { services } from '@/lib/mock/services';
import { Reveal } from '@/components/ux/Reveal';
import { ParallaxItem } from '@/components/ux/Parallax';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return notFound();
  return (
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-3">{svc.title}</h1>
          <p className="text-muted-foreground max-w-prose mb-6">
            {svc.description}
          </p>
          <div className="space-y-6">
            <Reveal>
              <section>
                <h2 className="text-xl font-semibold mb-2">What we deliver</h2>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Discovery and solution design</li>
                  <li>Implementation with best practices</li>
                  <li>Testing, monitoring, and rollout</li>
                </ul>
              </section>
            </Reveal>
            <Reveal delay={0.08}>
              <section>
                <h2 className="text-xl font-semibold mb-2">Why us</h2>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Experienced, cross-functional teams</li>
                  <li>Design systems and platform thinking</li>
                  <li>Security, observability, and performance baked in</li>
                </ul>
              </section>
            </Reveal>
          </div>
        </div>
        <div className="md:sticky md:top-24">
          <ParallaxItem y={[-20, 20]}>
            <div className="h-64 rounded-xl border bg-gradient-to-br from-secondary to-white" />
          </ParallaxItem>
        </div>
      </div>
    </div>
  );
}
