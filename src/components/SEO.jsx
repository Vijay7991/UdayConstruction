import { Helmet } from 'react-helmet-async';
import { business, SITE_ORIGIN } from '../data/business.js';

/**
 * Per-page SEO. Wraps react-helmet-async so we get a single API surface and
 * can change the canonical/site origin in one place later.
 */
export default function SEO({ title, description, path = '/', image }) {
  const fullTitle = title
    ? `${title} | ${business.name}`
    : `${business.name} — ${business.tagline}`;
  const desc = description ?? business.tagline;
  const url  = `${SITE_ORIGIN}${path}`;
  const img  = image ?? `${SITE_ORIGIN}/og-cover.jpg`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  );
}
