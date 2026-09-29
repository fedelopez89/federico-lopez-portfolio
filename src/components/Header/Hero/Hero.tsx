import { FC, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useMediaQueryHysteresis, usePointerGlow } from '@hooks';
import { NYT_HREF } from '../../../data/featured';
import { RESUME_FILENAME, RESUME_HREF } from '../../../data/resume';
import { Button, Container, Eyebrow, TextLink } from '../../ui';
import { heroStackVariants, heroItemVariants } from '../../../styles/motion';
import {
  HeroSection,
  BackdropScroll,
  BackdropFade,
  GridBase,
  GridWindow,
  GridWindowInner,
  GlowSweep,
  Glow,
  HeroContent,
  HeroStack,
  Mask,
  Rise,
  FadeBlock,
  TITLE_MASK_MARGIN,
  TitleWrap,
  Title,
  Tagline,
  Actions,
  SocialLinks,
  ProofList,
  ProofItem,
  ProofLink,
} from './Hero.styles';

const socialLinks = [
  { href: 'https://github.com/fedelopez89', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/federicoglopez/', label: 'LinkedIn' },
];

const Hero: FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  // Fading the hero text while it is still being read fails contrast and
  // reflow needs on short or zoomed viewports (WCAG 1.4.3 / 1.4.10), so the
  // content only scroll-fades when there is room; the backdrop always may.
  // Enters at 740px and leaves below 700px so it cannot flicker at the edge.
  const isTall = useMediaQueryHysteresis(
    '(min-height: 740px)',
    '(max-height: 699px)'
  );

  usePointerGlow(heroRef, { varsRef: backdropRef });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  // Content stays fully visible until the user has clearly scrolled past it.
  const contentY = useTransform(scrollYProgress, [0.35, 0.9], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.9], [1, 0]);
  const backdropOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

  const contentStyle =
    shouldReduceMotion || !isTall
      ? undefined
      : { y: contentY, opacity: contentOpacity };
  const backdropStyle = shouldReduceMotion
    ? undefined
    : { opacity: backdropOpacity };

  return (
    <HeroSection ref={heroRef}>
      <BackdropScroll
        ref={backdropRef}
        aria-hidden="true"
        data-testid="hero-backdrop"
        style={backdropStyle}
      >
        <GridBase />
        <BackdropFade
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <GlowSweep>
            <Glow />
            <GridWindow>
              <GridWindowInner />
            </GridWindow>
          </GlowSweep>
        </BackdropFade>
      </BackdropScroll>

      <HeroContent style={contentStyle}>
        <Container>
          {/* The eyebrow, h1 and tagline are the LCP candidates, so they are
              deliberately not faded:
              it must be painted and visible on the first frame (Chrome ignores
              opacity: 0 and clipped elements for LCP). Their reveal is a
              small settle (CSS, transform only), plus a compositor-only sheen
              over the name. Everything around it rises in with a short stagger. */}
          <HeroStack
            variants={heroStackVariants}
            initial="hidden"
            animate="visible"
          >
            <Mask>
              <Rise>
                <Eyebrow rule>{t('header.role')}</Eyebrow>
              </Rise>
            </Mask>

            <Mask $mt={TITLE_MASK_MARGIN.top} $mb={TITLE_MASK_MARGIN.bottom}>
              <TitleWrap>
                <Title>{t('header.name')}</Title>
              </TitleWrap>
            </Mask>

            <Mask $mt="2rem">
              <Tagline>{t('header.tagline')}</Tagline>
            </Mask>

            <FadeBlock $mt="2.5rem" variants={heroItemVariants}>
              <Actions>
                <Button href="#projects">{t('header.ctaWork')}</Button>
                <Button
                  href={RESUME_HREF}
                  download={RESUME_FILENAME}
                  variant="secondary"
                >
                  {t('header.ctaResume')}
                </Button>
              </Actions>
            </FadeBlock>

            <FadeBlock $mt="1.5rem" variants={heroItemVariants}>
              <SocialLinks>
                <li>
                  <TextLink href="#contact">{t('header.ctaContact')}</TextLink>
                </li>
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <TextLink
                      href={link.href}
                      arrow
                      external
                      externalLabel={t('header.newTab')}
                    >
                      {link.label}
                    </TextLink>
                  </li>
                ))}
              </SocialLinks>
            </FadeBlock>

            <FadeBlock $mt="2.5rem" variants={heroItemVariants}>
              <ProofList aria-label={t('header.proof.label')}>
                <ProofItem>{t('header.proof.years')}</ProofItem>
                <ProofItem>{t('header.proof.react')}</ProofItem>
                <ProofItem>
                  <ProofLink
                    href={NYT_HREF}
                    external
                    externalLabel={t('header.newTab')}
                  >
                    {t('header.proof.featured')}
                  </ProofLink>
                </ProofItem>
              </ProofList>
            </FadeBlock>
          </HeroStack>
        </Container>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
