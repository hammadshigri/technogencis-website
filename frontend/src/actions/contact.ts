'use server';

import { supabaseServer } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export type ContactFormData = {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
};

export type ContactActionResult = {
  success: boolean;
  error?: string;
  leadId?: string;
};

export async function submitContact(
  data: ContactFormData
): Promise<ContactActionResult> {
  try {
    const { name, email, company, subject, message } = data;

    // Validate required fields
    if (!name || !email || !message) {
      return { success: false, error: 'Missing required fields' };
    }

    // Insert into Supabase using service role
    const { data: lead, error } = await supabaseServer
      .from('leads')
      .insert({ name, email, company, subject, message })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: 'Failed to submit lead' };
    }

    // Revalidate any relevant paths if needed
    // revalidatePath('/contact');

    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error('Contact submission error:', error);
    return { success: false, error: 'An unexpected error occurred' };
  }
}
