import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { ButtonLink, Eyebrow, Tags } from "@/components/ui";
import { ogImage } from "@/content/profile";
import { getProject, projects } from "@/content/projects";

// Static export: every project page is built ahead of time, and unknown slugs 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}/` },
    // Nested openGraph replaces the layout's wholesale, so the image has to be restated.
    openGraph: {
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}/`,
      images: [ogImage],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="mx-auto max-w-5xl px-5 pt-10 pb-20 sm:px-8 sm:pt-14">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-4" /> All projects
      </Link>

      <header className="mt-10">
        <Eyebrow>
          {project.period} · {project.role}
        </Eyebrow>
        <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted text-pretty">{project.tagline}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.links.map((link, i) => (
            <ButtonLink key={link.href} href={link.href} variant={i === 0 ? "primary" : "secondary"}>
              {link.label}
            </ButtonLink>
          ))}
        </div>
      </header>

      <div className="mt-12">
        <ProjectCover project={project} priority />
      </div>

      <dl className="mt-12 grid gap-8 border-y border-rule py-10 sm:grid-cols-3">
        {project.metrics.map((m) => (
          <div key={m.label} className="flex flex-col-reverse justify-end">
            <dt className="mt-2 text-sm leading-snug text-muted">{m.label}</dt>
            <dd className="font-serif text-5xl tracking-tight">{m.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_15rem]">
        <div className="max-w-2xl space-y-14">
          <Block title="The problem">
            <p className="text-lg leading-relaxed text-muted">{project.problem}</p>
          </Block>

          <Block title="How it works">
            <ol className="space-y-6">
              {project.approach.map((step, i) => (
                <li key={step} className="grid grid-cols-[2.25rem_1fr] leading-relaxed text-muted">
                  <span className="font-mono text-sm leading-7 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </Block>

          <Block title="Results">
            <ul className="space-y-3">
              {project.results.map((r) => (
                <li key={r} className="relative pl-5 leading-relaxed text-muted">
                  <span aria-hidden className="absolute top-[0.7em] left-0 size-1.5 rounded-full bg-accent" />
                  {r}
                </li>
              ))}
            </ul>
          </Block>

          {project.gallery?.map((img) => (
            <figure key={img.src}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-rule bg-surface">
                <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 672px, 100vw" className="object-cover object-top" />
              </div>
              {img.caption && <figcaption className="mt-3 text-sm text-faint">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>

        <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
          <div>
            <Eyebrow>Role</Eyebrow>
            <p className="mt-2 text-sm text-muted">{project.role}</p>
          </div>
          <div>
            <Eyebrow>Stack</Eyebrow>
            <Tags items={project.stack} className="mt-3" />
          </div>
        </aside>
      </div>

      {next !== project && (
        <Link
          href={`/projects/${next.slug}/`}
          className="group mt-20 flex items-end justify-between gap-6 border-t border-rule pt-10"
        >
          <div>
            <Eyebrow>Next project</Eyebrow>
            <p className="mt-2 font-serif text-3xl tracking-tight transition-colors group-hover:text-accent">
              {next.title}
            </p>
          </div>
          <ArrowRight className="mb-2 size-6 shrink-0 text-faint transition-transform group-hover:translate-x-1 group-hover:text-accent" />
        </Link>
      )}
    </article>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-5 font-serif text-2xl tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
