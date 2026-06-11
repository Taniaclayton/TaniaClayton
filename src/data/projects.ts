export interface Project {
  slug: string;
  title: string;
  description?: string;
  category: string;
  chipClass: string;
  image?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    slug: 'post-pandemic-inflation',
    title: 'Post-Pandemic Inflationary Trends',
    description: 'An in-depth study of consumer price indices across the G7 nations from 2020–2023.',
    category: 'MACROECONOMICS',
    chipClass: 'bg-primary text-on-primary',
  },
  {
    slug: 'game-theory-retail-pricing',
    title: 'Game Theory in Retail Pricing',
    category: 'CASE STUDY',
    chipClass: 'bg-on-tertiary text-tertiary',
  },
  {
    slug: 'central-bank-digital-currencies',
    title: 'Central Bank Digital Currencies',
    category: 'RESEARCH',
    chipClass: 'bg-on-secondary-container text-secondary-container',
  },
  {
    slug: 'micro-loans-emerging-markets',
    title: 'Micro-Loans and Emerging Markets',
    description: 'Quantitative analysis of peer-to-peer lending efficacy in Southeast Asian rural economies.',
    category: 'DEVELOPMENT',
    chipClass: 'bg-secondary text-on-secondary',
  },
];
