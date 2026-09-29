/** Adds `noreferrer` to a caller-supplied rel without dropping their tokens. */
export const mergeRel = (rel?: string): string =>
  Array.from(new Set([...(rel?.split(/\s+/).filter(Boolean) ?? []), 'noreferrer'])).join(' ');
