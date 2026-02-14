import { FC, Suspense, lazy } from 'react';
import { ScrollToTopButton } from '../layout/ScrollToTop';
import { LoadingSpinner } from '../ui';
import { MainContainer, Section } from './Main.styles';

// Lazy load sections for better performance
const AboutMe = lazy(() => import('../Sections/AboutMe/AboutMe'));
const Skills = lazy(() => import('../Sections/Skills/Skills'));
const Experience = lazy(() => import('../Sections/Experience/Experience'));
const Education = lazy(() => import('../Sections/Education/Education'));

interface SectionConfig {
  id: string;
  component: FC;
}

const sections: SectionConfig[] = [
  { id: 'aboutme', component: AboutMe },
  { id: 'skills', component: Skills },
  { id: 'experience', component: Experience },
  { id: 'education', component: Education },
];

const Main: FC = () => {
  return (
    <MainContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map((section) => {
        const Component = section.component;
        return (
          <Section
            key={section.id}
            id={section.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Component />
            </Suspense>
          </Section>
        );
      })}
      <ScrollToTopButton />
    </MainContainer>
  );
};

export default Main;
