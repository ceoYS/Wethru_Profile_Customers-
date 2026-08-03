/**
 * Custom domain → customer slug mapping.
 *
 * Stage 3 of the domain strategy (docs/DOMAIN_STRATEGY.md).
 * Nothing here is wired to DNS yet — this file is the single source of
 * truth that a future deploy step (rewrites, CNAME provisioning, edge
 * middleware) will read from. `npm run domains:map` validates that every
 * entry points at an existing published customer.
 *
 * Only customer-owned domains belong here. profile.wethru.com is a separate,
 * already running WeThru service that this repo does not build or deploy to, so
 * no *.profile.wethru.com host may be mapped from here — an entry for one used
 * to sit in this file and was wrong.
 *
 * This module is read by scripts/generate-domain-map.mjs only. No page imports
 * it, so nothing here reaches any build output.
 */
export const domainMap = {
  "jianbae.com": "bae-jian",
} as const;

export type MappedDomain = keyof typeof domainMap;
