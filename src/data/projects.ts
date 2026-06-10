// PLACEHOLDER portfolio items — replace titles, descriptions, tags and images
// with Tania's real economics work. `size: 'large'` spans two columns on desktop.
// Images live in /public/images and are referenced via withBase() in Portfolio.astro.
export interface Project {
  title: string;
  description?: string;
  category: string;
  /** Tailwind classes for the category chip (bg + text). */
  chipClass: string;
  /** 'large' = wide bento cell, 'small' = single cell. */
  size: 'large' | 'small';
  /** Optional background image filename in /public/images, or a Material icon name. */
  image?: string;
  icon?: string;
  href?: string;
}

export const projects: Project[] = [
  {
    title: 'Post-Pandemic Inflationary Trends', // PLACEHOLDER
    description: 'An in-depth study of consumer price indices across the G7 nations from 2020–2023.',
    category: 'MACROECONOMICS',
    chipClass: 'bg-primary text-on-primary',
    size: 'large',
    icon: 'trending_up',
  },
  {
    title: 'Game Theory in Retail Pricing', // PLACEHOLDER
    category: 'CASE STUDY',
    chipClass: 'bg-on-tertiary text-tertiary',
    size: 'small',
    icon: 'query_stats',
  },
  {
    title: 'Central Bank Digital Currencies', // PLACEHOLDER
    category: 'RESEARCH',
    chipClass: 'bg-on-secondary-container text-secondary-container',
    size: 'small',
    icon: 'account_balance',
  },
  {
    title: 'Micro-Loans and Emerging Markets', // PLACEHOLDER
    description: 'Quantitative analysis of peer-to-peer lending efficacy in Southeast Asian rural economies.',
    category: 'DEVELOPMENT',
    chipClass: 'bg-secondary text-on-secondary',
    size: 'large',
    icon: 'savings',
  },
];
