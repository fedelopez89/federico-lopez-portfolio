import { useState, useEffect } from 'react';

interface UseNavbarScrollReturn {
  isScrolled: boolean;
}

export const useNavbarScroll = (threshold = 100): UseNavbarScrollReturn => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { isScrolled };
};
