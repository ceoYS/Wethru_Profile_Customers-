/**
 * Locale helpers for LocalizedString fields.
 *
 * Rendering model (static site, JS optional):
 * - Both languages are rendered into the HTML as
 *   `<span class="lang lang--ko">…</span><span class="lang lang--en">…</span>`.
 * - CSS shows only the active language based on `<html data-lang>`.
 * - Default is "ko"; without JS the page stays Korean.
 * - The toggle (LanguageToggle.astro + scripts/language-toggle.ts) flips
 *   `data-lang`/`lang` and persists the choice in localStorage.
 */

import type { CustomerProfile, LocalizedString, ProfileLocale } from "../types/profile";

export const DEFAULT_LOCALE: ProfileLocale = "ko";

/** True when the value carries a distinct English translation. */
export function isLocalized(
  value: LocalizedString | undefined,
): value is { ko: string; en: string } {
  return typeof value === "object" && value !== null;
}

/** Resolve a LocalizedString for a specific locale (plain strings pass through). */
export function localize(
  value: LocalizedString | undefined,
  locale: ProfileLocale = DEFAULT_LOCALE,
): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  return value[locale] ?? value.ko;
}

/** Whether this profile opts into the KO/EN toggle. */
export function hasEnglish(customer: CustomerProfile): boolean {
  return customer.locales?.includes("en") ?? false;
}
