'use client';

import { useState, useCallback } from 'react';
import { Reveal } from '@/components/ux/Reveal';
import JobFiltersSimple from './JobFiltersSimple';
import JobsListSimple from './JobsListSimple';
import { Job } from '@/actions/jobs';

interface CareersClientProps {
  initialJobs: Job[];
}

export default function CareersClient({ initialJobs }: CareersClientProps) {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(initialJobs);

  const handleFilteredJobs = useCallback((jobs: Job[]) => {
    setFilteredJobs(jobs);
  }, []);

  return (
    <>
      {/* Filters */}
      <Reveal className="mb-8">
        <JobFiltersSimple
          jobs={initialJobs}
          onFilteredJobs={handleFilteredJobs}
        />
      </Reveal>

      {/* Jobs List */}
      <JobsListSimple key={filteredJobs.length} jobs={filteredJobs} />
    </>
  );
}
