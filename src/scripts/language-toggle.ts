/**
 * KO/EN language toggle behavior.
 *
 * - Language state lives on <html> as data-lang + the lang attribute.
 *   CSS (global.css) shows/hides .lang--ko / .lang--en spans from it.
 * - The choice persists in localStorage and is re-applied before first paint
 *   by an inline script in ProfilePage.astro (no flash of wrong language).
 * - Without JS nothing binds and the server-rendered Korean default stays.
 */

export type ProfileLanguage = "ko" | "en";

export const LANGUAGE_STORAGE_KEY = "wethru-profile-lang";

function readStoredLanguage(): ProfileLanguage | null {
  try {
    const value = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === "ko" || value === "en" ? value : null;
  } catch {
    return null;
  }
}

export function applyLanguage(lang: ProfileLanguage): void {
  const root = document.documentElement;
  root.dataset.lang = lang;
  root.lang = lang;

  document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langBtn === lang));
  });

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Private mode / blocked storage — toggle still works for this visit.
  }
}

export function initLanguageToggle(): void {
  const root = document.documentElement;

  // Sync buttons with whatever the pre-paint inline script applied.
  const current =
    (root.dataset.lang as ProfileLanguage | undefined) ?? readStoredLanguage() ?? "ko";
  applyLanguage(current);

  document.querySelectorAll<HTMLButtonElement>("[data-lang-btn]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const lang = button.dataset.langBtn;
      if (lang === "ko" || lang === "en") applyLanguage(lang);
    });
  });
}
