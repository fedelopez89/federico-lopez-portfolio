import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import styled from 'styled-components';
import { focusRing } from '../../../styles/mixins';
import { VisuallyHidden } from '../VisuallyHidden';
import { mergeRel } from '../mergeRel';

const Arrow = styled.span`
  display: inline-block;
  transition: transform ${({ theme }) => theme.transitions.fast};
`;

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.textMuted};
  text-decoration: underline;
  text-decoration-color: transparent;
  text-underline-offset: 0.3em;
  transition:
    color ${({ theme }) => theme.transitions.fast},
    text-decoration-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    text-decoration-color: currentColor;
  }

  &:hover ${Arrow} {
    transform: translate(2px, -2px);
  }

  ${focusRing}

  &:focus-visible {
    border-radius: ${({ theme }) => theme.borderRadius.base};
  }
`;

interface TextLinkBase extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Shows the trailing arrow. */
  arrow?: boolean;
  children?: ReactNode;
}

export type TextLinkProps = TextLinkBase &
  (
    | {
        /** Opens in a new tab with a safe rel. */
        external: true;
        /** Translated screen-reader suffix, e.g. "(opens in a new tab)". */
        externalLabel: string;
      }
    | { external?: false; externalLabel?: undefined }
  );

const NBSP = '\u00A0';

export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ arrow, external, externalLabel, children, ...rest }, ref) => (
    <StyledLink
      {...rest}
      {...(external && { target: '_blank', rel: mergeRel(rest.rel) })}
      ref={ref}
    >
      {children}
      {arrow && <Arrow aria-hidden="true">↗</Arrow>}
      {external && (
        <VisuallyHidden>
          {NBSP}
          {externalLabel}
        </VisuallyHidden>
      )}
    </StyledLink>
  )
);
TextLink.displayName = 'TextLink';
