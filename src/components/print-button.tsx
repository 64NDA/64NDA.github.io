"use client";

import { Printer } from "./icons";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-full border border-rule px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
    >
      <Printer className="size-4" /> Print
    </button>
  );
}
