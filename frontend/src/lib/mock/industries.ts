export interface IndustryItem {
  slug: string;
  name: string;
  summary: string;
}

export const industries: IndustryItem[] = [
  {
    slug: 'fintech',
    name: 'FinTech',
    summary: 'Payments, compliance, and real-time risk analytics at scale.',
  },
  {
    slug: 'healthcare',
    name: 'Healthcare',
    summary: 'Interoperability, secure patient data, and digital experiences.',
  },
  {
    slug: 'retail',
    name: 'Retail & E‑commerce',
    summary:
      'Personalization, inventory intelligence, and omnichannel platforms.',
  },
];
