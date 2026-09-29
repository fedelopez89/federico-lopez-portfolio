import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollToTop } from '@/hooks';
import { alpha, focusRing } from '../../../styles/mixins';

const StyledButton = styled(motion.a)`
  position: fixed;
  right: ${({ theme }) => theme.spacing.lg};
  bottom: ${({ theme }) => theme.spacing.lg};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => alpha(theme.colors.surface, 90)};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  text-decoration: none;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.textMuted};
  }

  ${focusRing}

  @media (prefers-contrast: more) {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: ${({ theme }) => theme.spacing.md};
    bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const ScrollToTopButton: FC = () => {
  const { t } = useTranslation();
  const { isVisible } = useScrollToTop();
  const label = t('a11y.scrollToTop');

  return (
    <AnimatePresence>
      {isVisible && (
        <StyledButton
          href="#home"
          aria-label={label}
          title={label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            width="20"
            height="20"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </StyledButton>
      )}
    </AnimatePresence>
  );
};
