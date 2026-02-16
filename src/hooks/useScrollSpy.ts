import { useEffect, useState } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  offset?: number;
}

export const useScrollSpy = ({
  sectionIds,
  offset = 100,
}: UseScrollSpyOptions) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const updateActiveSection = () => {
      // Check if we're at the very top of the page
      if (window.scrollY < 100 && sectionIds.includes('home')) {
        setActiveSection('home');
        const newHash = '';
        if (window.location.hash !== newHash) {
          window.history.replaceState(null, '', window.location.pathname);
        }
        return;
      }

      // Find which section is currently most visible
      let currentSection = '';
      let maxVisibility = 0;

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;

        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(
          0,
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        );
        const sectionHeight = rect.height;
        const visibilityRatio =
          visibleTop / Math.min(sectionHeight, viewportHeight);

        // Prefer sections that have their top near the top of viewport
        const distanceFromTop = Math.abs(rect.top - offset);
        const topBonus = distanceFromTop < 200 ? 0.3 : 0;

        const score = visibilityRatio + topBonus;

        if (score > maxVisibility) {
          maxVisibility = score;
          currentSection = id;
        }
      }

      if (currentSection && currentSection !== activeSection) {
        setActiveSection(currentSection);

        // Update URL - remove hash if home section, otherwise add section hash
        const newHash = currentSection === 'home' ? '' : `#${currentSection}`;
        const currentHash = window.location.hash;

        if (currentHash !== newHash) {
          window.history.replaceState(
            null,
            '',
            newHash || window.location.pathname
          );
        }
      }
    };

    // Run on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateActiveSection);
    };

    // Set initial section
    updateActiveSection();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, activeSection]);

  return activeSection;
};
