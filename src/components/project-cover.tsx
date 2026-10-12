import Image from "next/image";
import type { Project } from "@/content/types";
import { OwaiDiagram } from "./owai-diagram";

/** A project's cover in a fixed frame (16:10 unless `aspect` overrides it): a screenshot, or a diagram. */
export function ProjectCover({
  project,
  priority = false,
  aspect = "aspect-[16/10]",
}: {
  project: Project;
  priority?: boolean;
  aspect?: string;
}) {
  const { cover } = project;
  return (
    <div className={`relative overflow-hidden rounded-xl border border-rule bg-surface ${aspect}`}>
      {"diagram" in cover ? (
        <OwaiDiagram />
      ) : (
        <Image
          src={cover.src}
          alt={cover.alt}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes="(min-width: 1024px) 960px, 100vw"
          className="object-cover object-top"
        />
      )}
    </div>
  );
}
