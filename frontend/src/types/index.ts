// Common types used across the application

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: Date;
  updatedAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  department: string;
  requirements: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  isRemote: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected';
  coverLetter?: string;
  resumeUrl: string;
  appliedAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: Date;
  updatedAt: Date;
  tags: string[];
  featuredImage?: string;
  isPublished: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
