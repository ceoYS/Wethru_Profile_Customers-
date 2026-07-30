/**
 * Campus V4 — sanitized public preview image map.
 *
 * The PUBLIC page must not embed the three customers' live pages by iframe: it
 * pulls Everytime mobile traffic (3 iframes is heavy) and it would expose the
 * customers' faces. Instead the public build shows a static, face-masked,
 * PII-free WebP capture of each real first screen. This module is the single
 * place that binds a case's `previewKey` to its image file.
 *
 * Design rules honoured here:
 * - Explicit ESM imports, NOT import.meta.glob and NOT path-string guessing.
 *   Each asset is a typed image import so Astro fingerprints/optimises it and
 *   exposes real width/height for the <img>.
 * - Fail-closed: a key exists only when its sanitized asset exists, and
 *   getPublicPreview() throws for an unknown key. An approved case with no
 *   image therefore breaks the build instead of silently rendering a
 *   placeholder or a broken <img>.
 * - Review mode (CAMPUS_REVIEW=1) renders the live iframe and never calls into
 *   this module for an image.
 *
 * These files are consent-gated. Production can render an asset only when its
 * anonymous case is explicitly approvedForCampus.
 */
import type { ImageMetadata } from "astro";
import caseOne from "../assets/campus-v4-public/case-01-preview-v4-safe.webp";
import caseTwo from "../assets/campus-v4-public/case-02-preview-v3-safe.webp";
import caseThree from "../assets/campus-v4-public/case-03-preview-v3-safe.webp";

// Keys are the neutral anon ids (campus-v4-anon-cases.ts). No real name or real
// slug appears here or in the asset filenames — the public build's import graph
// carries only case-0X identifiers.
export const campusV4PublicPreviews: Record<string, ImageMetadata> = {
  "case-01": caseOne,
  "case-02": caseTwo,
  "case-03": caseThree,
};

/**
 * Resolve the sanitized preview for a case, or throw. Call this ONLY on the
 * static-image path (production / public-image QA), never in review mode.
 */
export function getPublicPreview(
  previewKey: string | undefined,
  caseName: string,
): ImageMetadata {
  if (!previewKey) {
    throw new Error(
      `Campus V4: case "${caseName}" is rendered as a public image but declares no previewKey.`,
    );
  }
  const image = campusV4PublicPreviews[previewKey];
  if (!image) {
    throw new Error(
      `Campus V4: no sanitized public preview for previewKey "${previewKey}" (${caseName}). ` +
        `A shown case must ship src/assets/campus-v4-public/${previewKey}-preview-v3-safe.webp — refusing to render a placeholder.`,
    );
  }
  return image;
}
