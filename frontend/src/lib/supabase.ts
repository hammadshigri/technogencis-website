// Supabase client configuration
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          avatar_url?: string;
          role: 'admin' | 'user' | 'guest';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          avatar_url?: string;
          role?: 'admin' | 'user' | 'guest';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          role?: 'admin' | 'user' | 'guest';
          created_at?: string;
          updated_at?: string;
        };
      };
      jobs: {
        Row: {
          id: string;
          title: string;
          description: string;
          location: string;
          type: 'full-time' | 'part-time' | 'contract' | 'internship';
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
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          location: string;
          type: 'full-time' | 'part-time' | 'contract' | 'internship';
          department: string;
          requirements: string[];
          benefits: string[];
          salary_min?: number;
          salary_max?: number;
          salary_currency?: string;
          is_remote?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          location?: string;
          type?: 'full-time' | 'part-time' | 'contract' | 'internship';
          department?: string;
          requirements?: string[];
          benefits?: string[];
          salary_min?: number;
          salary_max?: number;
          salary_currency?: string;
          is_remote?: boolean;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      applications: {
        Row: {
          id: string;
          job_id: string;
          user_id: string;
          status:
            | 'pending'
            | 'reviewing'
            | 'interview'
            | 'accepted'
            | 'rejected';
          cover_letter?: string;
          resume_url: string;
          applied_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          job_id: string;
          user_id: string;
          status?:
            | 'pending'
            | 'reviewing'
            | 'interview'
            | 'accepted'
            | 'rejected';
          cover_letter?: string;
          resume_url: string;
          applied_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          job_id?: string;
          user_id?: string;
          status?:
            | 'pending'
            | 'reviewing'
            | 'interview'
            | 'accepted'
            | 'rejected';
          cover_letter?: string;
          resume_url?: string;
          applied_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

// Helper functions
export const supabaseHelpers = {
  // Get active jobs
  async getActiveJobs() {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }

    return data;
  },

  // Get job by ID
  async getJobById(id: string) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching job:', error);
      return null;
    }

    return data;
  },

  // Submit job application
  async submitApplication(
    application: Database['public']['Tables']['applications']['Insert']
  ) {
    const { data, error } = await supabase
      .from('applications')
      .insert(application)
      .select()
      .single();

    if (error) {
      console.error('Error submitting application:', error);
      return null;
    }

    return data;
  },

  // Get user applications
  async getUserApplications(userId: string) {
    const { data, error } = await supabase
      .from('applications')
      .select(
        `
        *,
        jobs (
          title,
          department,
          location
        )
      `
      )
      .eq('user_id', userId)
      .order('applied_at', { ascending: false });

    if (error) {
      console.error('Error fetching applications:', error);
      return [];
    }

    return data;
  },
};

export default supabase;
