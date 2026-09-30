export const PROJECT_GROUPS = [
  'real-evals',
  'rcx-sports',
  'independent',
] as const;
export type ProjectGroup = (typeof PROJECT_GROUPS)[number];

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
      'Production-ready Gmail replica built for AI evaluation platform. Pixel-perfect recreation implementing email management, compose functionality, labels, folders, and advanced search. Built with Next.js and Material UI for optimal performance and accessibility.',
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
      'High-fidelity food delivery platform clone featuring restaurant browsing, menu exploration, cart management, and checkout flow. Built with Next.js and Material UI to replicate DoorDash user experience with responsive design and smooth interactions.',
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
      'Comprehensive ride-sharing platform clone with real-time map integration, route calculation, pricing estimates, and driver matching simulation. Built with Next.js and Material UI.',
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
      'Full-featured airline booking platform clone replicating United Airlines flight search, seat selection, booking flow, and trip management. Implements complex multi-step forms, real-time availability, and responsive design with Next.js and Material UI.',
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
      'Built frontend features for AI image and video generation, editing workflows, and responsive product interfaces. Integrated generation jobs, asset validation, error handling, and backend APIs into the Next.js application.',
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
      'Complete invoice and billing management system for SMBs. Implemented invoice generation, payment tracking, client management, and automated reminders with responsive design and accessibility compliance.',
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
