import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

interface LanguageToggleProps {
  isScrolled?: boolean;
}

const LanguageToggleWrapper = styled.div<{ $isScrolled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.1rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius.base};
  color: ${({ theme, $isScrolled }) =>
    $isScrolled ? theme.colors.text : theme.colors.background};
  transition: color ${({ theme }) => theme.transitions.fast};
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  background: transparent;
  border: none;
  color: inherit;
  padding: 0;
  margin: 0;
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  transition: all ${({ theme }) => theme.transitions.fast};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: currentColor;
    transform: scaleX(${({ $isActive }) => ($isActive ? '1' : '0')});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  &:hover::after {
    transform: scaleX(1);
  }
`;

const Separator = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.light};
  opacity: 0.5;
`;

const LanguageToggle = ({ isScrolled = false }: LanguageToggleProps) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  };

  return (
    <LanguageToggleWrapper $isScrolled={isScrolled}>
      <LanguageButton
        $isActive={i18n.language === 'en'}
        onClick={() => changeLanguage('en')}
        aria-label="Switch to English"
        aria-pressed={i18n.language === 'en'}
      >
        EN
      </LanguageButton>
      <Separator>/</Separator>
      <LanguageButton
        $isActive={i18n.language === 'es'}
        onClick={() => changeLanguage('es')}
        aria-label="Cambiar a Español"
        aria-pressed={i18n.language === 'es'}
      >
        ES
      </LanguageButton>
    </LanguageToggleWrapper>
  );
};

export default LanguageToggle;
