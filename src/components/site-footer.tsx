import { profile, site } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule print:hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-10 text-sm text-faint sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          Built with Next.js and Tailwind CSS, deployed on GitHub Pages ·{" "}
          <a href={site.repo} className="underline decoration-rule underline-offset-4 hover:text-ink">
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
