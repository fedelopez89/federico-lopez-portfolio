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

describe('initWebVitals', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete window.gtag;
  });

  it('registers a callback with each of the five web-vitals observers', () => {
    initWebVitals();
    expect(onCLS).toHaveBeenCalledOnce();
    expect(onINP).toHaveBeenCalledOnce();
    expect(onFCP).toHaveBeenCalledOnce();
    expect(onLCP).toHaveBeenCalledOnce();
    expect(onTTFB).toHaveBeenCalledOnce();
  });

  it('passes a function as the callback to each observer', () => {
    initWebVitals();
    for (const fn of [onCLS, onINP, onFCP, onLCP, onTTFB]) {
      expect((fn as Mock).mock.calls[0][0]).toBeTypeOf('function');
    }
  });
});

describe('reportMetric callback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls window.gtag with the correct event payload when gtag is defined', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    initWebVitals();
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

  it('rounds CLS value multiplied by 1000 when reporting to gtag', () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    initWebVitals();
    const callback = (onCLS as Mock).mock.calls[0][0] as (m: Metric) => void;
    callback(fakeMetric({ name: 'CLS', value: 0.1, id: 'v3-2', delta: 0.1 }));

    expect(gtag).toHaveBeenCalledWith(
      'event',
      'CLS',
      expect.objectContaining({ value: 100 })
    );

    delete window.gtag;
  });

  it('does not throw when window.gtag is not defined', () => {
    delete window.gtag;
    initWebVitals();

    const callback = (onFCP as Mock).mock.calls[0][0] as (m: Metric) => void;
    expect(() => callback(fakeMetric({ name: 'FCP', value: 1000 }))).not.toThrow();
  });
});
