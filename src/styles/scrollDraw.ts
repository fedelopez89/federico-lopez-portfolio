import { css, keyframes, type RuleSet } from 'styled-components';

/**
 * "Technical drawing" motion: lines draw themselves as they scroll into view.
 * Pure CSS scroll-driven animations (no JS, transform/opacity only). The
 * wrapper is progressive: browsers without `animation-timeline`, users who
 * prefer reduced motion, and forced-colors / more-contrast users all keep the
 * static lines exactly as designed. Keyframes use `both` fill only inside it.
 */
export const drawX = keyframes`
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
`;

export const drawY = keyframes`
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
`;

export const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const popIn = keyframes`
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
`;

export const whenScrollDriven = (rules: RuleSet<object>) => css`
  @media (prefers-reduced-motion: no-preference) and (not (forced-colors: active)) and (not (prefers-contrast: more)) {
    @supports (animation-timeline: view()) {
      ${rules}
    }
  }
`;
