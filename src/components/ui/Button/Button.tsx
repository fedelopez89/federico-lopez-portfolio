import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react';
import styled, { css } from 'styled-components';
import { alpha, focusRing } from '../../../styles/mixins';
import { VisuallyHidden } from '../VisuallyHidden';
import { mergeRel } from '../mergeRel';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'sm';

interface StyleProps {
  $variant: ButtonVariant;
  $size: ButtonSize;
}

const variants = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.onPrimary};

    &:hover {
      color: ${({ theme }) => theme.colors.onPrimary};
      box-shadow: 0 8px 24px ${({ theme }) => alpha(theme.colors.primary, 35)};
    }
  `,
  secondary: css`
    background: transparent;
    border-color: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      color: ${({ theme }) => theme.colors.text};
      border-color: ${({ theme }) => theme.colors.textSecondary};
    }
  `,
  ghost: css`
    background: transparent;
    border-color: transparent;
    color: ${({ theme }) => theme.colors.text};

    &:hover {
      color: ${({ theme }) => theme.colors.text};
      background: ${({ theme }) => alpha(theme.colors.text, 8)};
    }
  `,
};

const buttonStyles = css<StyleProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: ${({ $size }) => ($size === 'sm' ? '40px' : '48px')};
  padding: 0 ${({ $size }) => ($size === 'sm' ? '1rem' : '1.5rem')};
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  line-height: inherit;
  text-decoration: none;
  cursor: pointer;
  transition:
    transform ${({ theme }) => theme.transitions.fast},
    background-color ${({ theme }) => theme.transitions.fast},
    border-color ${({ theme }) => theme.transitions.fast},
    box-shadow ${({ theme }) => theme.transitions.fast};

  ${({ $variant }) => variants[$variant]}

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  ${focusRing}

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    pointer-events: none;
  }
`;

const StyledAnchor = styled.a<StyleProps>`
  ${buttonStyles}
`;

const StyledButton = styled.button<StyleProps>`
  ${buttonStyles}
`;

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Trailing icon; decorative, hidden from assistive technology. */
  icon?: ReactNode;
  children?: ReactNode;
}

type AnchorButtonProps = BaseProps & { href: string } & Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    'href'
  > &
  (
    | {
        /** Opens in a new tab with a safe rel. */
        external: true;
        /** Translated screen-reader suffix, e.g. "(opens in a new tab)". */
        externalLabel: string;
      }
    | { external?: false; externalLabel?: undefined }
  );

type NativeButtonProps = BaseProps & {
  href?: undefined;
  external?: never;
  externalLabel?: never;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

const NBSP = '\u00A0';

export const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', external, externalLabel, icon, children, ...rest },
    ref
  ) => {
    const content = (
      <>
        {children}
        {icon && <span aria-hidden="true">{icon}</span>}
        {external && (
          <VisuallyHidden>
            {NBSP}
            {externalLabel}
          </VisuallyHidden>
        )}
      </>
    );
    const styleProps = { $variant: variant, $size: size };

    if ('href' in rest && rest.href !== undefined) {
      const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
      return (
        <StyledAnchor
          {...anchorProps}
          {...styleProps}
          {...(external && {
            target: '_blank',
            rel: mergeRel(anchorProps.rel),
          })}
          ref={ref as Ref<HTMLAnchorElement>}
        >
          {content}
        </StyledAnchor>
      );
    }

    const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
    return (
      <StyledButton
        type="button"
        {...buttonProps}
        {...styleProps}
        ref={ref as Ref<HTMLButtonElement>}
      >
        {content}
      </StyledButton>
    );
  }
);
Button.displayName = 'Button';
