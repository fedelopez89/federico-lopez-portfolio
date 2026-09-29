import type { Variants } from 'framer-motion';
import { lightTheme } from './theme';

// Non-color constants only: these are identical in light and dark themes.
const { ease, duration, stagger } = lightTheme.motion;

export const EASE = ease;

export const stackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
};

/** Rises out of a clipping mask (parent needs overflow: hidden). */
export const riseVariants: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: duration.slow, ease: EASE } },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: duration.slow, ease: EASE } },
};

/** Spread on a motion element to animate it once when scrolled into view. */
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '-80px' },
} as const;
