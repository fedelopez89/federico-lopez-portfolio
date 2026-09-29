import type { Metric } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const reportMetric = (metric: Metric) => {
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value
      ),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      non_interaction: true,
    });
  }
};

const start = async () => {
  // web-vitals observes with buffered entries, so registering after load does
  // not lose LCP, CLS or FCP. Loading it lazily keeps it off the critical path.
  const { onCLS, onINP, onFCP, onLCP, onTTFB } = await import('web-vitals');
  onCLS(reportMetric);
  onINP(reportMetric);
  onFCP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);
};

const whenIdle = (task: () => void) => {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(task, { timeout: 5000 });
  } else {
    window.setTimeout(task, 2000);
  }
};

export const initWebVitals = () => {
  const run = () => whenIdle(() => void start());
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
};
