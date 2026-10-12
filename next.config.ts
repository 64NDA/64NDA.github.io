import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit a fully static site to `out/` for GitHub Pages.
  output: "export",
  // GitHub Pages serves `/resume/index.html` for `/resume/`, so emit folders, not `resume.html`.
  trailingSlash: true,
  // The default image optimizer needs a server; images in `public/` are already sized WebP.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
