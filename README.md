# Albert Zhou: personal site

My resume and project portfolio, live at **[64nda.github.io](https://64nda.github.io)**.

Built with Next.js (App Router, static export), React, TypeScript and Tailwind CSS. GitHub Actions builds it and deploys it to GitHub Pages.

## How it fits together

- **Content is data.** Everything on the site comes from typed files in `src/content/`, and the home page, project pages and web resume are all rendered from them. To change what the site says, edit those files:
  - `profile.ts`: name, links, education, skills
  - `experience.ts`: jobs and research roles, newest first
  - `projects.ts`: project case studies, in home-page order, plus smaller "other work"
  - `publications.ts`
- **Fully static.** `next build` writes plain HTML, CSS and JS to `out/`. Server Components run at build time, `generateStaticParams` builds one page per project, and nothing runs on a server.
- **Pages** (`src/app/`):
  - `/`: the home page
  - `/projects/[slug]/`: case studies
  - `/resume/`: web resume with a print stylesheet
  - `not-found.tsx` becomes `404.html`
  - `sitemap.ts`, `robots.ts` and `og.png/route.tsx` (the link-preview card) are also generated at build time.
- **Design tokens** live in `src/app/globals.css` as CSS variables and are exposed to Tailwind as `bg-paper`, `text-ink`, `text-muted`, `border-rule`, `text-accent` and so on. Dark mode sets `data-theme="dark"` on `<html>`. An inline script in `layout.tsx` picks the theme before first paint, so the page never flashes the wrong one.
- **Static files** (`public/`):
  - project screenshots (WebP, 1600×1000)
  - the resume PDF
  - `demos/obsidian-theme-builder/`, the live demo linked from that project

## Working on it

```bash
npm install
npm run dev          # http://localhost:3000, hot reload
npm run build        # static export to out/
npm start            # serve out/ at http://localhost:3000 to check the real build
npm run lint
npm run typecheck
npm run check:links  # every internal link in out/ resolves to a file
```

Use Node 24 (see `.nvmrc`); CI uses the same version, and its npm 11 must match the one that wrote `package-lock.json`.

## Deploying

Push to `main`. The workflow in `.github/workflows/deploy.yml` lints, typechecks, builds and link-checks, then deploys `out/` to GitHub Pages. Pull requests run the same checks without deploying.

One-time setup: in **Settings → Pages**, set **Source** to **GitHub Actions**.

### Custom domain (optional)

1. Buy the domain and add the DNS records GitHub lists in its [custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
2. Add `public/CNAME` containing just the domain.
3. Set `site.url` in `src/content/profile.ts` to `https://<domain>`. Canonical URLs, the sitemap and the link-preview tags all derive from it.
4. Enter the domain in **Settings → Pages** and tick **Enforce HTTPS**.

## Updating the resume PDF

`public/resume/Albert_Zhou_Resume.pdf` is the tailored Word resume, with the phone number removed for the public copy. When the Word version changes, export a new PDF without the phone number and replace the file. The web resume at `/resume/` updates itself from `src/content/`.
