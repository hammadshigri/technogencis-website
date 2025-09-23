export interface CaseStudyItem {
  slug: string;
  title: string;
  excerpt: string;
}

export const caseStudies: CaseStudyItem[] = [
  {
    slug: 'global-retailer-modernization',
    title: 'Global Retailer: Cloud Modernization',
    excerpt: 'Reduced infra costs by 35% and improved release velocity 4x.',
  },
  {
    slug: 'banking-realtime-payments',
    title: 'Banking: Real-time Payments',
    excerpt: 'Launched instant payments rail with sub-second latency.',
  },
  {
    slug: 'cyber-security',
    title: 'Cyber Security',
    excerpt: 'Launched instant payments rail with sub-second latency.',
  },
];
