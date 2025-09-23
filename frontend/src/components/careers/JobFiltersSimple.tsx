'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { Job } from '@/actions/jobs';

interface JobFiltersSimpleProps {
  jobs: Job[];
  onFilteredJobs: (filteredJobs: Job[]) => void;
}

const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing'];
const locations = ['All', 'San Jose, CA', 'New York, NY', 'Remote'];
const types = ['All', 'full-time', 'part-time', 'contract', 'internship'];

export default function JobFiltersSimple({
  jobs,
  onFilteredJobs,
}: JobFiltersSimpleProps) {
  const [filters, setFilters] = useState({
    department: 'All',
    location: 'All',
    type: 'All',
  });

  const [isRemote, setIsRemote] = useState(false);

  // Apply filters whenever filter state changes
  useEffect(() => {
    if (!Array.isArray(jobs)) {
      onFilteredJobs([]);
      return;
    }

    let filteredJobs = [...jobs];

    // Filter by department
    if (filters.department !== 'All') {
      filteredJobs = filteredJobs.filter(
        (job) => job.department === filters.department
      );
    }

    // Filter by location
    if (filters.location !== 'All') {
      filteredJobs = filteredJobs.filter(
        (job) => job.location === filters.location
      );
    }

    // Filter by type
    if (filters.type !== 'All') {
      filteredJobs = filteredJobs.filter((job) => job.type === filters.type);
    }

    // Filter by remote
    if (isRemote) {
      filteredJobs = filteredJobs.filter((job) => job.is_remote === true);
    }

    onFilteredJobs(filteredJobs);
  }, [filters, isRemote, jobs, onFilteredJobs]);

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      department: 'All',
      location: 'All',
      type: 'All',
    });
    setIsRemote(false);
  };

  const hasActiveFilters =
    filters.department !== 'All' ||
    filters.location !== 'All' ||
    filters.type !== 'All' ||
    isRemote;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Jobs
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Clear Filters
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label
              htmlFor="department-filter"
              className="text-sm font-medium mb-2 block"
            >
              Department
            </label>
            <select
              id="department-filter"
              value={filters.department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary/40 focus:border-primary"
              aria-label="Filter by department"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="location-filter"
              className="text-sm font-medium mb-2 block"
            >
              Location
            </label>
            <select
              id="location-filter"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary/40 focus:border-primary"
              aria-label="Filter by location"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="type-filter"
              className="text-sm font-medium mb-2 block"
            >
              Type
            </label>
            <select
              id="type-filter"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-primary/40 focus:border-primary"
              aria-label="Filter by job type"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              Remote Only
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remote-filter"
                checked={isRemote}
                onChange={(e) => setIsRemote(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
                aria-label="Show only remote jobs"
              />
              <label htmlFor="remote-filter" className="text-sm">
                Remote only
              </label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
