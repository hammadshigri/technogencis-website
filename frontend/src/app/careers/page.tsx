import { Reveal } from '@/components/ux/Reveal';
import { getAllJobs } from '@/actions/jobs';
import CareersClient from '@/components/careers/CareersClient';

export const metadata = {
  title: 'Careers',
  description: 'Join our team and help build the future of technology.',
};

export default async function CareersPage() {
  const jobs = await getAllJobs();

  return (
    <div className="container py-16">
      <Reveal className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're building the future of technology. Come help us create
          innovative solutions that make a difference.
        </p>
      </Reveal>

      <CareersClient initialJobs={jobs} />
    </div>
  );
}
