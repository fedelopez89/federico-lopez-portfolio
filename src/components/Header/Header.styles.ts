import styled from 'styled-components';
import { motion } from 'framer-motion';

export const HeaderContainer = styled.header`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: url('./images/portfolio_bkg.png') no-repeat center center;
  background-size: cover;
  background-attachment: fixed;

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
  transition: all ${({ theme }) => theme.transitions.base};
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

export const Logo = styled(motion.a)`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};

  &:hover {
    color: ${({ theme }) => theme.colors.background};
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

export const NavItem = styled(motion.li)``;

export const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: ${({ theme }) => theme.colors.background};
    transition: width ${({ theme }) => theme.transitions.fast};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.background};

    &::after {
      width: 80%;
    }
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
  transition: all ${({ theme }) => theme.transitions.fast};
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-4px);
    color: ${({ theme }) => theme.colors.background};
  }

  i {
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  }
`;
