import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, Shield, Wrench, ChevronRight } from 'lucide-react';
import { services } from '@/lib/mock/services';
import { Stagger, StaggerItem } from '@/components/ux/Reveal';

export const metadata = { title: 'Services' };

export default function ServicesPage() {
  return (
    <div className="container py-16">
      <div className="mb-10">
        <h1 className="text-3xl font-bold">Services</h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Transform your business with cloud, data, and product engineering.
        </p>
      </div>
      <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, idx) => (
          <StaggerItem key={s.slug}>
            <Card className="group transition hover:shadow-md focus-within:ring-2 focus-within:ring-primary/40">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {
                    [<Zap key="z" />, <Shield key="s" />, <Wrench key="w" />][
                      idx % 3
                    ]
                  }
                  <CardTitle>{s.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{s.description}</p>
                <div className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                  <Link
                    href={`/services/${s.slug}`}
                    className="focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
                  >
                    Learn more
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
