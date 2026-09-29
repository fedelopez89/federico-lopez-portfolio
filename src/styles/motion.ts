import type { Variants } from 'framer-motion';
import { lightTheme } from './theme';

// Non-color constants only: these are identical in light and dark themes.
const { ease, duration, stagger } = lightTheme.motion;

export const EASE = ease;

export const stackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: 0.1 } },
};

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.slow, ease: EASE },
  },
};

/** Single quiet opacity fade, no movement. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: EASE } },
};

/** Tween used by overlays and drawers that enter and leave the tree. */
export const overlayTransition = { duration: 0.38, ease: EASE };

/**
 * Spread on a motion element to animate it once when scrolled into view.
 * The margin is 0 so nothing can sit inside the viewport while still hidden.
 * Elements containing focusable children should also spread the props from
 * useRevealOnFocus so keyboard focus always reveals them.
 */
export const inViewProps = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, margin: '0px' },
} as const;

/**
 * Hero entrance: a snappy, choreographed rise for everything around the h1
 * (which is not animated, see Hero). 5 items settle in about 580ms.
 */
export const heroStackVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: EASE },
  },
};
