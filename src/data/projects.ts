export const PROJECT_GROUPS = [
  'real-evals',
  'rcx-sports',
  'independent',
] as const;
export type ProjectGroup = (typeof PROJECT_GROUPS)[number];

/**
 * Groups rendered as a single combined card instead of one card per project.
 * Every project keeps its own entry and /projects/<id> page; the card links
 * to each and shows the first project's screenshot.
 */
export const COMBINED_GROUPS: readonly ProjectGroup[] = ['rcx-sports'];

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  /** Lead item of its group: rendered as a wide card above the others. One per group. */
  highlight?: boolean;
  /** Text shown in the wide card's window chrome, e.g. 'real-evals / gmail'. Omitted: dots only. */
  windowLabel?: string;
  /** The demo URL lands on a login page, so the CTA says so. */
  demoRequiresLogin?: boolean;
  category: 'freelance' | 'personal' | 'professional';
  /** Body of work the project belongs to; drives the grouping on the home page. */
  group: ProjectGroup;
}

const getImageUrl = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const projects: Project[] = [
  {
    id: 'real-evals-gmail',
    title: 'Gmail Clone - REAL Evals',
    description:
      'Gmail clone I built for REAL Evals, where AI agents are evaluated against realistic apps. It covers email management, compose, labels, folders and search.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-gomail.vercel.app/',
    imageUrl: getImageUrl('/images/projects/gmail-clone-opt.webp'),
    featured: true,
    highlight: true,
    windowLabel: 'real-evals / gmail',
    category: 'freelance',
    group: 'real-evals',
  },
  {
    id: 'real-evals-dashdish',
    title: 'DoorDash Clone - REAL Evals',
    description:
      'DoorDash clone I built for REAL Evals. It covers restaurant browsing, menus, cart and checkout.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-dashdish.vercel.app/',
    imageUrl: getImageUrl('/images/projects/dashdish-clone-opt.webp'),
    featured: true,
    category: 'freelance',
    group: 'real-evals',
  },
  {
    id: 'real-evals-uber',
    title: 'Uber Clone - REAL Evals',
    description:
      'Uber clone I built for REAL Evals. It covers map integration, route calculation, price estimates and a simulated driver match.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-udriver.vercel.app/',
    imageUrl: getImageUrl('/images/projects/uber-clone-opt.webp'),
    featured: true,
    category: 'freelance',
    group: 'real-evals',
  },
  {
    id: 'real-evals-united',
    title: 'United Airlines Clone - REAL Evals',
    description:
      'United Airlines clone I built for REAL Evals. It covers flight search, seat selection, booking and trip management through multi-step forms.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-flyunified.vercel.app/',
    imageUrl: getImageUrl('/images/projects/united-clone-opt.webp'),
    featured: true,
    category: 'freelance',
    group: 'real-evals',
  },
  {
    id: 'nfl-league-finder',
    title: 'NFL League Finder - RCX Sports',
    description:
      'NFL FLAG league finder: families search local youth flag football programs and seasons by location and continue to registration. Integrated directly into nflflag.playrcx.com.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'MapLibre',
      'Chakra UI',
    ],
    demoUrl: 'https://nfl.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/nfl-finder-opt.webp'),
    windowLabel: 'rcx-sports / nfl-finder',
    category: 'professional',
    group: 'rcx-sports',
  },
  {
    id: 'nba-league-finder',
    title: 'NBA League Finder - RCX Sports',
    description:
      'Jr. NBA/WNBA league finder: families search local youth basketball programs and seasons by location and continue to registration.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'MapLibre',
      'Chakra UI',
    ],
    demoUrl: 'https://jrnba.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/nba-finder-opt.webp'),
    category: 'professional',
    group: 'rcx-sports',
  },
  {
    id: 'nhl-league-finder',
    title: 'NHL League Finder - RCX Sports',
    description:
      'NHL Street league finder: families search local youth street hockey programs and seasons by location and continue to registration.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'MapLibre',
      'Chakra UI',
    ],
    demoUrl: 'https://street.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/nhl-finder-opt.webp'),
    category: 'professional',
    group: 'rcx-sports',
  },
  {
    id: 'mls-league-finder',
    title: 'MLS League Finder - RCX Sports',
    description:
      'MLS GO league finder: families search local youth soccer programs and seasons by location and continue to registration.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'MapLibre',
      'Chakra UI',
    ],
    demoUrl: 'https://go.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/mls-finder-opt.webp'),
    category: 'professional',
    group: 'rcx-sports',
  },
  {
    id: 'magic-hour',
    title: 'Magic Hour — AI Creation Tools',
    description:
      "I built frontend features for Magic Hour's AI image and video generation and editing tools. The work included connecting generation jobs, asset validation, error handling and backend APIs in the Next.js app.",
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'PlanetScale',
      'Google Cloud',
    ],
    demoUrl: 'https://magichour.ai/products/ai-image-generator',
    imageUrl: getImageUrl('/images/projects/magichour-opt.webp'),
    category: 'freelance',
    group: 'independent',
  },
  {
    id: 'factupro',
    title: 'FactuPro - Invoice Management',
    description:
      'Invoice and billing app for small businesses. I built invoice generation, payment tracking, client management and automated reminders.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Shadcn UI',
      'React Hook Form',
      'Tailwind CSS',
      'REST API',
      'SSR',
      'CI/CD',
    ],
    demoUrl: 'https://app.factupro.es/login?from=%2F',
    demoRequiresLogin: true,
    imageUrl: getImageUrl('/images/projects/factupro-opt.webp'),
    category: 'freelance',
    group: 'independent',
  },
];
