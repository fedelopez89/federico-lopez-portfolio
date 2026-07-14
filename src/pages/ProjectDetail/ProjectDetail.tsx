import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import {
  PageWrapper,
  TopBar,
  BackButton,
  CategoryPill,
  HeroSection,
  HeroImg,
  HeroPlaceholder,
  HeroOverlay,
  HeroContent,
  FeaturedBadge,
  ProjectTitle,
  ContentArea,
  Description,
  NytCallout,
  NytCalloutIcon,
  NytCalloutText,
  Divider,
  TechSection,
  TechSectionLabel,
  TechGrid,
  TechBadge,
  CTASection,
  PrimaryLink,
  SecondaryLink,
  NotFoundWrapper,
  NotFoundTitle,
  NotFoundText,
  NotFoundBackLink,
} from './ProjectDetail.styles';

const CATEGORY_LABELS: Record<string, string> = {
  freelance: 'Freelance Project',
  professional: 'Professional Project',
  personal: 'Personal Project',
};

const ArrowLeftIcon = () => (
  <svg aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M19 12H5M12 5l-7 7 7 7" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg aria-hidden="true" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
  </svg>
);

const GithubIcon = () => (
  <svg aria-hidden="true" width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const NytIcon = () => (
  <svg aria-hidden="true" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M4 4h16v16H4z" />
    <path d="M4 8h16" />
    <path d="M8 4v4" />
    <path d="M8 12h8M8 16h5" />
  </svg>
);

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const fromPortfolio = location.state?.fromPortfolio === true;

  const project = projects.find((p) => p.id === id);

  const projectKey = project ? project.id.replace(/-/g, '') : '';
  const translatedTitle = project
    ? t(`projects.${projectKey}.title`, { defaultValue: project.title })
    : '';
  const translatedDesc = project
    ? t(`projects.${projectKey}.description`, { defaultValue: project.description })
    : '';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  useEffect(() => {
    if (!project) return;

    const BASE_URL = 'https://federicoglopez.dev';
    const projectUrl = `${BASE_URL}/projects/${project.id}`;
    const imageUrl = project.imageUrl
      ? `${BASE_URL}${project.imageUrl.startsWith('/') ? '' : '/'}${project.imageUrl}`
      : `${BASE_URL}/images/og-image.png`;
    const shortDesc = translatedDesc.slice(0, 160);

    const getMeta = (sel: string) =>
      document.querySelector(sel)?.getAttribute('content') ?? '';
    const setMeta = (sel: string, val: string) =>
      document.querySelector(sel)?.setAttribute('content', val);

    // ── Store originals ────────────────────────────────────────────
    const orig = {
      title: document.title,
      desc: getMeta('meta[name="description"]'),
      ogTitle: getMeta('meta[property="og:title"]'),
      ogDesc: getMeta('meta[property="og:description"]'),
      ogUrl: getMeta('meta[property="og:url"]'),
      ogImage: getMeta('meta[property="og:image"]'),
      twTitle: getMeta('meta[property="twitter:title"]'),
      twDesc: getMeta('meta[property="twitter:description"]'),
      twUrl: getMeta('meta[property="twitter:url"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    };

    // ── Apply project-specific meta ────────────────────────────────
    const pageTitle = `${translatedTitle} | Federico López`;
    document.title = pageTitle;
    setMeta('meta[name="description"]', shortDesc);
    setMeta('meta[property="og:title"]', pageTitle);
    setMeta('meta[property="og:description"]', shortDesc);
    setMeta('meta[property="og:url"]', projectUrl);
    setMeta('meta[property="og:image"]', imageUrl);
    setMeta('meta[property="twitter:title"]', pageTitle);
    setMeta('meta[property="twitter:description"]', shortDesc);
    setMeta('meta[property="twitter:url"]', projectUrl);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', projectUrl);

    // ── Inject project JSON-LD ─────────────────────────────────────
    const JSONLD_ID = 'project-jsonld';
    document.getElementById(JSONLD_ID)?.remove();
    const script = document.createElement('script');
    script.id = JSONLD_ID;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      '@id': projectUrl,
      name: translatedTitle,
      description: translatedDesc,
      url: projectUrl,
      applicationCategory: 'WebApplication',
      author: { '@id': `${BASE_URL}/#person` },
      keywords: project.technologies.join(', '),
      ...(project.demoUrl && { sameAs: project.demoUrl }),
      ...(project.imageUrl && {
        image: { '@type': 'ImageObject', url: imageUrl },
      }),
    });
    document.head.appendChild(script);

    // ── Restore on unmount ─────────────────────────────────────────
    return () => {
      document.title = orig.title;
      setMeta('meta[name="description"]', orig.desc);
      setMeta('meta[property="og:title"]', orig.ogTitle);
      setMeta('meta[property="og:description"]', orig.ogDesc);
      setMeta('meta[property="og:url"]', orig.ogUrl);
      setMeta('meta[property="og:image"]', orig.ogImage);
      setMeta('meta[property="twitter:title"]', orig.twTitle);
      setMeta('meta[property="twitter:description"]', orig.twDesc);
      setMeta('meta[property="twitter:url"]', orig.twUrl);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', orig.canonical);
      document.getElementById(JSONLD_ID)?.remove();
    };
  }, [project, translatedTitle, translatedDesc]);

  const handleBack = () => {
    if (fromPortfolio) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!project) {
    return (
      <NotFoundWrapper>
        <NotFoundTitle>Project not found</NotFoundTitle>
        <NotFoundText>The project you're looking for doesn't exist.</NotFoundText>
        <NotFoundBackLink to="/">
          <ArrowLeftIcon />
          Back to Portfolio
        </NotFoundBackLink>
      </NotFoundWrapper>
    );
  }

  const categoryLabel = CATEGORY_LABELS[project.category] ?? 'Project';
  const featuredLabel = project.featured
    ? t('projects.nytLabel', { defaultValue: 'Featured in The New York Times' })
    : '';

  return (
    <PageWrapper>
      <TopBar>
        <BackButton onClick={handleBack}>
          <ArrowLeftIcon />
          {t('buttons.backToPortfolio', { defaultValue: 'Back to Portfolio' })}
        </BackButton>
        <CategoryPill>{categoryLabel}</CategoryPill>
      </TopBar>

      <HeroSection>
        {project.imageUrl ? (
          <HeroImg src={project.imageUrl} alt={project.title} />
        ) : (
          <HeroPlaceholder />
        )}
        <HeroOverlay />
        <HeroContent>
          {project.featured && featuredLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <FeaturedBadge>★ {featuredLabel}</FeaturedBadge>
            </motion.div>
          )}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <ProjectTitle>{translatedTitle}</ProjectTitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.28 }}
      >
        <ContentArea>
          <Description>{translatedDesc}</Description>

          {project.featured && (
            <NytCallout>
              <NytCalloutIcon>
                <NytIcon />
              </NytCalloutIcon>
              <NytCalloutText>
                <p>Featured in The New York Times</p>
                <span>
                  This project was highlighted by The New York Times for its
                  innovative approach to AI evaluation.
                </span>
              </NytCalloutText>
            </NytCallout>
          )}

          <Divider />

          <TechSection aria-label="Technologies used">
            <TechSectionLabel>Technologies</TechSectionLabel>
            <TechGrid>
              {project.technologies.map((tech, i) => (
                <TechBadge key={`${tech}-${i}`}>{tech}</TechBadge>
              ))}
            </TechGrid>
          </TechSection>

          <CTASection>
            {project.demoUrl && (
              <PrimaryLink
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View live demo of ${project.title}`}
              >
                {t('buttons.liveDemo', { defaultValue: 'Live Demo' })}
                <ExternalLinkIcon />
              </PrimaryLink>
            )}
            {project.repoUrl && (
              <SecondaryLink
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View source code of ${project.title}`}
              >
                <GithubIcon />
                {t('buttons.code', { defaultValue: 'Code' })}
              </SecondaryLink>
            )}
          </CTASection>
        </ContentArea>
      </motion.div>
    </PageWrapper>
  );
}

export default ProjectDetail;
