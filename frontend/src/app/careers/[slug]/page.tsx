import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/ux/Reveal';
import { MapPin, Clock, Users, DollarSign, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { getJobBySlug } from '@/actions/jobs';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job) {
    return { title: 'Job Not Found' };
  }

  return {
    title: `${job.title} - Careers`,
    description: job.description,
  };
}

export default async function JobDetailPage({ params }: Params) {
  const { slug } = await params;
  const job = await getJobBySlug(slug);

  if (!job || !job.is_active) {
    return notFound();
  }

  return (
    <div className="container py-16">
      <Reveal>
        <div className="mb-8">
          <Link
            href="/careers"
            className="text-primary hover:underline text-sm"
          >
            ← Back to Careers
          </Link>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Reveal>
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
              <div className="flex items-center gap-4 mb-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {job.department}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {job.type}
                </div>
              </div>
              <div className="flex gap-2 mb-6">
                <Badge variant="secondary">{job.type}</Badge>
                {job.is_remote && <Badge variant="outline">Remote</Badge>}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{job.description}</p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.2}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.3}>
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {job.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Reveal delay={0.4}>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Apply for this position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{job.type}</span>
                  </div>
                  {job.salary_min && job.salary_max && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>
                        ${job.salary_min.toLocaleString()} - $
                        {job.salary_max.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                <Button asChild className="w-full">
                  <Link
                    href={`/careers/${job.slug}/apply`}
                    aria-label={`Apply for ${job.title} position`}
                  >
                    Apply Now
                  </Link>
                </Button>
                <p className="text-xs text-muted-foreground">
                  We'll review your application and get back to you within 3-5
                  business days.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
