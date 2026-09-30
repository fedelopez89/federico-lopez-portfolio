import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useReducedMotion } from 'framer-motion';
import { useMediaQuery } from '@/hooks';
import { Cue, CueLine, CueSegment, CUE_HIDDEN_QUERY } from './ScrollCue.styles';

/** The idle travel waits this long after load before it starts. */
const IDLE_DELAY_MS = 2500;
/** The page counts as "at the top" below this scroll offset (px). */
const TOP_THRESHOLD_PX = 40;

interface ScrollCueProps {
  /** True once the user has scrolled past the hero's opening stretch. */
  hidden: boolean;
}

/**
 * Bottom-of-hero cue pointing to the first section. A primary segment travels
 * down the line a few times, but only after a quiet moment with the page still
 * at the top, and never under reduced motion (the line stays static).
 */
const ScrollCue: FC<ScrollCueProps> = ({ hidden }) => {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  // Not displayed on phones and short windows: no timer, no animation there.
  const isHiddenViewport = useMediaQuery(CUE_HIDDEN_QUERY);

  // Start after the idle delay, and only if the page is still at the top.
  useEffect(() => {
    if (shouldReduceMotion || isHiddenViewport) return;
    const timer = window.setTimeout(() => {
      if (window.scrollY < TOP_THRESHOLD_PX) setPlaying(true);
    }, IDLE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [shouldReduceMotion, isHiddenViewport]);

  // Scroll is watched only while the travel runs, so the cue costs nothing
  // before or after it. Leaving the top stops it.
  useEffect(() => {
    if (!playing) return;
    const onScroll = () => {
      if (window.scrollY >= TOP_THRESHOLD_PX) setPlaying(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [playing]);

  return (
    <Cue
      href="#aboutme"
      aria-label={t('header.scrollCue.aria')}
      $hidden={hidden}
      data-testid="hero-scroll-cue"
    >
      {t('header.scrollCue.label')}
      <CueLine aria-hidden="true">
        <CueSegment
          data-testid="hero-scroll-cue-segment"
          data-playing={playing ? 'true' : undefined}
          onAnimationEnd={() => setPlaying(false)}
        />
      </CueLine>
    </Cue>
  );
};

export default ScrollCue;
