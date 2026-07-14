import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled.header`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('./images/portfolio_bkg.webp') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    background-attachment: scroll;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(37, 99, 235, 0.7) 0%,
      rgba(124, 58, 237, 0.7) 100%
    );
  }
`;

interface NavbarProps {
  $isScrolled: boolean;
}

export const Navbar = styled(motion.nav)<NavbarProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  background: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.colors.background : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ $isScrolled, theme }) =>
    $isScrolled ? theme.shadows.md : 'none'};
  transition: background-color, backdrop-filter, box-shadow ${({ theme }) => theme.transitions.base};
`;

export const NavContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }
`;

export const Logo = styled(motion.a)<{ $isScrolled?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, $isScrolled }) =>
    $isScrolled ? theme.colors.text : theme.colors.background};
  text-decoration: none;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme, $isScrolled }) =>
      $isScrolled ? theme.colors.primary : theme.colors.background};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: 3px;
  }
`;

export const NavMenu = styled(motion.ul)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenuButton = styled.button<{ $isScrolled?: boolean }>`
  display: none;
  background: none;
  border: none;
  color: ${({ theme, $isScrolled }) =>
    $isScrolled ? theme.colors.text : theme.colors.background};
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  transition: color ${({ theme }) => theme.transitions.fast};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};

  &:hover {
    color: ${({ theme, $isScrolled }) =>
      $isScrolled ? theme.colors.primary : theme.colors.background};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const MobileMenuOverlay = styled(motion.div)<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: ${({ theme }) => theme.zIndex.modal};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const MobileMenu = styled(motion.div)<{ $isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 80%;
  max-width: 320px;
  background: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  z-index: ${({ theme }) => theme.zIndex.modal + 1};
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
  }
`;

export const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.secondary} 100%
  );
`;

export const MobileMenuTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span:first-child {
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    color: white;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  }

  span:last-child {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: rgba(255, 255, 255, 0.75);
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
    text-transform: uppercase;
  }
`;

export const MobileCloseButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: ${({ theme }) => theme.borderRadius.full};
  color: white;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color ${({ theme }) => theme.transitions.fast};
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

export const MobileNavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  flex: 1;
`;

export const MobileNavLink = styled.a<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-left: 3px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.primary : 'transparent'};
  background: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.primaryLight : 'transparent'};
  transition: color, border-color, background-color, padding-left ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-left-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
    padding-left: calc(${({ theme }) => theme.spacing.xl} + 4px);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: 3px;
  }
`;

export const MobileMenuFooter = styled.div`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.textTertiary};
    text-transform: uppercase;
    letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  }
`;

export const NavItem = styled(motion.li)``;

export const NavLink = styled.a<{ $isScrolled?: boolean; $isActive?: boolean }>`
  color: ${({ theme, $isScrolled }) =>
    $isScrolled ? theme.colors.text : theme.colors.background};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: color ${({ theme }) => theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${({ $isActive }) => ($isActive ? '80%' : '0')};
    height: 2px;
    background: ${({ theme, $isScrolled }) =>
      $isScrolled ? theme.colors.primary : theme.colors.background};
    transition: width ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme, $isScrolled }) =>
      $isScrolled ? theme.colors.primary : theme.colors.background};

    &::after {
      width: 80%;
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: 3px;
  }
`;

export const HeaderIntro = styled(motion.div)`
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']}
    ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled(motion.h1)`
  font-size: ${({ theme }) => theme.typography.fontSize['6xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.background};
  text-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.typography.fontSize['3xl']};
  }
`;

export const Role = styled(motion.p)`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  color: ${({ theme }) => theme.colors.background};
  opacity: 0.9;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
  }
`;

export const SocialLinks = styled(motion.ul)`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xl};
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SocialItem = styled(motion.li)``;

export const SocialLink = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.colors.background};
  transition: background-color, border-color, transform, color ${({ theme }) => theme.transitions.fast};
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-4px);
    color: ${({ theme }) => theme.colors.background};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 3px;
    border-radius: 3px;
  }

  i {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;
