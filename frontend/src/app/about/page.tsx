import { leadership } from '@/lib/mock/leadership';
import { offices } from '@/lib/mock/offices';
import { Reveal } from '@/components/ux/Reveal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="container py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="text-muted-foreground max-w-2xl mt-2">
          We build modern software and data platforms that power digital
          businesses.
        </p>
      </div>
      {/* Company Story Timeline */}
      <Reveal>
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <ol className="relative border-l pl-5 space-y-4">
            <li>
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
              <div className="text-sm font-medium">Founded</div>
              <div className="text-xs text-muted-foreground">
                Vision to transform businesses through technology
              </div>
            </li>
            <li>
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
              <div className="text-sm font-medium">Global Expansion</div>
              <div className="text-xs text-muted-foreground">
                Opened offices and built cross‑functional teams
              </div>
            </li>
            <li>
              <div className="absolute -left-1.5 top-1 h-3 w-3 rounded-full bg-primary" />
              <div className="text-sm font-medium">Platform Thinking</div>
              <div className="text-xs text-muted-foreground">
                Design systems, automation, observability at scale
              </div>
            </li>
          </ol>
        </section>
      </Reveal>
      <h2 className="text-2xl font-semibold mb-4">Leadership</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leadership.map((l) => (
          <Card key={l.name} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{l.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{l.title}</p>
            </CardHeader>
            <CardContent>
              <details className="group">
                <summary className="list-none cursor-pointer flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Learn more
                  </span>
                  <span className="text-sm text-primary group-open:rotate-90 transition">
                    ›
                  </span>
                </summary>
                <div className="mt-2 text-sm text-muted-foreground">
                  {l.name} leads with a focus on delivery excellence and
                  long‑term value.
                </div>
              </details>
            </CardContent>
          </Card>
        ))}
      </div>
      <h2 className="text-2xl font-semibold mt-10 mb-4">Global Offices</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offices.map((o) => (
          <Card
            key={`${o.city}-${o.country}`}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4">
              <div className="font-medium">{o.city}</div>
              <div className="text-muted-foreground text-sm">{o.country}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
