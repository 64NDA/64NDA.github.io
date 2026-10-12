"use client";

import { Moon, Sun } from "./icons";

// The initial theme is set before paint by the script in layout.tsx, so this component holds no
// state: CSS picks the icon from `data-theme`, and a click just flips the attribute and saves it.
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-ink"
    >
      <Moon className="size-[18px] dark:hidden" />
      <Sun className="hidden size-[18px] dark:block" />
    </button>
  );
}
