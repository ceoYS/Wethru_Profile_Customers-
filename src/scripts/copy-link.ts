/**
 * Copy-link behavior for CopyLinkButton.astro.
 * Clipboard API first, execCommand fallback for older WebViews
 * (KakaoTalk / Instagram in-app browsers still matter for name cards).
 */

const RESET_DELAY_MS = 2000;

function fallbackCopy(text: string): boolean {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }
  textarea.remove();
  return copied;
}

async function copyText(text: string): Promise<boolean> {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or insecure context — fall through.
    }
  }
  return fallbackCopy(text);
}

export function initCopyLinkButtons(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>("[data-copy-link]");

  buttons.forEach((button) => {
    if (button.dataset.bound === "true") return;
    button.dataset.bound = "true";

    const idleLabel = button.dataset.label ?? button.textContent?.trim() ?? "링크 복사";
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    button.addEventListener("click", async () => {
      const url = button.dataset.copyUrl || window.location.href;
      const ok = await copyText(url);

      button.textContent = ok ? "복사 완료" : "복사 실패 — 주소창을 이용해주세요";
      button.dataset.copied = String(ok);

      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        button.textContent = idleLabel;
        delete button.dataset.copied;
      }, RESET_DELAY_MS);
    });
  });
}
