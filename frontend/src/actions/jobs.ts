'use server';

import { supabaseServer } from '@/lib/supabase-server';

export interface Job {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  type: string;
  department: string;
  requirements: string[];
  benefits: string[];
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
  is_remote: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export async function getAllJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabaseServer
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function getJobBySlug(slug: string): Promise<Job | null> {
  try {
    const { data, error } = await supabaseServer
      .from('jobs')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function getJobsByDepartment(department: string): Promise<Job[]> {
  try {
    const { data, error } = await supabaseServer
      .from('jobs')
      .select('*')
      .eq('department', department)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs by department:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching jobs by department:', error);
    return [];
  }
}

export async function getJobsByLocation(location: string): Promise<Job[]> {
  try {
    const { data, error } = await supabaseServer
      .from('jobs')
      .select('*')
      .eq('location', location)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs by location:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching jobs by location:', error);
    return [];
  }
}

export async function getJobsByType(type: string): Promise<Job[]> {
  try {
    const { data, error } = await supabaseServer
      .from('jobs')
      .select('*')
      .eq('type', type)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs by type:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching jobs by type:', error);
    return [];
  }
}

export async function getRemoteJobs(): Promise<Job[]> {
  try {
    const { data, error } = await supabaseServer
      .from('jobs')
      .select('*')
      .eq('is_remote', true)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching remote jobs:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching remote jobs:', error);
    return [];
  }
}
