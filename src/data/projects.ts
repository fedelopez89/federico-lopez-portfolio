export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  featuredLabel?: string;
  category: 'freelance' | 'personal' | 'professional';
}

const getImageUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const projects: Project[] = [
  {
    id: 'real-evals-gmail',
    title: 'Gmail Clone - REAL Evals',
    description:
      'Production-ready Gmail replica built for AI evaluation platform. Featured in The New York Times for innovative AI testing approach. Pixel-perfect recreation implementing email management, compose functionality, labels, folders, and advanced search. Built with Next.js and Material UI for optimal performance and accessibility.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-gomail.vercel.app/',
    imageUrl: getImageUrl('/images/projects/gmail-clone.webp'),
    featured: true,
    featuredLabel: 'Featured in The New York Times',
    category: 'freelance',
  },
  {
    id: 'real-evals-dashdish',
    title: 'DoorDash Clone - REAL Evals',
    description:
      'High-fidelity food delivery platform clone featuring restaurant browsing, menu exploration, cart management, and checkout flow. Built with Next.js and Material UI to replicate DoorDash user experience with responsive design and smooth interactions.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-dashdish.vercel.app/',
    imageUrl: getImageUrl('/images/projects/dashdish-clone.jpg'),
    featured: true,
    featuredLabel: 'Featured in The New York Times',
    category: 'freelance',
  },
  {
    id: 'real-evals-uber',
    title: 'Uber Clone - REAL Evals',
    description:
      'Comprehensive ride-sharing platform clone with real-time map integration, route calculation, pricing estimates, and driver matching simulation. Featured in The New York Times as part of REAL Evals AI testing platform. Built with Next.js and Material UI.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-udriver.vercel.app/',
    imageUrl: getImageUrl('/images/projects/uber-clone.jpg'),
    featured: true,
    featuredLabel: 'Featured in The New York Times',
    category: 'freelance',
  },
  {
    id: 'real-evals-united',
    title: 'United Airlines Clone - REAL Evals',
    description:
      'Full-featured airline booking platform clone replicating United Airlines flight search, seat selection, booking flow, and trip management. Implements complex multi-step forms, real-time availability, and responsive design with Next.js and Material UI.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Material UI', 'Redux'],
    demoUrl: 'https://real-flyunified.vercel.app/',
    imageUrl: getImageUrl('/images/projects/united-clone.jpg'),
    featured: true,
    featuredLabel: 'Featured in The New York Times',
    category: 'freelance',
  },
  {
    id: 'nfl-league-finder',
    title: 'NFL League Finder - RCX Sports',
    description:
      'Advanced search and discovery platform for NFL fantasy leagues. Features comprehensive filtering, real-time league data, team rosters, player stats, and league settings explorer. Built for RCX Sports platform to enhance league discovery experience.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'Context API',
      'REST API',
      'Google Maps API',
      'Chakra UI',
    ],
    demoUrl: 'https://nfl.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/nfl-finder.png'),
    category: 'professional',
  },
  {
    id: 'nba-league-finder',
    title: 'NBA League Finder - RCX Sports',
    description:
      'Search and discovery tool for NBA fantasy leagues with advanced filtering capabilities. Displays league information, team details, player rosters, and real-time statistics. Optimized for performance with thousands of leagues.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'Chakra UI',
    ],
    demoUrl: 'https://jrnba.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/nba-finder.png'),
    category: 'professional',
  },
  {
    id: 'nhl-league-finder',
    title: 'NHL League Finder - RCX Sports',
    description:
      'Comprehensive NHL fantasy league browser with filtering by league type, size, and settings. Features team analysis, player statistics, and league standings. Built with responsive design for seamless mobile and desktop experience.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'Chakra UI',
    ],
    demoUrl: 'https://street.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/nhl-finder.png'),
    category: 'professional',
  },
  {
    id: 'mls-league-finder',
    title: 'MLS League Finder - RCX Sports',
    description:
      'Soccer fantasy league discovery platform for MLS leagues. Enables users to search, filter, and explore leagues with detailed team rosters, player stats, and league configurations. Implements real-time data updates and intuitive navigation.',
    technologies: [
      'React',
      'TypeScript',
      'Next.js',
      'Context API',
      'REST API',
      'Google Maps API',
      'Chakra UI',
    ],
    demoUrl: 'https://go.playrcx.com/',
    imageUrl: getImageUrl('/images/projects/mls-finder.png'),
    category: 'professional',
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
    imageUrl: getImageUrl('/images/projects/factupro.png'),
    category: 'freelance',
  },
];

export const technologies = [
  'All',
  'React',
  'TypeScript',
  'Next.js',
  'Redux',
  'Material UI',
  'Chakra UI',
  'Context API',
  'REST API',
  'Google Maps API',
  'Shadcn UI',
  'React Hook Form',
  'Tailwind CSS',
  'CI/CD',
];
