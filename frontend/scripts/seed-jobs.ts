import { config } from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local FIRST
config({ path: '.env.local' });

// Debug: Check if environment variables are loaded
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log(
  'SUPABASE_SERVICE_ROLE_KEY:',
  process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Not set'
);

// Create Supabase client after loading env vars
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !serviceRole) {
  console.error('Missing required environment variables:');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', serviceRole ? 'Set' : 'Missing');
  process.exit(1);
}

const supabaseServer = createClient(supabaseUrl, serviceRole, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const jobs = [
  {
    slug: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    description:
      'Build scalable web applications using modern technologies. You will work with React, Node.js, TypeScript, and AWS to create innovative solutions.',
    location: 'San Jose, CA',
    type: 'full-time',
    department: 'Engineering',
    requirements: [
      '5+ years React/Node.js experience',
      'TypeScript proficiency',
      'AWS knowledge and experience',
      'Experience with modern development practices',
      'Strong problem-solving skills',
    ],
    benefits: [
      'Health insurance',
      '401k matching',
      'Flexible PTO',
      'Remote work options',
      'Learning and development budget',
    ],
    salary_min: 120000,
    salary_max: 160000,
    salary_currency: 'USD',
    is_remote: true,
    is_active: true,
  },
  {
    slug: 'product-manager',
    title: 'Product Manager',
    description:
      'Lead product strategy and roadmap for our core platform. You will work closely with engineering, design, and business teams to deliver exceptional products.',
    location: 'New York, NY',
    type: 'full-time',
    department: 'Product',
    requirements: [
      '3+ years PM experience',
      'Technical background preferred',
      'Analytics and data-driven decision making',
      'Strong communication skills',
      'Experience with agile methodologies',
    ],
    benefits: [
      'Health insurance',
      'Stock options',
      'Learning budget',
      'Flexible work arrangements',
      'Professional development',
    ],
    salary_min: 100000,
    salary_max: 140000,
    salary_currency: 'USD',
    is_remote: false,
    is_active: true,
  },
  {
    slug: 'devops-engineer',
    title: 'DevOps Engineer',
    description:
      'Manage infrastructure and deployment pipelines. You will work with Kubernetes, CI/CD, and monitoring tools to ensure reliable and scalable systems.',
    location: 'Remote',
    type: 'full-time',
    department: 'Engineering',
    requirements: [
      'Kubernetes experience',
      'CI/CD pipeline knowledge',
      'Monitoring and observability tools',
      'Infrastructure as Code',
      'Cloud platform experience',
    ],
    benefits: [
      'Health insurance',
      '401k matching',
      'Remote work',
      'Flexible schedule',
      'Equipment allowance',
    ],
    salary_min: 110000,
    salary_max: 150000,
    salary_currency: 'USD',
    is_remote: true,
    is_active: true,
  },
  {
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    description:
      'Create beautiful and responsive user interfaces. You will work with React, TypeScript, and modern CSS to build engaging user experiences.',
    location: 'San Francisco, CA',
    type: 'full-time',
    department: 'Engineering',
    requirements: [
      '3+ years React experience',
      'TypeScript proficiency',
      'CSS and responsive design',
      'Experience with design systems',
      'Testing and quality assurance',
    ],
    benefits: [
      'Health insurance',
      '401k matching',
      'Flexible PTO',
      'Remote work options',
      'Learning budget',
    ],
    salary_min: 90000,
    salary_max: 130000,
    salary_currency: 'USD',
    is_remote: true,
    is_active: true,
  },
  {
    slug: 'data-scientist',
    title: 'Data Scientist',
    description:
      'Extract insights from data to drive business decisions. You will work with machine learning, statistical analysis, and data visualization.',
    location: 'Boston, MA',
    type: 'full-time',
    department: 'Data',
    requirements: [
      'PhD or Masters in relevant field',
      'Python and R experience',
      'Machine learning expertise',
      'Statistical analysis skills',
      'Data visualization experience',
    ],
    benefits: [
      'Health insurance',
      '401k matching',
      'Research budget',
      'Conference attendance',
      'Flexible work arrangements',
    ],
    salary_min: 130000,
    salary_max: 180000,
    salary_currency: 'USD',
    is_remote: false,
    is_active: true,
  },
];

async function seedJobs() {
  console.log('🌱 Seeding jobs data...');

  try {
    // Clear existing jobs
    await supabaseServer
      .from('jobs')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert new jobs
    const { data, error } = await supabaseServer
      .from('jobs')
      .insert(jobs)
      .select();

    if (error) {
      console.error('❌ Error seeding jobs:', error);
      return;
    }

    console.log(`✅ Successfully seeded ${data.length} jobs`);
    console.log(
      'Jobs created:',
      data.map((job) => `${job.title} (${job.slug})`)
    );
  } catch (error) {
    console.error('❌ Error seeding jobs:', error);
  }
}

// Run the seed function
seedJobs()
  .then(() => {
    console.log('🎉 Seeding complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
  });
