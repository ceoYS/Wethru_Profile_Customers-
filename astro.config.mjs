// @ts-check
import { defineConfig } from "astro/config";
import { createReadStream, existsSync } from "node:fs";
import { cp } from "node:fs/promises";
import { basename, extname } from "node:path";

// Static profile factory. Every customer page is prerendered under /profiles/{slug}/.
//
// `site` is the origin of the PUBLIC career landing this repo deploys —
// https://career.wethru.com (Vercel project wethru-profile-customers). It is the
// base for the public Campus canonical/OG URLs only.
//
// It is deliberately NOT profile.wethru.com: that host is a separate, already
// running WeThru business-profile service that this repo neither builds nor
// deploys. Nothing here may treat it as a delivery origin (see
// docs/DOMAIN_STRATEGY.md).
//
// Customer profile pages do NOT derive a canonical/OG URL from `site` — they are
// delivered by link, are noindex, and never exist in the public build at all, so
// stamping them with a career.wethru.com URL would be a lie. See
// src/layouts/ProfilePage.astro.
//
// Two build-time flags decide what a build is allowed to contain. Both are
// fail-closed and neither is prefixed with PUBLIC_, so Vite never inlines them
// into a browser bundle:
//
//   npm run build                        public career build — THE ONLY build
//                                        Vercel Production runs
//                                        → no operator dashboard, no /profiles/*,
//                                          no customer photos in dist
//   CUSTOMER_PROFILES=1 npm run build    customer delivery build, LOCAL ONLY
//                                        → /profiles/* + their photos, no dashboard
//   INTERNAL_DASHBOARD=1 CUSTOMER_PROFILES=1 npm run build
//                                        → everything, LOCAL ONLY
//
// Vercel settings this depends on (do not change them without re-reading the
// above): Build Command is `npm run build`, and neither CUSTOMER_PROFILES nor
// INTERNAL_DASHBOARD is defined in the Production or Preview environment.

/** Safe env read — this repo carries no @types/node. */
const env = /** @type {{ process?: { env?: Record<string, string | undefined> } }} */ (
  globalThis
).process?.env;

const CUSTOMER_PROFILES = env?.CUSTOMER_PROFILES === "1";

/**
 * Customer photo gate.
 *
 * The optimized customer portraits used to live in public/, which Astro copies
 * into dist verbatim — so every public deploy shipped a real, fetchable face
 * photo of a real customer at a guessable URL, whatever the HTML said. They now
 * live in customer-assets/ (tracked in git, NOT inside publicDir), and the only
 * thing that can put them into dist is this integration, only when
 * CUSTOMER_PROFILES=1.
 *
 * That direction matters: the gate ADDS files on the delivery build instead of
 * DELETING them on the public one. If this integration is ever removed,
 * misconfigured, or crashes, the failure mode is a delivery build with missing
 * photos — never a public build with a customer's face in it.
 *
 * Nothing is deleted: the originals stay in the repo and the delivery build
 * still serves them from the exact same URLs (/images/customers/{slug}/…), so
 * the customer data and page design are untouched.
 */
const CUSTOMER_IMAGE_DIR = new URL("./customer-assets/images/customers/", import.meta.url);
const CUSTOMER_IMAGE_ROUTE = "/images/customers/";

/** @type {Record<string, string>} */
const MIME = {
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

/** @returns {import("astro").AstroIntegration} */
function customerAssets() {
  return {
    name: "wethru:customer-assets",
    hooks: {
      // Dev parity: `astro dev` serves the photos only under the same flag that
      // builds the pages, so a flagless dev server matches a public build.
      "astro:config:setup": ({ updateConfig }) => {
        if (!CUSTOMER_PROFILES) return;
        updateConfig({
          vite: {
            plugins: [
              {
                name: "wethru:customer-assets-dev",
                configureServer(server) {
                  server.middlewares.use(CUSTOMER_IMAGE_ROUTE, (req, res, next) => {
                    const rel = decodeURIComponent(
                      (req.url ?? "/").split("?")[0],
                    ).replace(/^\/+/, "");
                    if (!rel) return next();
                    const file = new URL(rel, CUSTOMER_IMAGE_DIR);
                    // Reject anything ../-escaping the customer image dir.
                    if (
                      !file.pathname.startsWith(CUSTOMER_IMAGE_DIR.pathname) ||
                      !existsSync(file)
                    ) {
                      return next();
                    }
                    res.setHeader(
                      "Content-Type",
                      MIME[extname(file.pathname).toLowerCase()] ??
                        "application/octet-stream",
                    );
                    createReadStream(file).pipe(res);
                  });
                },
              },
            ],
          },
        });
      },
      "astro:build:done": async ({ dir, logger }) => {
        if (!CUSTOMER_PROFILES) {
          logger.info(
            "public build — customer photos left out of dist (set CUSTOMER_PROFILES=1 for a delivery build)",
          );
          return;
        }
        if (!existsSync(CUSTOMER_IMAGE_DIR)) {
          logger.warn(`customer-assets missing at ${CUSTOMER_IMAGE_DIR.pathname}`);
          return;
        }
        await cp(CUSTOMER_IMAGE_DIR, new URL("./images/customers/", dir), {
          recursive: true,
          // .gitkeep placeholders keep empty slug folders in git; they are not
          // part of the delivered page.
          filter: (source) => !basename(source).startsWith("."),
        });
        logger.info("delivery build — customer photos copied to dist/images/customers/");
      },
    },
  };
}

export default defineConfig({
  site: "https://career.wethru.com",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
  integrations: [customerAssets()],
});
