import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "./icons";

/** Small mono label used above headings and for dates. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-xs tracking-wide text-faint uppercase ${className}`}>{children}</p>
  );
}

export function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-t border-rule py-16 sm:py-20">
      <div className="mb-10 sm:mb-12">
        <Eyebrow>{label}</Eyebrow>
        <h2 id={`${id}-title`} className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

export function Tags({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-rule px-2.5 py-0.5 text-xs text-muted print:border-0 print:p-0 print:after:content-[',']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);

/** Pill link. External links open normally (same tab) but get an arrow so it's clear they leave the site. */
export function ButtonLink({
  href,
  children,
  variant = "secondary",
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  download?: boolean;
}) {
  const styles =
    variant === "primary"
      ? "bg-ink text-paper hover:bg-accent"
      : "border border-rule text-ink hover:border-ink";
  const className = `inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${styles}`;
  const external = isExternal(href);

  // Files in public/ and pages outside the app router (the demo) need a plain <a>, not client routing.
  if (external || download || href.startsWith("/demos/") || href.endsWith(".pdf")) {
    return (
      <a href={href} className={className} download={download || undefined}>
        {children}
        {external && !href.startsWith("mailto:") && <ArrowUpRight className="size-3.5" />}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
