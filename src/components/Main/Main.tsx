import { FC } from 'react';
import { useHashScroll } from '@/hooks';
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
}

const sections: SectionConfig[] = [
  { id: 'aboutme', component: AboutMe },
  { id: 'projects', component: Projects },
  { id: 'experience', component: Experience },
  { id: 'contact', component: Contact },
];

const Main: FC = () => {
  useHashScroll();

  return (
    <MainContainer
      id="main-content"
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map(({ id, component: Component }) => (
        // Single landmark per section id: nav anchors, scroll spy and
        // aria-labelledby all target this element.
        <Section key={id} id={id} aria-labelledby={sectionTitleId(id)}>
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
