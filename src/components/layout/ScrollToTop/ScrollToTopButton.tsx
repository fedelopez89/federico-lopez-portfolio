import { FC } from 'react';
import styled from 'styled-components';
import { useScrollToTop } from '@/hooks';

const StyledButton = styled.a`
  display: block;
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  left: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndex.fixed};
  border: none;
  outline: none;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  cursor: pointer;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  transition: all ${({ theme }) => theme.transitions.fast};
  text-decoration: none;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover};
    transform: scale(1.05);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    bottom: ${({ theme }) => theme.spacing.lg};
    left: ${({ theme }) => theme.spacing.lg};
    width: 48px;
    height: 48px;
  }
`;

export const ScrollToTopButton: FC = () => {
  const { isVisible } = useScrollToTop();

  if (!isVisible) return null;

  return (
    <StyledButton href="#home" aria-label="Scroll to top" title="Scroll to top">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </StyledButton>
  );
};
