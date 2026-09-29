import { describe, it, expect } from 'vitest';
import indexHtml from '../../index.html?raw';
import { HOME_META } from './homeMeta';

const doc = new DOMParser().parseFromString(indexHtml, 'text/html');
const meta = (selector: string) =>
  doc.querySelector(selector)?.getAttribute('content');

describe('index.html head matches HOME_META', () => {
  it.each([
    ['meta[name="description"]', HOME_META.description],
    ['meta[property="og:title"]', HOME_META.socialTitle],
    ['meta[property="og:description"]', HOME_META.description],
    ['meta[property="og:url"]', HOME_META.canonical],
    ['meta[property="og:image"]', HOME_META.image],
    ['meta[property="og:image:width"]', String(HOME_META.imageWidth)],
    ['meta[property="og:image:height"]', String(HOME_META.imageHeight)],
    ['meta[property="og:image:type"]', HOME_META.imageType],
    ['meta[property="og:image:alt"]', HOME_META.imageAlt],
    ['meta[name="twitter:title"]', HOME_META.socialTitle],
    ['meta[name="twitter:description"]', HOME_META.description],
    ['meta[name="twitter:url"]', HOME_META.canonical],
    ['meta[name="twitter:image"]', HOME_META.image],
    ['meta[name="twitter:image:alt"]', HOME_META.imageAlt],
  ])('%s', (selector, expected) => {
    expect(meta(selector)).toBe(expected);
  });

  it('canonical link', () => {
    expect(
      doc.querySelector('link[rel="canonical"]')?.getAttribute('href')
    ).toBe(HOME_META.canonical);
  });
});
