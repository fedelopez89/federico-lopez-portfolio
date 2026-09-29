import { FC } from 'react';
import { useHashScroll, useRestoreProjectFocus } from '@/hooks';
import { Container, Hairline } from '../ui';
import { ScrollToTopButton } from '../layout/ScrollToTop';
import AboutMe from '../Sections/AboutMe/AboutMe';
import Projects from '../Sections/Projects/Projects';
import Experience from '../Sections/Experience/Experience';
import Contact from '../Sections/Contact/Contact';
import { sectionTitleId } from '../Sections/shared/sectionTitleId';
import { MainContainer, Section, SectionBody } from './Main.styles';

interface SectionConfig {
  id: string;
  component: FC;
  /** Estimated rendered height (px) reserved while off-screen. */
  intrinsicHeight: number;
}

const sections: SectionConfig[] = [
  { id: 'aboutme', component: AboutMe, intrinsicHeight: 800 },
  { id: 'projects', component: Projects, intrinsicHeight: 2400 },
  { id: 'experience', component: Experience, intrinsicHeight: 1500 },
  { id: 'contact', component: Contact, intrinsicHeight: 1000 },
];

const Main: FC = () => {
  useHashScroll();
  useRestoreProjectFocus();

  return (
    <MainContainer
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map(({ id, component: Component, intrinsicHeight }) => (
        // Single landmark per section id: nav anchors, scroll spy and
        // aria-labelledby all target this element.
        <Section
          key={id}
          id={id}
          aria-labelledby={sectionTitleId(id)}
          $intrinsicHeight={intrinsicHeight}
        >
          <Container>
            <Hairline aria-hidden="true" />
          </Container>
          <SectionBody>
            <Component />
          </SectionBody>
        </Section>
      ))}
      <ScrollToTopButton />
    </MainContainer>
  );
};

export default Main;
