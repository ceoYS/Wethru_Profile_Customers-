/**
 * Interaction-effects on/off toggle behavior.
 *
 * - State lives on <html> as data-effects ("on" | "off"). CSS keys the hover
 *   lift / extra-glow enhancements off html[data-effects="on"], so flipping
 *   this attribute turns those interactions on or off site-wide. The resting
 *   portrait glow and plain colour affordances are intentionally not gated.
 * - Default is "on" (server-rendered). The choice persists in localStorage and
 *   is re-applied before first paint by an inline script in ProfilePage.astro,
 *   so a returning "off" visitor never sees effects flash on.
 * - Without JS nothing binds and the server-rendered "on" default stays.
 */

export type ProfileEffects = "on" | "off";

export const EFFECTS_STORAGE_KEY = "wethru-profile-effects";

function readStoredEffects(): ProfileEffects | null {
  try {
    const value = localStorage.getItem(EFFECTS_STORAGE_KEY);
    return value === "on" || value === "off" ? value : null;
  } catch {
    return null;
  }
}

export function applyEffects(mode: ProfileEffects): void {
  const root = document.documentElement;
  root.dataset.effects = mode;

  document.querySelectorAll<HTMLButtonElement>("[data-effects-toggle]").forEach((button) => {
    button.setAttribute("aria-pressed", String(mode === "on"));
  });

  try {
    localStorage.setItem(EFFECTS_STORAGE_KEY, mode);
  } catch {
    // Private mode / blocked storage — toggle still works for this visit.
  }
}

export function initEffectsToggle(): void {
  const root = document.documentElement;

  // Sync buttons with whatever the pre-paint inline script applied (or the
  // server-rendered default).
  const current =
    (root.dataset.effects as ProfileEffects | undefined) ?? readStoredEffects() ?? "on";
  applyEffects(current);

  document.querySelectorAll<HTMLButtonElement>("[data-effects-toggle]").forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";
    button.addEventListener("click", () => {
      const next = root.dataset.effects === "off" ? "on" : "off";
      applyEffects(next);
    });
  });
}
