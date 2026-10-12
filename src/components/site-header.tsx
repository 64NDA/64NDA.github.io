import Link from "next/link";
import { profile } from "@/content/profile";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Research", href: "/#research" },
  { label: "Resume", href: "/resume/" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-rule/70 bg-paper/85 backdrop-blur-md print:hidden">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="font-serif text-lg font-medium tracking-tight text-ink">
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2.5 py-1.5 text-sm text-muted transition-colors hover:text-ink ${
                // Section anchors are redundant on a phone, where the page is one scroll; keep Resume.
                item.href.startsWith("/#") ? "hidden sm:inline-block" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
