import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../../context';
import { focusRing } from '../../styles/mixins';

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  padding: 0;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.border};
  }

  ${focusRing}

  svg {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

const iconMotion = {
  initial: { opacity: 0, rotate: -60 },
  animate: { opacity: 1, rotate: 0 },
  exit: { opacity: 0, rotate: 60 },
  transition: { duration: 0.2 },
};

export const ThemeToggle: FC = () => {
  const { t } = useTranslation();
  const { mode, toggleTheme } = useTheme();
  const label = t(
    mode === 'light' ? 'theme.switchToDark' : 'theme.switchToLight'
  );

  return (
    <ToggleButton
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={mode} style={{ display: 'flex' }} {...iconMotion}>
          {mode === 'light' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </ToggleButton>
  );
};
