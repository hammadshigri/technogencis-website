'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Reveal } from '@/components/ux/Reveal';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { submitApplication } from '@/actions/applications';

const applicationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  coverLetter: z
    .string()
    .min(50, 'Cover letter must be at least 50 characters'),
  resume: z.instanceof(File, { message: 'Resume is required' }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplyPageProps {
  params: Promise<{ slug: string }>;
}

export default function ApplyPage({ params }: ApplyPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const onSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitApplication({
        jobSlug: 'senior-software-engineer', // This should come from params
        name: data.name,
        email: data.email,
        phone: data.phone,
        coverLetter: data.coverLetter,
        resume: data.resume,
      });

      if (result.success) {
        setIsSubmitted(true);
      } else {
        throw new Error(result.error || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setValue('resume', file);
    }
  };

  if (isSubmitted) {
    return (
      <div className="container py-16">
        <Reveal>
          <Card className="max-w-2xl mx-auto text-center">
            <CardHeader>
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Application Submitted!
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Thank you for your interest in joining our team. We'll review
                your application and get back to you within 3-5 business days.
              </p>
              <div className="flex gap-4 justify-center">
                <Button asChild>
                  <Link href="/careers">View Other Jobs</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Back to Home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    );
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

      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Apply for Position</h1>
            <p className="text-muted-foreground">
              Please fill out the form below to submit your application.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Card>
            <CardHeader>
              <CardTitle>Application Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Full Name *
                    </label>
                    <Input
                      {...register('name')}
                      placeholder="Your full name"
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      {...register('email')}
                      placeholder="your.email@example.com"
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    {...register('phone')}
                    placeholder="+1 (555) 123-4567"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Resume *
                  </label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      {resumeFile ? (
                        <>
                          <FileText className="h-8 w-8 text-primary" />
                          <span className="text-sm font-medium">
                            {resumeFile.name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Click to change file
                          </span>
                        </>
                      ) : (
                        <>
                          <Upload className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            Upload your resume
                          </span>
                          <span className="text-xs text-muted-foreground">
                            PDF, DOC, or DOCX (max 10MB)
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                  {errors.resume && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.resume.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Cover Letter *
                  </label>
                  <Textarea
                    {...register('coverLetter')}
                    placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                    rows={6}
                    className={errors.coverLetter ? 'border-red-500' : ''}
                  />
                  {errors.coverLetter && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.coverLetter.message}
                    </p>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/careers">Cancel</Link>
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
