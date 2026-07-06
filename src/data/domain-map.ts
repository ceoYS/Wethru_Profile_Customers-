/**
 * Custom domain → customer slug mapping.
 *
 * Stage 3 of the domain strategy (docs/DOMAIN_STRATEGY.md).
 * Nothing here is wired to DNS yet — this file is the single source of
 * truth that a future deploy step (rewrites, CNAME provisioning, edge
 * middleware) will read from. `npm run domains:map` validates that every
 * entry points at an existing published customer.
 */
export const domainMap = {
  "bae-jian.profile.wethru.com": "bae-jian",
  "jianbae.com": "bae-jian",
} as const;

export type MappedDomain = keyof typeof domainMap;
