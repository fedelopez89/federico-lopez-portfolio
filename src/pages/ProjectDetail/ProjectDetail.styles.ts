import styled from 'styled-components';
import { Link } from 'react-router-dom';

// ─── Top navigation bar ───────────────────────────────────────────────────────

export const TopBar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.fixed};
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  background: ${({ theme }) => theme.colors.background}cc;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}80;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 2.5rem;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.375rem 0;
  transition: color 0.2s ease;
  letter-spacing: 0.01em;

  svg {
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    svg {
      transform: translateX(-3px);
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 4px;
    border-radius: 3px;
  }
`;

export const CategoryPill = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
`;

// ─── Hero ─────────────────────────────────────────────────────────────────────

export const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 62vh;
  min-height: 340px;
  max-height: 600px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

export const HeroImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
`;

export const HeroPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary}30 0%,
    ${({ theme }) => theme.colors.secondary}20 100%
  );
`;

export const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.82) 0%,
    rgba(0, 0, 0, 0.35) 45%,
    rgba(0, 0, 0, 0.05) 100%
  );
`;

export const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 1.5rem 2.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2.5rem 2.5rem 3rem;
    max-width: 900px;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding: 2.5rem 4rem 3rem;
  }
`;

export const FeaturedBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 0.875rem;
  backdrop-filter: blur(8px);
`;

export const ProjectTitle = styled.h1`
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.15;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.3);
  max-width: 720px;
`;

// ─── Content ──────────────────────────────────────────────────────────────────

export const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
`;

export const ContentArea = styled.main`
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.5rem 5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4rem 2rem 6rem;
  }
`;

export const Description = styled.p`
  font-size: 1.0625rem;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 2.5rem;
`;

// ─── NYT Callout ──────────────────────────────────────────────────────────────

export const NytCallout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-left: 3px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary}08;
  border-radius: 0 8px 8px 0;
  margin-bottom: 2.5rem;
`;

export const NytCalloutIcon = styled.div`
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const NytCalloutText = styled.div`
  p {
    font-size: 0.9375rem;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
  }
  span {
    font-size: 0.8125rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

// ─── Divider ──────────────────────────────────────────────────────────────────

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 2.5rem 0;
`;

// ─── Tech section ─────────────────────────────────────────────────────────────

export const TechSection = styled.section`
  margin-bottom: 2.5rem;
`;

export const TechSectionLabel = styled.h2`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textTertiary};
  margin-bottom: 1rem;
`;

export const TechGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const TechBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.875rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface};
  transition: border-color 0.15s ease, color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// ─── CTA ──────────────────────────────────────────────────────────────────────

export const CTASection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.875rem;
  padding-top: 2.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const baseLinkStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: all 0.2s ease;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
  }
`;

export const PrimaryLink = styled.a`
  ${baseLinkStyles}
  background: ${({ theme }) => theme.colors.primary};
  color: white;

  svg { transition: transform 0.2s ease; }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    color: white;
    svg { transform: translate(2px, -2px); }
  }
`;

export const SecondaryLink = styled.a`
  ${baseLinkStyles}
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: 1.5px solid ${({ theme }) => theme.colors.border};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

// ─── Not found ────────────────────────────────────────────────────────────────

export const NotFoundWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
  padding: 2rem;
  text-align: center;
`;

export const NotFoundTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const NotFoundText = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
`;

export const NotFoundBackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9375rem;

  &:hover { text-decoration: underline; }
`;
