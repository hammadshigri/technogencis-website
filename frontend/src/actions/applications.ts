'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export type ApplicationData = {
  jobSlug: string;
  name: string;
  email: string;
  phone: string;
  coverLetter: string;
  resume: File;
};

export type ApplicationResult = {
  success: boolean;
  error?: string;
  applicationId?: string;
};

export async function submitApplication(
  data: ApplicationData
): Promise<ApplicationResult> {
  try {
    const { jobSlug, name, email, phone, coverLetter, resume } = data;

    // Validate required fields
    if (!name || !email || !phone || !coverLetter || !resume) {
      return { success: false, error: 'Missing required fields' };
    }

    // For now, we'll store the resume as a base64 string
    // In production, you'd upload to Supabase Storage and get a URL
    const resumeBuffer = await resume.arrayBuffer();
    const resumeBase64 = Buffer.from(resumeBuffer).toString('base64');
    const resumeUrl = `data:${resume.type};base64,${resumeBase64}`;

    // Get job ID from slug (in production, query the jobs table)
    const jobId = 'mock-job-id'; // This should be fetched from Supabase

    // Insert application into Supabase
    const { data: application, error } = await supabaseServer
      .from('applications')
      .insert({
        job_id: jobId,
        user_id: null, // Will be set when user is authenticated
        status: 'pending',
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        applied_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: 'Failed to submit application' };
    }

    // Log application event
    await supabaseServer.from('events').insert({
      application_id: application.id,
      actor_id: null, // System event
      type: 'application_submitted',
      payload: {
        applicant_name: name,
        applicant_email: email,
        job_slug: jobSlug,
      },
    });

    // Revalidate careers pages
    revalidatePath('/careers');
    revalidatePath(`/careers/${jobSlug}`);

    return { success: true, applicationId: application.id };
  } catch (error) {
    console.error('Application submission error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
