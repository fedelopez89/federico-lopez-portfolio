export interface HeadMeta {
  title: string;
  description: string;
  canonical: string;
  image: string;
  imageType: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  jsonLd: { id: string; data: Record<string, unknown> }[];
}
export interface NoscriptContent {
  heading: string;
  subheading?: string;
  description?: string;
  links: { href: string; label: string }[];
}
export function escapeAttr(value: string): string;
export function escapeHtml(value: string): string;
export function renderNoscript(content: NoscriptContent): string;
export function rewriteProjectHead(
  html: string,
  meta: HeadMeta,
  noscript: string
): string;
export function addHomeNoscript(html: string, noscript: string): string;
