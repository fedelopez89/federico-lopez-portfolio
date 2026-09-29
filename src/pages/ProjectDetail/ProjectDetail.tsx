import { useEffect, useRef, type MouseEvent } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { stackVariants, fadeUpVariants } from '../../styles/motion';
import { useProjectSeo } from './useProjectSeo';
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
  NotFound,
} from './ProjectDetail.styles';

/** Intrinsic size of the screenshots; reserves space before the image loads. */
const IMAGE_WIDTH = 1400;
const IMAGE_HEIGHT = 740;

const projectKey = (id: string) => id.replace(/-/g, '');

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const fromPortfolio = location.state?.fromPortfolio === true;

  const index = projects.findIndex((p) => p.id === id);
  const project = index === -1 ? undefined : projects[index];

  const translatedTitle = project
    ? t(`projects.${projectKey(project.id)}.title`, {
        defaultValue: project.title,
      })
    : '';
  const translatedDesc = project
    ? t(`projects.${projectKey(project.id)}.description`, {
        defaultValue: project.description,
      })
    : '';

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Move focus to the new page's heading on in-app navigation (prev/next,
    // links); the initial entry keeps the natural focus order and skip link.
    if (location.key !== 'default') {
      titleRef.current?.focus({ preventScroll: true });
    }
    // Only a project change should move focus, not a location state update.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useProjectSeo(project, translatedTitle, translatedDesc);

  const handleBack = () => {
    if (fromPortfolio) {
      navigate(-1);
    } else {
      navigate('/#projects');
    }
  };

  const newTab = t('header.newTab');

  if (!project) {
    // Keep the real href for middle-click and copy; plain clicks stay in the SPA.
    const goToProjects = (e: MouseEvent<HTMLElement>) => {
      const plain = !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);
      if (e.button !== 0 || !plain) return;
      e.preventDefault();
      navigate('/#projects');
    };

    return (
      <>
        <PageHeader>
          <SiteNav variant="page" />
        </PageHeader>
        <PageMain id="main-content" tabIndex={-1}>
          <Container>
            <NotFound>
              <h1>{t('projectDetail.notFoundTitle')}</h1>
              <p>{t('projectDetail.notFoundText')}</p>
              <Button href="/#projects" onClick={goToProjects}>
                {t('projectDetail.notFoundCta')}
              </Button>
            </NotFound>
          </Container>
        </PageMain>
        <Footer />
      </>
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

          <Stack variants={stackVariants} initial="hidden" animate="visible">
            <Intro variants={fadeUpVariants}>
              <MetaRow>
                <Eyebrow rule>
                  {t(`projects.categories.${project.category}`)}
                </Eyebrow>
                {project.featured && (
                  <Chip variant="accent">{t('projects.nytBadge')}</Chip>
                )}
              </MetaRow>
              <Title ref={titleRef} tabIndex={-1}>
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
                      {t('buttons.liveDemo')}
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

            <ScreenshotFrame variants={fadeUpVariants}>
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
