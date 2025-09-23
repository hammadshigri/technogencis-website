import { notFound } from 'next/navigation';
import { industries } from '@/lib/mock/industries';
import { Reveal } from '@/components/ux/Reveal';
import SimpleLineChart from '@/components/ux/SimpleLineChart';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export default async function IndustryDetailPage({ params }: Params) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return notFound();
  const data = [
    { name: 'Q1', value: 24 },
    { name: 'Q2', value: 31 },
    { name: 'Q3', value: 28 },
    { name: 'Q4', value: 36 },
  ];
  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{ind.name}</h1>
        <p className="text-muted-foreground max-w-2xl mt-2">{ind.summary}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <Reveal>
          <div className="rounded border p-4">
            <h3 className="font-semibold mb-2">Key Challenges</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Scalability and performance under peak demand</li>
              <li>Regulatory compliance and data protection</li>
              <li>Legacy modernization and integration</li>
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="rounded border p-4">
            <h3 className="font-semibold mb-2">Our Solutions</h3>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
              <li>Cloud-native architectures and automation</li>
              <li>Data platforms and real-time analytics</li>
              <li>Secure APIs and interoperability</li>
            </ul>
          </div>
        </Reveal>
        <Reveal>
          <div className="rounded border p-4">
            <h3 className="font-semibold mb-2">Results & Metrics</h3>
            <SimpleLineChart data={data} />
            <p className="text-sm text-muted-foreground mt-2">
              Illustrative trend for outcomes (e.g., conversion, uptime).
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
