import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Reveal } from '@/components/ux/Reveal';
import { fetchAllCaseStudies, fetchCaseStudyBySlug } from '@/lib/contentful';
import type { Metadata } from 'next';

interface Params {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await fetchAllCaseStudies();
  return items.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = await fetchCaseStudyBySlug(slug);
  return {
    title: cs?.title ? `${cs.title} — Case Study` : 'Case Study',
    description: cs?.excerpt,
    openGraph: {
      title: cs?.title,
      description: cs?.excerpt,
      images: cs?.heroImage ? [{ url: cs.heroImage } as any] : undefined,
      type: 'article',
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Params) {
  const { slug } = await params;
  const cs = await fetchCaseStudyBySlug(slug);
  if (!cs) return notFound();
  return (
    <div className="container py-16">
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-10">
        <Reveal>
          <div>
            <h1 className="text-3xl font-bold mb-3">{cs.title}</h1>
            <p className="text-muted-foreground max-w-prose">{cs.excerpt}</p>
            <div className="mt-5 grid grid-cols-3 gap-4">
              <div className="rounded-xl border p-3 text-center">
                <div className="text-xl font-semibold text-primary">35%</div>
                <div className="text-xs text-muted-foreground">
                  Cost Reduction
                </div>
              </div>
              <div className="rounded-xl border p-3 text-center">
                <div className="text-xl font-semibold text-primary">4x</div>
                <div className="text-xs text-muted-foreground">
                  Release Velocity
                </div>
              </div>
              <div className="rounded-xl border p-3 text-center">
                <div className="text-xl font-semibold text-primary">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative h-56 md:h-72 rounded-xl border overflow-hidden bg-gradient-to-br from-secondary to-white">
            {cs.heroImage ? (
              <Image
                src={cs.heroImage}
                alt={cs.title}
                fill
                className="object-cover"
              />
            ) : (
              <Image
                src="/globe.svg"
                alt={cs.title}
                fill
                className="object-contain p-8"
              />
            )}
          </div>
        </Reveal>
      </div>

      {/* Body Sections */}
      <div className="space-y-10">
        <Reveal>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Problem</h2>
            <p className="text-muted-foreground max-w-prose">
              Legacy systems and manual processes caused frequent delays,
              inconsistent customer experiences, and high operational costs.
            </p>
          </section>
        </Reveal>
        <Reveal delay={0.08}>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Approach</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 max-w-prose">
              <li>Incremental modernization with cloud-native services</li>
              <li>Unified design system and CI/CD pipelines</li>
              <li>Observability added across services for fast feedback</li>
            </ul>
          </section>
        </Reveal>
        <Reveal delay={0.16}>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Results</h2>
            <blockquote className="border-l-4 pl-4 italic text-muted-foreground">
              “The platform overhaul accelerated our roadmap and improved
              reliability across regions.”
            </blockquote>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1 max-w-prose mt-3">
              <li>
                Significant cost savings with autoscaling and right-sizing
              </li>
              <li>Improved release cadence and quality through automation</li>
              <li>Higher SLA attainment with proactive monitoring</li>
            </ul>
          </section>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={0.24}>
          <section>
            <h3 className="text-xl font-semibold mb-3">
              Implementation Timeline
            </h3>
            <ol className="relative border-l pl-5 space-y-4">
              <li>
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                <div className="text-sm font-medium">
                  Phase 1 — Discovery & Design
                </div>
                <div className="text-xs text-muted-foreground">
                  Stakeholder interviews, architecture, and roadmap
                </div>
              </li>
              <li>
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                <div className="text-sm font-medium">
                  Phase 2 — Implementation
                </div>
                <div className="text-xs text-muted-foreground">
                  Service buildout, CI/CD, and design system rollout
                </div>
              </li>
              <li>
                <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
                <div className="text-sm font-medium">
                  Phase 3 — Hardening & Launch
                </div>
                <div className="text-xs text-muted-foreground">
                  Observability, performance, and cutover planning
                </div>
              </li>
            </ol>
          </section>
        </Reveal>
      </div>
    </div>
  );
}
