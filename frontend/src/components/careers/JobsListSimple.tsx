'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import { Job } from '@/actions/jobs';

interface JobsListSimpleProps {
  jobs: Job[];
}

export default function JobsListSimple({ jobs }: JobsListSimpleProps) {
  // Defensive programming: ensure jobs is valid
  if (!Array.isArray(jobs)) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">
            Error loading jobs. Please try again.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (jobs.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <p className="text-muted-foreground">
            No jobs found matching your criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {jobs.map((job, index) => {
        // Defensive programming: validate job object
        if (!job || typeof job !== 'object' || !job.id) {
          return null;
        }

        return (
          <Card key={job.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">
                    <Link
                      href={`/careers/${job.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {job.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
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
                </div>
                <div className="flex flex-col gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  {job.is_remote && <Badge variant="outline">Remote</Badge>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{job.description}</p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {job.salary_min && job.salary_max && (
                    <span>
                      ${job.salary_min.toLocaleString()} - $
                      {job.salary_max.toLocaleString()}
                    </span>
                  )}
                </div>
                <Button asChild>
                  <Link
                    href={`/careers/${job.slug}`}
                    aria-label={`Apply for ${job.title} position`}
                  >
                    Apply Now
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
