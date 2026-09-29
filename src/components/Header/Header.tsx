import {
  FC,
  ReactNode,
  Ref,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, useIsPresent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavbarScroll, useScrollSpy } from '@/hooks';
import { LanguageToggle } from '@/components/LanguageToggle';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Eyebrow, VisuallyHidden } from '@/components/ui';
import { sectionTitleId } from '@/components/Sections/shared/sectionTitleId';
import { fadeVariants, overlayTransition } from '@/styles/motion';
import Hero from './Hero';
import {
  HeaderContainer,
  Navbar,
  NavContainer,
  Logo,
  NavActions,
  NavMenu,
  NavLink,
  MobileMenuButton,
  MobileLayer,
  MobileMenuOverlay,
  MobileMenu,
  MobileMenuHeader,
  MobileMenuTitle,
  MobileMenuName,
  MobileCloseButton,
  MobileNavLinks,
  MobileNavIndex,
  MobileNavLink,
  MobileMenuFooter,
} from './Header.styles';

const navItems = [
  { href: '#aboutme', labelKey: 'header.about', id: 'aboutme' },
  { href: '#projects', labelKey: 'header.projects', id: 'projects' },
  { href: '#experience', labelKey: 'header.experience', id: 'experience' },
  { href: '#contact', labelKey: 'header.contact', id: 'contact' },
];

const SECTION_IDS = ['home', ...navItems.map((item) => item.id)];
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex="0"]';
const DRAWER_TITLE_ID = 'mobile-menu-title';
const MOBILE_QUERY = '(max-width: 768px)';

/** Keeps the layer out of reach (focus, taps, AT) while its exit animation plays. */
const DrawerLayer: FC<{
  layerRef: Ref<HTMLDivElement>;
  children: ReactNode;
}> = ({ layerRef, children }) => {
  const isPresent = useIsPresent();
  return (
    <MobileLayer
      ref={layerRef}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      style={isPresent ? undefined : { pointerEvents: 'none' }}
    >
      {children}
    </MobileLayer>
  );
};

/**
 * Where focus goes when the drawer closes: the hamburger (default), nothing
 * (viewport grew, hamburger hidden), or the section a link pointed at.
 */
type FocusAfterClose =
  | { to: 'hamburger' }
  | { to: 'none' }
  | { to: 'section'; id: string };

const Header: FC = () => {
  const { t } = useTranslation();
  const { isScrolled } = useNavbarScroll(100);
  const activeSection = useScrollSpy({ sectionIds: SECTION_IDS });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const focusAfterClose = useRef<FocusAfterClose>({ to: 'hamburger' });

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);
  const handleLinkClick = (id: string) => {
    focusAfterClose.current = { to: 'section', id };
    closeMenu();
  };

  // While the drawer is open: lock page scroll, make everything outside it
  // inert (no focus, no clicks, hidden from assistive tech), close on Escape
  // or when the viewport grows past the mobile breakpoint, and hand focus
  // back to the hamburger on the way out.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const hamburger = hamburgerRef.current;
    const rootStyle = document.documentElement.style;
    const previousOverflow = rootStyle.getPropertyValue('overflow');
    rootStyle.setProperty('overflow', 'hidden');

    const inerted = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        el.tagName !== 'SCRIPT' &&
        !el.contains(layerRef.current) &&
        !el.hasAttribute('inert')
    );
    inerted.forEach((el) => el.setAttribute('inert', ''));

    mobileMenuRef.current
      ?.querySelector<HTMLElement>(FOCUSABLE)
      ?.focus({ preventScroll: true });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKeyDown);

    const media = window.matchMedia?.(MOBILE_QUERY);
    const handleViewport = (e: MediaQueryListEvent) => {
      if (e.matches) return;
      focusAfterClose.current = { to: 'none' };
      closeMenu();
    };
    media?.addEventListener('change', handleViewport);

    return () => {
      rootStyle.setProperty('overflow', previousOverflow);
      inerted.forEach((el) => el.removeAttribute('inert'));
      document.removeEventListener('keydown', handleKeyDown);
      media?.removeEventListener('change', handleViewport);
      // Inert is lifted first so focus can move back into the page.
      const target = focusAfterClose.current;
      focusAfterClose.current = { to: 'hamburger' };
      if (target.to === 'hamburger') {
        hamburger?.focus();
      } else if (target.to === 'section') {
        // The fragment navigation scrolls; we only move focus to the heading.
        const heading = document.getElementById(sectionTitleId(target.id));
        if (heading) {
          heading.setAttribute('tabindex', '-1');
          heading.style.outline = 'none';
          heading.focus({ preventScroll: true });
        }
      }
    };
  }, [isMobileMenuOpen, closeMenu]);

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const focusables =
      mobileMenuRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
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
    <HeaderContainer id="home">
      <a href="#main-content" className="skip-link">
        {t('a11y.skipToContent')}
      </a>

      <Navbar
        aria-label={t('header.a11y.mainNav')}
        $isScrolled={isScrolled}
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
      >
        <NavContainer>
          <Logo href="#home">
            {t('header.name')}
            <VisuallyHidden>, {t('header.a11y.home')}</VisuallyHidden>
          </Logo>

          <NavActions>
            <NavMenu>
              {navItems.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    aria-current={
                      activeSection === item.id ? 'location' : undefined
                    }
                    $isActive={activeSection === item.id}
                  >
                    {t(item.labelKey)}
                  </NavLink>
                </li>
              ))}
              <li>
                <LanguageToggle />
              </li>
            </NavMenu>

            <ThemeToggle />

            <MobileMenuButton
              ref={hamburgerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={t('header.a11y.toggleMenu')}
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </MobileMenuButton>
          </NavActions>
        </NavContainer>
      </Navbar>

      {/* Mounted only while open so a closed drawer is never focusable. */}
      {createPortal(
        <AnimatePresence>
          {isMobileMenuOpen && (
            <DrawerLayer key="layer" layerRef={layerRef}>
              <MobileMenuOverlay
                aria-hidden="true"
                onClick={closeMenu}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={overlayTransition}
              />
              <MobileMenu
                ref={mobileMenuRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={DRAWER_TITLE_ID}
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={overlayTransition}
                onKeyDown={handleMenuKeyDown}
              >
                <MobileMenuHeader>
                  <MobileMenuTitle>
                    <MobileMenuName id={DRAWER_TITLE_ID}>
                      {t('header.name')}
                    </MobileMenuName>
                    <Eyebrow as="span">{t('header.role')}</Eyebrow>
                  </MobileMenuTitle>
                  <MobileCloseButton
                    type="button"
                    onClick={closeMenu}
                    aria-label={t('header.a11y.closeMenu')}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </svg>
                  </MobileCloseButton>
                </MobileMenuHeader>

                <MobileNavLinks aria-label={t('header.a11y.mobileNav')}>
                  {navItems.map((item, index) => (
                    <MobileNavLink
                      key={item.href}
                      href={item.href}
                      onClick={() => handleLinkClick(item.id)}
                      aria-current={
                        activeSection === item.id ? 'location' : undefined
                      }
                      $isActive={activeSection === item.id}
                    >
                      <MobileNavIndex aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </MobileNavIndex>
                      {t(item.labelKey)}
                    </MobileNavLink>
                  ))}
                </MobileNavLinks>

                <MobileMenuFooter>
                  <LanguageToggle />
                </MobileMenuFooter>
              </MobileMenu>
            </DrawerLayer>
          )}
        </AnimatePresence>,
        document.body
      )}

      <Hero />
    </HeaderContainer>
  );
};

export default Header;
