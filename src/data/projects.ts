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
    slug: 'event-study-nifty-100',
    title: 'Event Study in Nifty 100 Markets',
    category: 'EVENT STUDY',
    chipClass: 'bg-primary text-on-primary',
  },
  {
    slug: 'drl-oligopoly-critique',
    title: 'Critique of DRL in Oligopoly',
    category: 'GAME THEORY',
    chipClass: 'bg-on-tertiary text-tertiary',
  },
  {
    slug: 'milo-finance-dashboard',
    title: 'Milo Finance Dashboard',
    category: 'FINTECH',
    chipClass: 'bg-on-secondary-container text-secondary-container',
  },
  {
    slug: 'public-econ-project',
    title: 'Public Econ Project',
    category: 'PUBLIC ECONOMICS',
    chipClass: 'bg-secondary text-on-secondary',
  },
  {
    slug: 'stoch-project',
    title: 'Stoch Project',
    category: 'STOCHASTIC PROCESSES',
    chipClass: 'bg-primary text-on-primary',
  },
];
