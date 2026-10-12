// Fails if any page in the static export links to a site-relative URL that has no file behind it.
// External links aren't checked: they're flaky in CI (LinkedIn, for one, refuses bots).
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "out";

function htmlFiles(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

function resolves(url) {
  const path = join(root, decodeURIComponent(url.split(/[?#]/)[0]));
  if (existsSync(path) && statSync(path).isFile()) return true;
  return existsSync(join(path, "index.html"));
}

const broken = [];
const pages = htmlFiles(root);
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const [, url] of html.matchAll(/(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
    if (!resolves(url)) broken.push(`${page}: ${url}`);
  }
}

if (broken.length) {
  console.error(`Broken internal links:\n  ${[...new Set(broken)].join("\n  ")}`);
  process.exit(1);
}
console.log(`Internal links OK across ${pages.length} pages.`);
