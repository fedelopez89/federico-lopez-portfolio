import { describe, it, expect } from 'vitest';
import { orderGroupItems } from './orderGroupItems';
import type { Project } from '../../../data/projects';

const make = (id: string, highlight?: boolean): Project => ({
  id,
  title: id,
  description: '',
  technologies: [],
  category: 'personal',
  group: 'independent',
  highlight,
});

describe('orderGroupItems', () => {
  it('moves a non-first highlighted item to the front and keeps the rest in order', () => {
    const items = [make('a'), make('b'), make('c', true), make('d')];
    const { ordered, highlighted } = orderGroupItems(items);
    expect(ordered.map((p) => p.id)).toEqual(['c', 'a', 'b', 'd']);
    expect(highlighted?.id).toBe('c');
  });

  it('keeps data order and highlights nothing when none is flagged', () => {
    const items = [make('a'), make('b')];
    const { ordered, highlighted } = orderGroupItems(items);
    expect(ordered).toBe(items);
    expect(highlighted).toBeUndefined();
  });

  it('only leads with the first highlighted item', () => {
    const { ordered, highlighted } = orderGroupItems([
      make('a'),
      make('b', true),
      make('c', true),
    ]);
    expect(ordered.map((p) => p.id)).toEqual(['b', 'a', 'c']);
    expect(highlighted?.id).toBe('b');
  });
});
