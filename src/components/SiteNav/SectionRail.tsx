import { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { useMediaQueryHysteresis } from '@/hooks';
import {
  RAIL_BREAKPOINTS,
  Rail,
  RailList,
  RailLink,
  RailIndex,
  RailLabel,
  RailTick,
} from './SectionRail.styles';

export interface RailItem {
  id: string;
  href: string;
  labelKey: string;
}

interface SectionRailProps {
  items: RailItem[];
  /**
   * Active section id from the page's single scroll spy. Anything outside
   * `items` (the hero, or nothing yet) keeps the rail hidden.
   */
  activeSection: string;
  /** Forces the rail hidden (e.g. while the mobile drawer is open). */
  suppressed?: boolean;
}

/**
 * Desktop-only section index in the right gutter. It appears once the hero is
 * left behind and reuses the navbar's scroll-spy output, so there is no second
 * scroll listener (the spy also owns URL syncing, which must stay single).
 */
const SectionRail: FC<SectionRailProps> = ({
  items,
  activeSection,
  suppressed = false,
}) => {
  const { t } = useTranslation();
  // A focused link keeps the rail up so focus is never dropped by hiding it.
  const [hasFocus, setHasFocus] = useState(false);
  const isWide = useMediaQueryHysteresis(
    `(min-width: ${RAIL_BREAKPOINTS.min}px)`,
    `(max-width: ${RAIL_BREAKPOINTS.min - RAIL_BREAKPOINTS.hysteresis - 1}px)`
  );
  if (!isWide) return null;

  const visible =
    !suppressed &&
    (hasFocus || items.some((item) => item.id === activeSection));

  // Portalled to the end of <body> so Tab goes navbar, content, footer, rail.
  return createPortal(
    <Rail
      aria-label={t('header.a11y.sectionIndex')}
      $visible={visible}
      data-visible={visible}
      data-testid="section-rail"
      // Out of the tab order and the accessibility tree while hidden.
      inert={!visible}
      aria-hidden={!visible || undefined}
      onFocus={() => setHasFocus(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHasFocus(false);
      }}
    >
      <RailList>
        {items.map((item, index) => {
          const isActive = activeSection === item.id;
          return (
            <li key={item.id}>
              <RailLink
                href={item.href}
                $isActive={isActive}
                aria-current={isActive ? 'location' : undefined}
                // The visible "02" is part of the name (WCAG 2.5.3).
                aria-label={`${String(index + 1).padStart(2, '0')}, ${t(item.labelKey)}`}
              >
                <RailLabel>{t(item.labelKey)}</RailLabel>
                <RailIndex aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </RailIndex>
                <RailTick $isActive={isActive} aria-hidden="true" />
              </RailLink>
            </li>
          );
        })}
      </RailList>
    </Rail>,
    document.body
  );
};

export default SectionRail;
