import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MotionGlobalConfig } from 'framer-motion';
import { configure } from '@testing-library/react';

// styled-components defaults to text-node injection outside production, which
// makes jsdom re-parse the whole <style> on every new rule (quadratic). Use
// CSSOM insertRule like production does.
(globalThis as { SC_DISABLE_SPEEDY?: boolean }).SC_DISABLE_SPEEDY = false;

window.scrollTo = vi.fn();

// Finish every framer-motion animation instantly so AnimatePresence exits and
// fades don't run on jsdom's real rAF clock (slow and flaky under load).
MotionGlobalConfig.skipAnimations = true;

// waitFor/findBy poll and return as soon as the condition holds; a larger
// ceiling only matters when the machine is busy running many jsdom workers.
configure({ asyncUtilTimeout: 5_000 });
