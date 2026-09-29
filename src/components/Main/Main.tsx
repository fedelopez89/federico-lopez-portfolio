import { FC, useState } from 'react';
import { useHashScroll, useRestoreProjectFocus } from '@/hooks';
import { Container, Hairline } from '../ui';
import { ScrollToTopButton } from '../layout/ScrollToTop';
import AboutMe from '../Sections/AboutMe/AboutMe';
import Projects from '../Sections/Projects/Projects';
import Experience from '../Sections/Experience/Experience';
import Contact from '../Sections/Contact/Contact';
import { isViewTransitionActive } from '../../utils/viewTransition';
import { sectionTitleId } from '../Sections/shared/sectionTitleId';
import { MainContainer, Section, SectionBody } from './Main.styles';

interface SectionConfig {
  id: string;
  component: FC;
  /** Estimated rendered height (px) reserved while off-screen (desktop). */
  intrinsicHeight: number;
  /** Same, below the md breakpoint, where text wraps and cards stack. */
  intrinsicHeightMobile: number;
}

const sections: SectionConfig[] = [
  {
    id: 'aboutme',
    component: AboutMe,
    intrinsicHeight: 1200,
    intrinsicHeightMobile: 1700,
  },
  {
    id: 'projects',
    component: Projects,
    intrinsicHeight: 2950,
    intrinsicHeightMobile: 5200,
  },
  {
    id: 'experience',
    component: Experience,
    intrinsicHeight: 1650,
    intrinsicHeightMobile: 2600,
  },
  {
    id: 'contact',
    component: Contact,
    intrinsicHeight: 1000,
    intrinsicHeightMobile: 1500,
  },
];

const Main: FC = () => {
  useHashScroll();
  useRestoreProjectFocus();
  // Returning through a view transition: no entrance fade over the snapshot.
  const [skipEntrance] = useState(isViewTransitionActive);

  return (
    <MainContainer
      id="main-content"
      tabIndex={-1}
      initial={skipEntrance ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {sections.map(
        ({
          id,
          component: Component,
          intrinsicHeight,
          intrinsicHeightMobile,
        }) => (
          // Single landmark per section id: nav anchors, scroll spy and
          // aria-labelledby all target this element.
          <Section
            key={id}
            id={id}
            aria-labelledby={sectionTitleId(id)}
            $intrinsicHeight={intrinsicHeight}
            $intrinsicHeightMobile={intrinsicHeightMobile}
          >
            <Container>
              <Hairline aria-hidden="true" />
            </Container>
            <SectionBody>
              <Component />
            </SectionBody>
          </Section>
        )
      )}
      <ScrollToTopButton />
    </MainContainer>
  );
};

export default Main;
