import type { MetadataRoute } from "next";
import { site } from "@/content/profile";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/resume/", ...projects.map((p) => `/projects/${p.slug}/`)];
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
