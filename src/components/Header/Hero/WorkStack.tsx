import { FC, RefObject } from 'react';
import type { MotionStyle } from 'framer-motion';
import {
  StackFrame,
  Scene,
  Stack,
  Layer,
  Bar,
  Dot,
  BarLabel,
  Shot,
} from './WorkStack.styles';

const shot = (name: string) =>
  `${import.meta.env.BASE_URL}images/projects/stack/${name}-760.webp`;

/**
 * Front layer first; depth 1 is nearest the viewer. The shots are 760px-wide
 * copies of the project images (cards are at most 360px, so this covers 2x).
 */
const LAYERS = [
  {
    src: shot('gmail-clone'),
    height: 399,
    label: 'real-evals / gmail',
    depth: 1,
  },
  {
    src: shot('nba-finder'),
    height: 404,
    label: 'rcx-sports / nba-finder',
    depth: 0,
  },
  {
    src: shot('factupro'),
    height: 399,
    label: 'factupro / invoicing',
    depth: -1,
  },
] as const;

const SHOT_WIDTH = 760;

interface WorkStackProps {
  stackRef: RefObject<HTMLDivElement | null>;
  style?: MotionStyle;
}

/**
 * Decorative stack of real product screenshots. Purely presentational:
 * hidden from assistive technology, never focusable, and it ignores pointer
 * events so it cannot block the hero glow or text selection.
 */
const WorkStack: FC<WorkStackProps> = ({ stackRef, style }) => (
  <StackFrame aria-hidden="true" data-testid="hero-work-stack" style={style}>
    <Scene>
      <Stack ref={stackRef}>
        {/* Painted back to front. */}
        {[...LAYERS].reverse().map((layer) => (
          <Layer
            key={layer.src}
            $index={LAYERS.indexOf(layer)}
            $depth={layer.depth}
          >
            <Bar>
              <Dot />
              <Dot />
              <Dot />
              <BarLabel>{layer.label}</BarLabel>
            </Bar>
            <Shot
              src={layer.src}
              alt=""
              width={SHOT_WIDTH}
              height={layer.height}
              decoding="async"
              fetchPriority="low"
              draggable={false}
            />
          </Layer>
        ))}
      </Stack>
    </Scene>
  </StackFrame>
);

export default WorkStack;
