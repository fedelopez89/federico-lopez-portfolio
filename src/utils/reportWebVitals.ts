import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

// Report Web Vitals metrics
// CLS: Cumulative Layout Shift - visual stability
// INP: Interaction to Next Paint - interactivity (replaces FID)
// FCP: First Contentful Paint - perceived load speed
// LCP: Largest Contentful Paint - loading performance
// TTFB: Time to First Byte - server responsiveness

const reportMetric = (metric: Metric) => {
  // Log to console in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
  }

  // In production, you could send to analytics
  // Example: sendToAnalytics(metric)

  // You can also add thresholds and warnings
  const thresholds = {
    CLS: 0.1,
    INP: 200,
    FCP: 1800,
    LCP: 2500,
    TTFB: 600,
  };

  const threshold = thresholds[metric.name as keyof typeof thresholds];
  if (threshold && metric.value > threshold) {
    console.warn(
      `[Web Vitals Warning] ${metric.name} (${metric.value}) exceeds recommended threshold (${threshold})`
    );
  }
};

export const initWebVitals = () => {
  onCLS(reportMetric);
  onINP(reportMetric);
  onFCP(reportMetric);
  onLCP(reportMetric);
  onTTFB(reportMetric);
};
