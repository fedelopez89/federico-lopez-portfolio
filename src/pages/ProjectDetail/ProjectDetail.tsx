import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle, rememberProject } from '@/hooks';
import { projects } from '../../data/projects';
import { NYT_HREF, NYT_NAME } from '../../data/featured';
import { SiteNav } from '../../components/SiteNav';
import Footer from '../../components/Footer/Footer';
import {
  Button,
  Chip,
  Container,
  Eyebrow,
  TextLink,
} from '../../components/ui';
import {
  isViewTransitionActive,
  navigateWithTransition,
  projectShotName,
  projectTitleName,
  signalViewTransitionReady,
  viewTransitionStyle,
} from '../../utils/viewTransition';
import { stackVariants, fadeUpVariants } from '../../styles/motion';
import { NotFoundView } from '../NotFound/NotFoundView';
import {
  projectKey,
  translateProject,
  type Translate,
} from '../../seo/projectMeta';
import { useNotFoundSeo } from '../../seo/useNotFoundSeo';
import { useProjectSeo } from './useProjectSeo';
import { useNoindex } from './useNoindex';
import {
  PageHeader,
  PageMain,
  BackButton,
  BackArrow,
  Stack,
  Intro,
  MetaRow,
  Title,
  Lead,
  Actions,
  ScreenshotFrame,
  Screenshot,
  ScreenshotPlaceholder,
  Body,
  FeaturedCallout,
  PublicationName,
  CalloutContext,
  TechSection,
  SectionTitle,
  TechList,
  Pager,
  PagerLink,
  PagerCard,
  PagerLabel,
  PagerTitle,
} from './ProjectDetail.styles';

/** Intrinsic size of the screenshots; reserves space before the image loads. */
const IMAGE_WIDTH = 1400;
const IMAGE_HEIGHT = 740;

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const fromPortfolio = location.state?.fromPortfolio === true;
  const fromProject: unknown = location.state?.fromProject;

  const index = projects.findIndex((p) => p.id === id);
  const project = index === -1 ? undefined : projects[index];

  const { name: translatedTitle, description: translatedDesc } = project
    ? translateProject(project, t as unknown as Translate)
    : { name: '', description: '' };

  const titleRef = useRef<HTMLHeadingElement>(null);
  // Arriving through a view transition: the snapshot needs the final layout,
  // so the entrance animation is skipped (decided once, on first render).
  const [skipEntrance] = useState(isViewTransitionActive);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Move focus to the new page's heading on in-app navigation (prev/next,
    // links); the initial entry keeps the natural focus order and skip link.
    if (location.key !== 'default') {
      titleRef.current?.focus({ preventScroll: true });
    }
    // Only a project change should move focus, not a location state update.
    // Scroll is settled: a running view transition can take its new snapshot.
    signalViewTransitionReady();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useProjectSeo(project);
  useNoindex(!project);
  useNotFoundSeo(!project);
  // Found projects get their title from useProjectSeo.
  useDocumentTitle(
    project
      ? undefined
      : `${t('projectDetail.notFoundTitle')} | ${t('header.name')}`
  );

  // The home route uses this to put focus back on the card that was opened,
  // for the Back button and the browser's back alike (WCAG 2.4.3).
  useEffect(() => {
    if (typeof fromProject !== 'string') return;
    rememberProject(fromProject);
    // Refresh on the way out so the marker's age counts from leaving.
    return () => rememberProject(fromProject);
  }, [fromProject]);

  const handleBack = () => {
    if (fromPortfolio) {
      navigateWithTransition(() => navigate(-1));
    } else {
      navigateWithTransition(() => navigate('/#projects'));
    }
  };

  const newTab = t('header.newTab');

  if (!project) {
    // Keep the real href for middle-click and copy; plain clicks stay in the SPA.
    const goToProjects = (e: MouseEvent<HTMLAnchorElement>) => {
      const plain = !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
      if (e.button !== 0 || !plain) return;
      e.preventDefault();
      navigate('/#projects');
    };

    return (
      <NotFoundView
        title={t('projectDetail.notFoundTitle')}
        text={t('projectDetail.notFoundText')}
        ctaLabel={t('projectDetail.notFoundCta')}
        ctaHref="/#projects"
        onCtaClick={goToProjects}
      />
    );
  }

  const neighbour = (offset: number) =>
    projects[(index + offset + projects.length) % projects.length];
  const neighbours =
    projects.length > 1
      ? [
          {
            project: neighbour(-1),
            label: t('projectDetail.previous'),
            align: 'start' as const,
          },
          {
            project: neighbour(1),
            label: t('projectDetail.next'),
            align: 'end' as const,
          },
        ]
      : [];

  return (
    <>
      <PageHeader>
        <SiteNav variant="page" />
      </PageHeader>

      <PageMain id="main-content" tabIndex={-1}>
        <Container>
          <BackButton type="button" onClick={handleBack}>
            <BackArrow aria-hidden="true">←</BackArrow>
            {t('buttons.backToPortfolio')}
          </BackButton>

          <Stack
            variants={stackVariants}
            initial={skipEntrance ? false : 'hidden'}
            animate="visible"
          >
            <Intro variants={fadeUpVariants}>
              <MetaRow>
                <Eyebrow rule>
                  {t(`projects.categories.${project.category}`)}
                </Eyebrow>
                {project.featured && (
                  <Chip variant="accent">{t('projects.nytBadge')}</Chip>
                )}
              </MetaRow>
              <Title
                ref={titleRef}
                tabIndex={-1}
                style={viewTransitionStyle(
                  projectTitleName(project.id),
                  'title'
                )}
              >
                {translatedTitle}
              </Title>
              <Lead>{translatedDesc}</Lead>
              {(project.demoUrl || project.repoUrl) && (
                <Actions>
                  {project.demoUrl && (
                    <Button
                      href={project.demoUrl}
                      external
                      externalLabel={newTab}
                      icon="↗"
                    >
                      {t(
                        project.demoRequiresLogin
                          ? 'buttons.openApp'
                          : 'buttons.liveDemo'
                      )}
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button
                      variant="secondary"
                      href={project.repoUrl}
                      external
                      externalLabel={newTab}
                      icon="↗"
                    >
                      {t('buttons.code')}
                    </Button>
                  )}
                </Actions>
              )}
            </Intro>

            <ScreenshotFrame
              variants={fadeUpVariants}
              style={viewTransitionStyle(projectShotName(project.id), 'shot')}
            >
              {project.imageUrl ? (
                <Screenshot
                  src={project.imageUrl}
                  alt={t('projects.imageAlt', { title: translatedTitle })}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <ScreenshotPlaceholder aria-hidden="true" />
              )}
            </ScreenshotFrame>
          </Stack>

          <Body>
            {project.featured && (
              <FeaturedCallout>
                <Eyebrow>{t('aboutMe.featuredLabel')}</Eyebrow>
                <PublicationName>{NYT_NAME}</PublicationName>
                <CalloutContext>{t('aboutMe.featuredContext')}</CalloutContext>
                <TextLink href={NYT_HREF} external externalLabel={newTab} arrow>
                  {t('aboutMe.featuredCta')}
                </TextLink>
              </FeaturedCallout>
            )}

            <TechSection aria-labelledby="project-tech-title">
              <SectionTitle id="project-tech-title">
                {t('projectDetail.technologies')}
              </SectionTitle>
              <TechList>
                {[...new Set(project.technologies)].map((tech) => (
                  <Chip as="li" key={tech}>
                    {tech}
                  </Chip>
                ))}
              </TechList>
            </TechSection>
          </Body>

          {neighbours.length > 0 && (
            <Pager aria-label={t('projectDetail.navLabel')}>
              {neighbours.map(({ project: p, label, align }) => (
                <PagerLink key={label} to={`/projects/${p.id}`} $align={align}>
                  <PagerCard>
                    <PagerLabel as="span" $align={align}>
                      {label}
                    </PagerLabel>
                    <PagerTitle>
                      {t(`projects.${projectKey(p.id)}.title`, {
                        defaultValue: p.title,
                      })}
                    </PagerTitle>
                  </PagerCard>
                </PagerLink>
              ))}
            </Pager>
          )}
        </Container>
      </PageMain>

      <Footer />
    </>
  );
}

export default ProjectDetail;
