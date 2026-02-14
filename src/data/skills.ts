import type { SkillsConfig } from '@/types';

export const skillsData: SkillsConfig = {
  sectionId: 'skills',
  categories: [
    {
      title: 'frontend core',
      className: 'skill-fe',
      skills: [
        { name: 'react / next.js', level: 95, className: 'reactjs' },
        { name: 'typescript', level: 90, className: 'typescript' },
        { name: 'javascript (es6+)', level: 95, className: 'javascript' },
        { name: 'html5 / css3', level: 95, className: 'html-css' },
        { name: 'tailwind css', level: 85, className: 'tailwind' },
        {
          name: 'styled-components',
          level: 90,
          className: 'styled-components',
        },
      ],
    },
    {
      title: 'frameworks & libraries',
      className: 'skill-frameworks',
      skills: [
        { name: 'material-ui / mui', level: 90, className: 'materialUI' },
        { name: 'react native', level: 75, className: 'react-native' },
        { name: 'redux / zustand', level: 85, className: 'redux' },
        { name: 'framer motion', level: 80, className: 'framer-motion' },
        { name: 'react query', level: 80, className: 'react-query' },
      ],
    },
    {
      title: 'backend & tools',
      className: 'skill-be',
      skills: [
        { name: 'node.js / express', level: 80, className: 'nodejs' },
        { name: 'rest apis / graphql', level: 85, className: 'apis' },
        { name: 'git / github', level: 95, className: 'git' },
        { name: 'vite / webpack', level: 85, className: 'build-tools' },
        { name: 'jest / vitest', level: 80, className: 'testing' },
      ],
    },
    {
      title: 'database & deployment',
      className: 'skill-db',
      skills: [
        { name: 'mongodb / mongoose', level: 80, className: 'mongodb' },
        { name: 'postgresql / sql', level: 85, className: 'sql' },
        { name: 'vercel / netlify', level: 85, className: 'deployment' },
        { name: 'docker basics', level: 70, className: 'docker' },
        { name: 'aws / cloud services', level: 70, className: 'cloud' },
      ],
    },
  ],
};
