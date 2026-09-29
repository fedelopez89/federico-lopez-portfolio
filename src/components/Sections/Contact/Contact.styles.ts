import styled, { css, keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Button, Card, TextLink } from '../../ui';
import type { Theme } from '../../../styles/theme';
import { focusRing } from '../../../styles/mixins';

const SPINNER_SIZE = '0.875rem';
const ICON_SIZE = '1.125rem';
const CHECK_CIRCLE = '3rem';
const SCROLL_MARGIN = ({ theme }: { theme: Theme }) =>
  `calc(${theme.layout.navHeight} + ${theme.spacing.md})`;

export const Layout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: ${({ theme }) => theme.spacing['3xl']};
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: minmax(0, 1fr);
    gap: ${({ theme }) => theme.spacing['2xl']};
  }
`;

/* Intro column */

export const Intro = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const IntroHeading = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  font-weight: 650;
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  color: ${({ theme }) => theme.colors.text};
`;

export const IntroTagline = styled.p`
  margin: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth.prose};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const ContactList = styled.ul`
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const ContactRow = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  overflow-wrap: break-word;
`;

export const RowLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const RowValue = styled.span`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

/** Email stays on one line beside its copy button; smaller type on phones. */
export const EmailLink = styled(TextLink)`
  flex-shrink: 0;
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  }
`;

export const CopyButton = styled(Button)`
  flex-shrink: 0;
`;

/* Form column */

export const FormColumn = styled(motion.div)`
  min-width: 0;
`;

export const FormPanel = styled(Card)`
  padding: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg}
      ${({ theme }) => theme.spacing.md};
  }
`;

export const FormTitle = styled.h4`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.text};
`;

/** Single source of truth for text input and textarea styling. */
const fieldBase = css`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm + ' ' + theme.spacing.md};
  font-family: inherit;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  scroll-margin-top: ${SCROLL_MARGIN};
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &::placeholder {
    color: ${({ theme }) => theme.colors.textTertiary};
    opacity: 1;
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }

  /* Read-only while sending: stays fully legible, unlike disabled. */
  &[readonly] {
    background: ${({ theme }) => theme.colors.surfaceAlt};
    cursor: progress;
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.error};
  }
`;

export const Input = styled.input`
  ${fieldBase}
  min-height: 48px;
`;

export const Textarea = styled.textarea`
  ${fieldBase}
  min-height: 9rem;
  resize: vertical;
`;

export const FieldMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const CharCount = styled.span<{ $warn: boolean; $over: boolean }>`
  margin-left: auto;
  color: ${({ theme, $warn, $over }) =>
    $over
      ? theme.colors.errorText
      : $warn
        ? theme.colors.text
        : theme.colors.textMuted};
`;

/* Messages */

const message = css`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.errorText};

  svg {
    flex-shrink: 0;
    width: ${ICON_SIZE};
    height: ${ICON_SIZE};
    margin-top: 0.1em;
    color: ${({ theme }) => theme.colors.error};
  }
`;

export const FieldError = styled(motion.p)`
  ${message}
`;

export const StatusMessage = styled(motion.p)`
  ${message}
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const ErrorSummary = styled(motion.div)`
  scroll-margin-top: ${SCROLL_MARGIN};
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const SummaryTitle = styled.p`
  ${message}
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const SummaryList = styled.ul`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  padding: 0 0 0 ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const SummaryLink = styled.a`
  color: ${({ theme }) => theme.colors.errorText};
  text-underline-offset: 0.25em;
  ${focusRing}
`;

/* Submit */

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const Spinner = styled.span`
  display: inline-block;
  width: ${SPINNER_SIZE};
  height: ${SPINNER_SIZE};
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  animation: ${spin} 0.8s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SubmitButton = styled(Button)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

/* Success */

export const SuccessPanel = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const SuccessIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${CHECK_CIRCLE};
  height: ${CHECK_CIRCLE};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: ${({ theme }) => theme.colors.primaryText};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const SuccessTitle = styled.h4`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  color: ${({ theme }) => theme.colors.text};

  &:focus {
    outline: none;
  }
`;

export const SuccessText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  color: ${({ theme }) => theme.colors.textMuted};
`;
