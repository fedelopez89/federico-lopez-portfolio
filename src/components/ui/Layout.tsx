import styled from 'styled-components';

interface GridProps {
  columns?: number;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  responsive?: boolean;
}

const gridGap = {
  sm: 'md',
  md: 'lg',
  lg: 'xl',
  xl: '2xl',
};

export const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: ${({ columns = 1 }) => `repeat(${columns}, 1fr)`};
  gap: ${({ theme, gap = 'md' }) =>
    theme.spacing[gridGap[gap] as keyof typeof theme.spacing]};

  ${({ responsive, columns = 1, theme }) =>
    responsive &&
    `
    @media (max-width: ${theme.breakpoints.lg}) {
      grid-template-columns: repeat(${Math.min(columns, 3)}, 1fr);
    }

    @media (max-width: ${theme.breakpoints.md}) {
      grid-template-columns: repeat(${Math.min(columns, 2)}, 1fr);
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      grid-template-columns: 1fr;
    }
  `}
`;

interface FlexProps {
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'between'
    | 'around'
    | 'evenly'
    | 'stretch';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  wrap?: boolean;
}

const alignItems = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyContent = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
};

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  align-items: ${({ align = 'start' }) => alignItems[align]};
  justify-content: ${({ justify = 'start' }) => justifyContent[justify]};
  gap: ${({ theme, gap = 'md' }) => theme.spacing[gap]};
  flex-wrap: ${({ wrap }) => (wrap ? 'wrap' : 'nowrap')};
`;
