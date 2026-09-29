import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import type { Metric } from 'web-vitals';

vi.mock('web-vitals', () => ({
  onCLS: vi.fn(),
  onINP: vi.fn(),
  onFCP: vi.fn(),
  onLCP: vi.fn(),
  onTTFB: vi.fn(),
}));

import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { initWebVitals } from './reportWebVitals';

const fakeMetric = (overrides: Partial<Metric> = {}): Metric =>
  ({
    name: 'LCP',
    value: 2500,
    id: 'v3-test',
    delta: 2500,
    rating: 'good',
    entries: [],
    navigationType: 'navigate',
    ...overrides,
  }) as Metric;

// Registration is deferred to idle time after load; run idle work immediately.
Object.defineProperty(window, 'requestIdleCallback', {
  configurable: true,
  value: (cb: () => void) => {
    cb();
    return 0;
  },
});

const init = async () => {
  initWebVitals();
  await vi.waitFor(() => expect(onTTFB).toHaveBeenCalled());
};

describe('initWebVitals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete window.gtag;
  });

  it('registers a callback with each of the five web-vitals observers', async () => {
    await init();
    expect(onCLS).toHaveBeenCalledOnce();
    expect(onINP).toHaveBeenCalledOnce();
    expect(onFCP).toHaveBeenCalledOnce();
    expect(onLCP).toHaveBeenCalledOnce();
    expect(onTTFB).toHaveBeenCalledOnce();
  });

  it('passes a function as the callback to each observer', async () => {
    await init();
    for (const fn of [onCLS, onINP, onFCP, onLCP, onTTFB]) {
      expect((fn as Mock).mock.calls[0][0]).toBeTypeOf('function');
    }
  });
});

describe('reportMetric callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls window.gtag with the correct event payload when gtag is defined', async () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    await init();
    const callback = (onLCP as Mock).mock.calls[0][0] as (m: Metric) => void;
    callback(fakeMetric({ name: 'LCP', value: 2500, id: 'v3-1', delta: 2500 }));

    expect(gtag).toHaveBeenCalledWith('event', 'LCP', {
      value: 2500,
      metric_id: 'v3-1',
      metric_value: 2500,
      metric_delta: 2500,
      non_interaction: true,
    });

    delete window.gtag;
  });

  it('rounds CLS value multiplied by 1000 when reporting to gtag', async () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    await init();
    const callback = (onCLS as Mock).mock.calls[0][0] as (m: Metric) => void;
    callback(fakeMetric({ name: 'CLS', value: 0.1, id: 'v3-2', delta: 0.1 }));

    expect(gtag).toHaveBeenCalledWith(
      'event',
      'CLS',
      expect.objectContaining({ value: 100 })
    );

    delete window.gtag;
  });

  it('does not throw when window.gtag is not defined', async () => {
    delete window.gtag;
    await init();

    const callback = (onFCP as Mock).mock.calls[0][0] as (m: Metric) => void;
    expect(() =>
      callback(fakeMetric({ name: 'FCP', value: 1000 }))
    ).not.toThrow();
  });
});
