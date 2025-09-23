import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MainLayout } from '@/components/layout/main-layout';
import {
  ArrowRight,
  Code,
  Users,
  Zap,
  Shield,
  Globe2,
  Building2,
  ChevronRight,
  Briefcase,
} from 'lucide-react';
import { leadership } from '@/lib/mock/leadership';
import { offices } from '@/lib/mock/offices';
import { Reveal, Stagger, StaggerItem } from '@/components/ux/Reveal';
import { ParallaxWrapper, ParallaxItem } from '@/components/ux/Parallax';
import KpiTile from '@/components/ux/KpiTile';
import AvatarCard from '@/components/ux/Avatar';
import { services } from '@/lib/mock/services';
import { industries } from '@/lib/mock/industries';
import { caseStudies } from '@/lib/mock/case-studies';
import caseStudy1 from '@/public/images/Cyber-security_lock & hand.jpg';
import caseStudy2 from '@/public/images/cyber-security.jpg';

const caseImages = [caseStudy1, caseStudy2, caseStudy1];
export default function Home() {
  return (
    <MainLayout>
      <ParallaxWrapper>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Gradient + subtle pattern overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
          <div className="pointer-events-none absolute -top-1/3 -left-1/3 h-[80vh] w-[80vh] rounded-full opacity-20 blur-3xl bg-[radial-gradient(ellipse_at_center,theme(colors.accent)_0%,transparent_60%)]" />
          <div className="pointer-events-none absolute -bottom-1/3 -right-1/3 h-[70vh] w-[70vh] rounded-full opacity-10 blur-3xl bg-[radial-gradient(ellipse_at_center,theme(colors.primary)_0%,transparent_60%)]" />
          <div className="container py-24 md:py-32">
            <Reveal className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Technology Solutions for the{' '}
                <span className="text-primary">Future</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Leading technology solutions provider specializing in innovative
                software development, digital transformation, and cutting-edge
                technology consulting.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button
                  asChild
                  size="lg"
                  className="shadow-sm hover:shadow-md transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <Link href="/services">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="hover:shadow-sm focus-visible:ring-2 focus-visible:ring-primary/30"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Industries Highlight (split) */}
        <section className="container py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <Reveal className="order-2 md:order-1">
              <h3 className="text-2xl font-semibold mb-4">
                Industries we empower
              </h3>
              <p className="text-muted-foreground mb-6 max-w-prose">
                We partner across sectors to deliver measurable outcomes and
                durable platforms.
              </p>
              <Stagger className="space-y-3">
                {industries.slice(0, 4).map((i) => (
                  <StaggerItem key={i.slug}>
                    <div className="rounded-lg border p-4 hover:shadow-sm transition">
                      <div className="font-medium">{i.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {i.summary}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
            <Reveal className="order-1 md:order-2">
              {/* Visual placeholder (could be map/illustration) */}
              <ParallaxItem y={[-30, 30]}>
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border bg-gradient-to-br from-secondary to-white">
                  <div className="absolute -top-10 -left-10 h-56 w-56 rounded-full opacity-30 blur-2xl bg-[radial-gradient(ellipse_at_center,theme(colors.accent)_0%,transparent_60%)]" />
                  <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full opacity-20 blur-2xl bg-[radial-gradient(ellipse_at_center,theme(colors.primary)_0%,transparent_60%)]" />
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <Image
                      src={caseImages[0]}
                      alt="Industries"
                      width={320}
                      height={320}
                      className="w-auto h-auto opacity-90"
                    />
                  </div>
                </div>
              </ParallaxItem>
            </Reveal>
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose TechnoGencis?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We deliver cutting-edge technology solutions that drive business
              growth and innovation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <Code className="h-8 w-8 text-primary" />
                  <CardTitle>Innovation</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Cutting-edge technology solutions that keep you ahead of the
                    competition.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>Expert Team</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Experienced professionals dedicated to delivering
                    exceptional results.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary" />
                  <CardTitle>Fast Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Agile development processes that deliver results quickly and
                    efficiently.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-8 w-8 text-primary" />
                  <CardTitle>Reliable</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Robust, scalable solutions built to last and grow with your
                    business.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="container py-16">
          <Reveal>
            <div className="rounded-2xl bg-primary text-primary-foreground px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
              <div>
                <h3 className="text-2xl font-semibold">
                  Let’s build something great
                </h3>
                <p className="text-primary-foreground/80 mt-1 max-w-prose">
                  Tell us about your goals and we’ll get back within one
                  business day.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-background text-foreground hover:opacity-90"
              >
                <Link href="/contact">
                  Get in touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </section>
        {/* KPIs */}
        <section className="container py-12">
          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StaggerItem>
              <KpiTile value={3000} suffix="+" label="Successful Projects" />
            </StaggerItem>
            <StaggerItem>
              <KpiTile value={23} suffix="+" label="Countries Supported" />
            </StaggerItem>
            <StaggerItem>
              <KpiTile value={236} suffix="+" label="Active Clients" />
            </StaggerItem>
            <StaggerItem>
              <KpiTile value={15} suffix="+" label="Years Experience" />
            </StaggerItem>
          </Stagger>
        </section>

        {/* Teasers Section */}
        <section className="container py-16">
          <div className="grid grid-cols-1 gap-10">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Services</h3>
              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.slice(0, 3).map((s, idx) => (
                  <StaggerItem key={s.slug}>
                    <Card className="group transition hover:shadow-md focus-within:ring-2 focus-within:ring-primary/40">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg flex items-center justify-center bg-accent/10 text-accent transition group-hover:bg-accent group-hover:text-white">
                            {
                              [
                                <Briefcase key="b" />,
                                <Zap key="z" />,
                                <Shield key="s" />,
                              ][idx % 3]
                            }
                          </div>
                          <CardTitle>{s.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-3">
                          {s.description}
                        </CardDescription>
                        <div className="inline-flex items-center text-primary text-sm font-medium gap-1">
                          Learn more <ChevronRight className="h-4 w-4" />
                        </div>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Industries</h3>
              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {industries.slice(0, 3).map((i) => (
                  <StaggerItem key={i.slug}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{i.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{i.summary}</CardDescription>
                      </CardContent>
                    </Card>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Case Studies</h3>
              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {caseStudies.slice(0, 3).map((c, i) => (
                  <StaggerItem key={c.slug}>
                    <div className="group relative overflow-hidden rounded-xl border bg-card">
                      <div className="relative h-80">
                        <Image
                          src={caseImages[i % caseImages.length]}
                          alt={c.title}
                          fill
                          className="object-contain bg-gradient-to-br from-secondary to-white transition group-hover:scale-[1.03]"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
                      <div className="p-5">
                        <div className="text-lg font-semibold">{c.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {c.excerpt}
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Leadership</h3>
              <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {leadership.slice(0, 3).map((l) => (
                  <StaggerItem key={l.name}>
                    <AvatarCard name={l.name} title={l.title} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Global Presence</h3>
              <ParallaxItem y={[-15, 15]}>
                <div className="relative rounded-2xl border p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.accent/15),transparent_40%),radial-gradient(circle_at_70%_60%,theme(colors.primary/15),transparent_40%)]" />
                  <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
                    {offices.slice(0, 4).map((o) => (
                      <div
                        key={`${o.city}-${o.country}`}
                        className="rounded-xl bg-card/60 backdrop-blur p-4 border"
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Globe2 className="h-4 w-4 text-primary" />
                          {o.city}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {o.country}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute left-1/4 top-1/3 h-3 w-3 rounded-full bg-accent animate-pulse" />
                  <div className="absolute right-1/5 bottom-1/4 h-2.5 w-2.5 rounded-full bg-primary/80 animate-pulse" />
                </div>
              </ParallaxItem>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-24 md:py-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Join hundreds of companies that trust TechnoGencis for their
              technology needs.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/careers">View Careers</Link>
              </Button>
            </div>
          </div>
        </section>
      </ParallaxWrapper>
    </MainLayout>
  );
}
