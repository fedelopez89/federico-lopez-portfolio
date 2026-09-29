import {
  FALLBACK_OG_IMAGE,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_ORIGIN,
} from './projectMeta';

/**
 * Head values of the home page. `index.html` must carry exactly these values
 * (enforced by a test), so the pre-hydration head and the head applied at
 * runtime when returning to Home never drift apart. English only; the document
 * title is the one translated field and is set separately.
 */
export const HOME_META = {
  description:
    'Senior Frontend Engineer with 16+ years in IT, specializing in React, TypeScript and Next.js. Work featured in The New York Times. Remote.',
  canonical: `${SITE_ORIGIN}/`,
  socialTitle:
    'Federico López — Senior Frontend Engineer | Featured in The New York Times',
  image: `${SITE_ORIGIN}${FALLBACK_OG_IMAGE}`,
  imageType: 'image/png',
  imageWidth: OG_IMAGE_WIDTH,
  imageHeight: OG_IMAGE_HEIGHT,
  imageAlt: 'Federico López — Senior Frontend Engineer portfolio card',
} as const;
