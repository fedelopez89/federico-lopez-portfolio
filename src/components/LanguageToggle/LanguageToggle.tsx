import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import { focusRing } from '../../styles/mixins';

const LanguageToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
`;

const LanguageButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  min-width: 36px;
  min-height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.sm};
  background: transparent;
  border: none;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.text : theme.colors.textMuted};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  letter-spacing: ${({ theme }) => theme.typography.tracking.eyebrow};
  text-transform: uppercase;
  transition: color ${({ theme }) => theme.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    bottom: 6px;
    left: ${({ theme }) => theme.spacing.sm};
    right: ${({ theme }) => theme.spacing.sm};
    height: 1px;
    background: ${({ theme }) => theme.colors.primary};
    transform: scaleX(${({ $isActive }) => ($isActive ? 1 : 0)});
    transition: transform ${({ theme }) => theme.transitions.fast};
  }

  /* Backgrounds are replaced in forced colors: mark the active language with
     a real underline instead. */
  @media (forced-colors: active) {
    &::after {
      display: none;
    }

    ${({ $isActive }) =>
      $isActive &&
      css`
        text-decoration: underline;
        text-decoration-thickness: 2px;
        text-underline-offset: 0.4em;
      `}
  }

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  ${focusRing}
`;

const Separator = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.textMuted};
  opacity: 0.5;
`;

const LanguageToggle = () => {
  const { t, i18n } = useTranslation();

  // Normalize regional variants such as "en-US" to their base language.
  const current = (i18n.resolvedLanguage ?? i18n.language ?? '').split('-')[0];

  const changeLanguage = (lang: string) => {
    if (current !== lang) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  };

  return (
    <LanguageToggleWrapper role="group" aria-label={t('language.label')}>
      {/* Names stay in their own language (with lang) and contain the visible
          "EN"/"ES" text, per WCAG 2.5.3. */}
      <LanguageButton
        $isActive={current === 'en'}
        lang="en"
        onClick={() => changeLanguage('en')}
        aria-label="English"
        aria-pressed={current === 'en'}
      >
        EN
      </LanguageButton>
      <Separator aria-hidden="true">/</Separator>
      <LanguageButton
        $isActive={current === 'es'}
        lang="es"
        onClick={() => changeLanguage('es')}
        aria-label="Español"
        aria-pressed={current === 'es'}
      >
        ES
      </LanguageButton>
    </LanguageToggleWrapper>
  );
};

export default LanguageToggle;
