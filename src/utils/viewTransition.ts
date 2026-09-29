import type { CSSProperties, MouseEvent } from 'react';

/**
 * Shared-element transitions between a project card and its page, built on the
 * View Transitions API as progressive enhancement. The app uses the declarative
 * <BrowserRouter>, which has no `viewTransition` support (that needs a data
 * router), so navigation is wrapped by hand: the old page is snapshotted, the
 * route changes while the page is frozen, and the destination signals when its
 * DOM is ready (see `signalViewTransitionReady`).
 *
 * `view-transition-name` must be unique per document at snapshot time, so cards
 * are only named while a transition runs, and only the one involved.
 */

const READY_TIMEOUT_MS = 1000;
const PREPARE_TIMEOUT_MS = 600;
const SHARED_CLASS = 'project-shared';
const SHOT_CLASS = 'project-shot';
const TITLE_CLASS = 'project-title';

type SharedKind = 'shot' | 'title';
const classesFor = (kind: SharedKind) =>
  `${SHARED_CLASS} ${kind === 'shot' ? SHOT_CLASS : TITLE_CLASS}`;

export interface SharedElement {
  element: Element | null | undefined;
  name: string;
  kind: SharedKind;
}

let active = false;
let resolveReady: (() => void) | null = null;
const marked = new Set<HTMLElement>();

export const projectShotName = (id: string) => `project-shot-${id}`;
export const projectTitleName = (id: string) => `project-title-${id}`;

/** True when the browser supports the API and the user has not opted out of motion. */
export const canUseViewTransition = (): boolean =>
  typeof document !== 'undefined' &&
  typeof document.startViewTransition === 'function' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * True from the moment a transition starts until it finishes. Components read
 * it once, on first render (latched in state), to skip entrance animations for
 * a page that arrives mid-transition; it must not drive later re-renders.
 */
export const isViewTransitionActive = () => active;

/** Plain primary-button click: modified clicks keep their native behavior. */
export const isPlainClick = (e: MouseEvent<HTMLElement>) =>
  e.button === 0 && !(e.metaKey || e.ctrlKey || e.shiftKey || e.altKey);

/** Inline style for the always-present destination elements. */
export const viewTransitionStyle = (
  name: string,
  kind: SharedKind
): CSSProperties =>
  ({
    viewTransitionName: name,
    viewTransitionClass: classesFor(kind),
  }) as CSSProperties;

export const findProjectLink = (id: string): HTMLAnchorElement | undefined =>
  Array.from(
    document.querySelectorAll<HTMLAnchorElement>('a[href^="/projects/"]')
  ).find((a) => a.getAttribute('href') === `/projects/${id}`);

/** The card's screenshot frame and title, the two elements that morph. */
export const projectCardShared = (
  link: Element | undefined,
  id: string
): SharedElement[] => [
  {
    element: link?.querySelector('[data-vt-shot]'),
    name: projectShotName(id),
    kind: 'shot',
  },
  {
    element: link?.querySelector('[data-vt-title]'),
    name: projectTitleName(id),
    kind: 'title',
  },
];

export const markSharedElements = (items: SharedElement[]) => {
  items.forEach(({ element, name, kind }) => {
    if (!(element instanceof HTMLElement)) return;
    element.style.setProperty('view-transition-name', name);
    element.style.setProperty('view-transition-class', classesFor(kind));
    marked.add(element);
  });
};

const clearMarks = () => {
  marked.forEach((el) => {
    el.style.removeProperty('view-transition-name');
    el.style.removeProperty('view-transition-class');
  });
  marked.clear();
};

/**
 * Called by a destination page once its DOM is in place (and scrolled), so the
 * new snapshot is taken from the right state. No-op outside a transition.
 */
/** Test-only: restore module state between tests. */
export const resetViewTransitionForTests = () => {
  active = false;
  resolveReady = null;
  marked.clear();
};

export const signalViewTransitionReady = () => resolveReady?.();

const withTimeout = (promise: Promise<unknown>, ms: number) =>
  new Promise<void>((resolve) => {
    const id = setTimeout(resolve, ms);
    promise.then(
      () => {
        clearTimeout(id);
        resolve();
      },
      () => {
        clearTimeout(id);
        resolve();
      }
    );
  });

interface Options {
  /** Elements to name for the old snapshot (only the ones being morphed). */
  shared?: SharedElement[];
  /** Work to finish while the old page is still frozen, e.g. a route chunk. */
  prepare?: () => Promise<unknown>;
}

/**
 * Runs `go` (a navigation) inside a view transition when supported. Otherwise
 * calls it directly, so unsupported browsers and reduced motion keep the
 * existing behavior. Returns whether a transition was started.
 */
export function navigateWithTransition(
  go: () => void,
  { shared = [], prepare }: Options = {}
): boolean {
  // A transition is already running (double click / Enter): ignore this one.
  if (active) return false;
  if (!canUseViewTransition()) {
    go();
    return false;
  }

  active = true;
  markSharedElements(shared);

  const finish = () => {
    active = false;
    resolveReady = null;
    clearMarks();
  };

  try {
    const transition = document.startViewTransition(async () => {
      if (prepare)
        await withTimeout(Promise.resolve().then(prepare), PREPARE_TIMEOUT_MS);
      const ready = new Promise<void>((resolve) => {
        const id = setTimeout(resolve, READY_TIMEOUT_MS);
        resolveReady = () => {
          clearTimeout(id);
          resolve();
        };
      });
      go();
      await ready;
    });
    transition.ready.catch(() => {});
    transition.updateCallbackDone.catch(() => {});
    transition.finished.then(finish, finish);
    return true;
  } catch {
    finish();
    go();
    return false;
  }
}
