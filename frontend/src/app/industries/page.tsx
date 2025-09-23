import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, BadgeCheck } from 'lucide-react';
import { industries } from '@/lib/mock/industries';
import { Stagger, StaggerItem } from '@/components/ux/Reveal';

export const metadata = { title: 'Industries' };

export default function IndustriesPage() {
  return (
    <div className="container py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Industries</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          We partner across sectors to deliver measurable outcomes and durable
          platforms.
        </p>
      </div>
      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {industries.map((i) => (
          <StaggerItem key={i.slug}>
            <Card className="group transition hover:shadow-md focus-within:ring-2 focus-within:ring-primary/40">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                      <Building2 />
                    </div>
                    <CardTitle>{i.name}</CardTitle>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <BadgeCheck className="h-4 w-4" /> Enterprise
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{i.summary}</p>
                <Link
                  className="text-primary underline focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                  href={`/industries/${i.slug}`}
                >
                  Learn more
                </Link>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
