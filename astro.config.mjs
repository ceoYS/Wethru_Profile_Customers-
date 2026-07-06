// @ts-check
import { defineConfig } from "astro/config";

// Static profile factory. Every customer page is prerendered under /profiles/{slug}/.
// `site` is the canonical origin for stage 1 of the domain strategy
// (see docs/DOMAIN_STRATEGY.md). Custom domains are mapped later via
// src/data/domain-map.ts without changing this build.
export default defineConfig({
  site: "https://profile.wethru.com",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
