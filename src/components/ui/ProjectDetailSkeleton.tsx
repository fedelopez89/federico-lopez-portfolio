import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0%   { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const Bone = styled.div<{ $h?: string; $w?: string; $radius?: string }>`
  position: relative;
  overflow: hidden;
  height: ${({ $h }) => $h ?? '1rem'};
  width: ${({ $w }) => $w ?? '100%'};
  border-radius: ${({ $radius }) => $radius ?? '6px'};
  background: ${({ theme }) => theme.colors.surfaceAlt};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent 0%,
      ${({ theme }) => theme.colors.border} 50%,
      transparent 100%
    );
    animation: ${shimmer} 1.6s ease-in-out infinite;
  }
`;

const TopBarSkeleton = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: ${({ theme }) => theme.colors.background}cc;
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border}80;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  z-index: ${({ theme }) => theme.zIndex.fixed};
`;

const HeroSkeleton = styled.div`
  width: 100%;
  height: 62vh;
  min-height: 340px;
  max-height: 600px;
  background: ${({ theme }) => theme.colors.surfaceAlt};
`;

const ContentSkeleton = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 4rem 2rem;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export function ProjectDetailSkeleton() {
  return (
    <>
      <TopBarSkeleton>
        <Bone $h="14px" $w="140px" $radius="4px" />
      </TopBarSkeleton>

      <HeroSkeleton />

      <ContentSkeleton>
        <Bone $h="28px" $w="75%" />
        <Bone $h="16px" $w="100%" />
        <Bone $h="16px" $w="95%" />
        <Bone $h="16px" $w="80%" />
        <Bone $h="1px" $w="100%" $radius="0" style={{ margin: '0.5rem 0' }} />
        <Bone $h="12px" $w="100px" />
        <Row>
          <Bone $h="30px" $w="80px" $radius="999px" />
          <Bone $h="30px" $w="90px" $radius="999px" />
          <Bone $h="30px" $w="70px" $radius="999px" />
        </Row>
        <Bone $h="1px" $w="100%" $radius="0" style={{ margin: '0.5rem 0' }} />
        <Row>
          <Bone $h="44px" $w="140px" $radius="8px" />
          <Bone $h="44px" $w="120px" $radius="8px" />
        </Row>
      </ContentSkeleton>
    </>
  );
}
