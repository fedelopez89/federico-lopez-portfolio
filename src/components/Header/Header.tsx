import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavbarScroll, useScrollSpy } from '@/hooks';
import { LanguageToggle } from '@/components/LanguageToggle';
import Hero from './Hero';
import {
  HeaderContainer,
  Navbar,
  NavContainer,
  Logo,
  NavMenu,
  NavItem,
  NavLink,
  MobileMenuButton,
  MobileMenuOverlay,
  MobileMenu,
  MobileMenuHeader,
  MobileMenuTitle,
  MobileCloseButton,
  MobileNavLinks,
  MobileNavLink,
  MobileMenuFooter,
} from './Header.styles';

const navItems = [
  { href: '#aboutme', labelKey: 'header.about', id: 'aboutme' },
  { href: '#projects', labelKey: 'header.projects', id: 'projects' },
  { href: '#experience', labelKey: 'header.experience', id: 'experience' },
{ href: '#contact', labelKey: 'header.contact', id: 'contact' },
];

const Header: FC = () => {
  const { t } = useTranslation();
  const { isScrolled } = useNavbarScroll(100);
  const activeSection = useScrollSpy({
    sectionIds: ['home', ...navItems.map((item) => item.id)],
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        hamburgerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>(
      'a, button, [tabindex="0"]'
    );
    firstFocusable?.focus();
  }, [isMobileMenuOpen]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    hamburgerRef.current?.focus();
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables = mobileMenuRef.current?.querySelectorAll<HTMLElement>(
      'a, button, [tabindex="0"]'
    );
    if (!focusables || focusables.length === 0) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
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
            whileTap={{ scale: 0.95 }}
          >
            {t('header.home')}
          </Logo>

          <MobileMenuButton
            ref={hamburgerRef}
            onClick={handleMobileMenuToggle}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
            </svg>
          </MobileMenuButton>

          <NavMenu
            as="ul"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {navItems.map((item, index) => (
              <NavItem
                as="li"
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <NavLink
                  href={item.href}
                  aria-current={activeSection === item.id ? 'true' : undefined}
                  $isActive={activeSection === item.id}
                >
                  {t(item.labelKey)}
                </NavLink>
              </NavItem>
            ))}
            <NavItem
              as="li"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * navItems.length }}
            >
              <LanguageToggle />
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
        ref={mobileMenuRef}
        $isOpen={isMobileMenuOpen}
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onKeyDown={handleMenuKeyDown}
      >
        <MobileMenuHeader>
          <MobileMenuTitle>
            <span>Federico López</span>
            <span>{t('header.role')}</span>
          </MobileMenuTitle>
          <MobileCloseButton
            onClick={handleMobileMenuToggle}
            aria-label="Close mobile menu"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </MobileCloseButton>
        </MobileMenuHeader>

        <MobileNavLinks role="navigation" aria-label="Mobile navigation">
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
        </MobileNavLinks>

        <MobileMenuFooter>
          <span>{t('header.home')}</span>
          <LanguageToggle />
        </MobileMenuFooter>
      </MobileMenu>

      <Hero />
    </HeaderContainer>
  );
};

export default Header;
