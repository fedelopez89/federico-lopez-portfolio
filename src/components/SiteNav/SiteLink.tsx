import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

export type SiteNavVariant = 'home' | 'page';

interface SiteLinkProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  /** In-page target on the home route, e.g. "#projects" ("#home" is the top). */
  hash: string;
  /** "home" scrolls in place; "page" routes back to the home route. */
  variant: SiteNavVariant;
}

/**
 * Anchor to a home-route section. On the home route it is a plain fragment
 * link (no router needed); elsewhere it is a client-side link to `/#section`.
 */
export const SiteLink = forwardRef<HTMLAnchorElement, SiteLinkProps>(
  ({ hash, variant, ...rest }, ref) =>
    variant === 'page' ? (
      <Link to={`/${hash}`} {...rest} ref={ref} />
    ) : (
      <a href={hash} {...rest} ref={ref} />
    )
);
SiteLink.displayName = 'SiteLink';
