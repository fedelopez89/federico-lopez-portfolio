import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavbarScroll, useScrollSpy } from '@/hooks';
import { LanguageToggle } from '@/components/LanguageToggle';
import {
  HeaderContainer,
  Navbar,
  NavContainer,
  Logo,
  NavMenu,
  NavItem,
  NavLink,
  HeaderIntro,
  Title,
  Role,
  SocialLinks,
  SocialItem,
  SocialLink,
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenu,
  MobileCloseButton,
  MobileNavLink,
} from './Header.styles';

const navItems = [
  { href: '#aboutme', labelKey: 'header.about', id: 'aboutme' },
  { href: '#projects', labelKey: 'header.projects', id: 'projects' },
  { href: '#experience', labelKey: 'header.experience', id: 'experience' },
  { href: '#languages', labelKey: 'header.languages', id: 'languages' },
  { href: '#education', labelKey: 'header.education', id: 'education' },
];

const socialLinks = [
  {
    href: 'https://github.com/fedelopez89',
    icon: (
      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/federicoglopez/',
    icon: (
      <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    label: 'LinkedIn',
  },
];

const Header: FC = () => {
  const { t } = useTranslation();
  const { isScrolled } = useNavbarScroll(100);
  const activeSection = useScrollSpy({
    sectionIds: ['home', ...navItems.map((item) => item.id)],
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer id="home" as="header" role="banner">
      <Navbar
        as="nav"
        role="navigation"
        aria-label="Main navigation"
        $isScrolled={isScrolled}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <NavContainer>
          <Logo
            href="#home"
            aria-label="Home"
            $isScrolled={isScrolled}
            whileTap={{ scale: 0.95 }}
          >
            {t('header.home')}
          </Logo>

          <MobileMenuButton
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            $isScrolled={isScrolled}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </MobileMenuButton>

          <NavMenu
            as="ul"
            role="menubar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <NavItem
                as="li"
                role="none"
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <NavLink
                  href={item.href}
                  role="menuitem"
                  aria-label={t(item.labelKey)}
                  $isScrolled={isScrolled}
                  $isActive={activeSection === item.id}
                >
                  {t(item.labelKey)}
                </NavLink>
              </NavItem>
            ))}
            <NavItem
              as="li"
              role="none"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * navItems.length }}
            >
              <LanguageToggle isScrolled={isScrolled} />
            </NavItem>
          </NavMenu>
        </NavContainer>
      </Navbar>

      {/* Mobile Menu Overlay */}
      <MobileMenuOverlay
        $isOpen={isMobileMenuOpen}
        onClick={handleMobileLinkClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
      />

      {/* Mobile Menu */}
      <MobileMenu
        $isOpen={isMobileMenuOpen}
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <MobileCloseButton
          onClick={handleMobileMenuToggle}
          aria-label="Close mobile menu"
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </MobileCloseButton>

        {navItems.map((item) => (
          <MobileNavLink
            key={item.href}
            href={item.href}
            onClick={handleMobileLinkClick}
            $isActive={activeSection === item.id}
          >
            {t(item.labelKey)}
          </MobileNavLink>
        ))}

        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <LanguageToggle />
        </div>
      </MobileMenu>

      <HeaderIntro
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Title
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {t('header.name')}
        </Title>
        <Role
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {t('header.role')}
        </Role>
        <SocialLinks
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          {socialLinks.map((link, index) => (
            <SocialItem
              key={link.href}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <SocialLink
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </SocialLink>
            </SocialItem>
          ))}
        </SocialLinks>
      </HeaderIntro>
    </HeaderContainer>
  );
};

export default Header;
