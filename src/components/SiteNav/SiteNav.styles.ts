import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { alpha, focusRing } from '../../styles/mixins';
import { SiteLink } from './SiteLink';

export const Navbar = styled(motion.nav)<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  background: ${({ $isScrolled, theme }) =>
    $isScrolled ? alpha(theme.colors.background, 85) : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) => ($isScrolled ? 'blur(8px)' : 'none')};
  border-bottom: 1px solid
    ${({ $isScrolled, theme }) =>
      $isScrolled ? theme.colors.border : 'transparent'};
  transition:
    background-color ${({ theme }) => theme.transitions.base},
    border-color ${({ theme }) => theme.transitions.base};
`;

export const NavContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth.wide};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const Logo = styled(SiteLink)`
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 650;
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  ${focusRing}
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

const monoLabel = css`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
`;

export const NavLink = styled(SiteLink)<{ $isActive?: boolean }>`
  ${monoLabel}
  position: relative;
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.text : theme.colors.textMuted};
  text-decoration: none;
  transition: color ${({ theme }) => theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    right: ${({ theme }) => theme.spacing.md};
    bottom: 6px;
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transform-origin: left;
    transition: transform ${({ theme }) => theme.transitions.base};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  ${focusRing}
`;

export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition:
    border-color ${({ theme }) => theme.transitions.fast},
    color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  ${focusRing}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: inline-flex;
  }
`;

export const MobileLayer = styled.div`
  @media (min-width: ${({ theme }) => `calc(${theme.breakpoints.md} + 1px)`}) {
    display: none;
  }
`;

export const MobileMenuOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay};
  z-index: ${({ theme }) => theme.zIndex.modalBackdrop};
`;

export const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface};
  border-left: 1px solid ${({ theme }) => theme.colors.border};
  z-index: ${({ theme }) => theme.zIndex.modal};
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.lg}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileMenuTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const MobileMenuName = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: 650;
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  color: ${({ theme }) => theme.colors.text};
`;

export const MobileCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
  }

  ${focusRing}
`;

export const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  flex: 1;
`;

export const MobileNavIndex = styled.span`
  ${monoLabel}
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MobileNavLink = styled(SiteLink)<{ $isActive?: boolean }>`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.md};
  min-height: 56px;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-left: 1px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.text : theme.colors.textMuted};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.heading};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  ${focusRing}
`;

export const MobileMenuFooter = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.md}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;
