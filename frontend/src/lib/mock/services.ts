export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
}

export const services: ServiceItem[] = [
  {
    slug: 'custom-software',
    title: 'Custom Software Development',
    description:
      'End-to-end product engineering with modern stacks and cloud-native architectures.',
  },
  {
    slug: 'cloud-modernization',
    title: 'Cloud Modernization',
    description:
      'Migrate, optimize, and secure workloads on AWS/Azure/GCP with best practices.',
  },
  {
    slug: 'data-ai',
    title: 'Data & AI Solutions',
    description:
      'Data platforms, analytics, and AI-powered capabilities tailored to your business.',
  },
];
