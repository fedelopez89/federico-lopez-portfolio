import type { Project } from '../../../data/projects';

/**
 * Puts a group's highlighted project first. Only one item per group leads;
 * any further highlighted ones stay regular. Keeps the rest in data order.
 */
export function orderGroupItems(items: Project[]): {
  ordered: Project[];
  highlighted: Project | undefined;
} {
  const highlighted = items.find((project) => project.highlight);
  const ordered = highlighted
    ? [highlighted, ...items.filter((project) => project !== highlighted)]
    : items;
  return { ordered, highlighted };
}
