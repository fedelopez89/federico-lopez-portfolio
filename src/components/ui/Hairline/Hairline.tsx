import styled from 'styled-components';

const TICK_SIZE = '7px';

/** 1px rule with short ticks at both ends. Decorative: render with aria-hidden. */
export const Hairline = styled.div`
  position: relative;
  height: 1px;
  background: ${({ theme }) => theme.colors.border};

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 1px;
    height: ${TICK_SIZE};
    background: ${({ theme }) => theme.colors.border};
  }

  &::before {
    left: 0;
  }

  &::after {
    right: 0;
  }
`;
