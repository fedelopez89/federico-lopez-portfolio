import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Container } from './Container';
import { VisuallyHidden } from './VisuallyHidden';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Bone = styled.div<{ $h?: string; $w?: string; $round?: boolean }>`
  height: ${({ $h }) => $h ?? '1rem'};
  width: ${({ $w }) => $w ?? '100%'};
  max-width: 100%;
  flex-shrink: 0;
  border-radius: ${({ theme, $round }) =>
    $round ? theme.borderRadius.full : theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  animation: ${pulse} 1.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const NavSkeleton = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  align-items: center;
  height: ${({ theme }) => theme.layout.navHeight};
`;

const NavRow = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Page = styled.div`
  padding: ${({ theme }) =>
    `calc(${theme.layout.navHeight} + ${theme.spacing.lg}) 0 ${theme.spacing['4xl']}`};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Intro = styled(Column)`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Frame = styled.div`
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  aspect-ratio: 1400 / 740;
  max-width: ${({ theme }) => theme.layout.maxWidth.content};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme }) => theme.colors.surfaceAlt};
  animation: ${pulse} 1.6s ease-in-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

/** Mirrors the project detail layout while its chunk loads. */
export function ProjectDetailSkeleton() {
  const { t } = useTranslation();

  return (
    <>
      {/* Outside the busy region so the status is still announced. */}
      <VisuallyHidden role="status">
        {t('projectDetail.loading')}
      </VisuallyHidden>

      <div aria-busy="true">
        <NavSkeleton aria-hidden="true">
          <NavRow>
            <Bone $h="1.25rem" $w="9rem" />
            <Bone $h="1.5rem" $w="15rem" />
          </NavRow>
        </NavSkeleton>

        <Page aria-hidden="true">
          <Container>
            <Bone $h="1rem" $w="10rem" />
            <Intro>
              <Bone $h="0.875rem" $w="7rem" />
              <Column>
                <Bone $h="3rem" $w="80%" />
                <Bone $h="3rem" $w="45%" />
              </Column>
              <Bone $h="1.25rem" $w="42rem" />
              <Bone $h="1.25rem" $w="36rem" />
              <Row>
                <Bone $h="3rem" $w="9rem" />
                <Bone $h="3rem" $w="7rem" />
              </Row>
            </Intro>
            <Frame />
          </Container>
        </Page>
      </div>
    </>
  );
}
