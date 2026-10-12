import Link from "next/link";
import { ArrowRight, ArrowUpRight, Download } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { ButtonLink, Eyebrow, Section, Tags } from "@/components/ui";
import { experience } from "@/content/experience";
import { education, languages, profile, skills } from "@/content/profile";
import { otherWork, projects } from "@/content/projects";
import { publications } from "@/content/publications";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      <Hero />
      <ExperienceSection />
      <ProjectsSection />
      <ResearchSection />
      <BackgroundSection />
      <ContactSection />
    </div>
  );
}

function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-24">
      <Eyebrow>
        {profile.role} · {profile.location}
      </Eyebrow>
      <h1 className="mt-5 max-w-3xl font-serif text-[2.6rem] leading-[1.08] tracking-tight text-balance sm:text-6xl">
        {profile.headline}
      </h1>
      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{profile.intro}</p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <ButtonLink href={profile.resumePdf} variant="primary" download>
          <Download className="size-4" /> Resume
        </ButtonLink>
        {profile.links.map((link) => (
          <ButtonLink key={link.href} href={link.href}>
            {link.label}
          </ButtonLink>
        ))}
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <Section id="experience" label="Experience" title="Where I've worked">
      <ol className="space-y-12">
        {experience.map((job) => (
          <li key={job.organisation} className="grid gap-x-10 gap-y-2 md:grid-cols-[10rem_1fr]">
            <p className="font-mono text-xs leading-7 text-faint">
              {job.start} – {job.end}
            </p>
            <div>
              <h3 className="text-lg font-medium">
                {job.role} <span className="text-faint">·</span> {job.organisation}
              </h3>
              <p className="text-sm text-faint">
                {job.location}
                {job.kind === "research" && " · Research"}
              </p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{job.summary}</p>
              <details className="group mt-3 max-w-2xl">
                <summary className="inline-flex cursor-pointer list-none items-center gap-1 text-sm text-accent select-none [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">More detail</span>
                  <span className="hidden group-open:inline">Less detail</span>
                  <ArrowRight className="size-3.5 transition-transform group-open:rotate-90" />
                </summary>
                <ul className="mt-3 space-y-2 border-l border-rule pl-4 text-sm leading-relaxed text-muted">
                  {job.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </details>
              {job.stack && <Tags items={job.stack} className="mt-4" />}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function ProjectsSection() {
  return (
    <Section id="projects" label="Projects" title="Selected work">
      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.map((project, i) => (
          <article key={project.slug} className={`group relative ${i === 0 ? "md:col-span-2" : ""}`}>
            <ProjectCover
              project={project}
              priority={i === 0}
              // The featured card spans both columns; a wider frame keeps it from dominating the page.
              aspect={i === 0 ? "aspect-[16/10] md:aspect-[2/1]" : undefined}
            />
            <div className={`mt-5 ${i === 0 ? "md:grid md:grid-cols-[1fr_auto] md:gap-10" : ""}`}>
              <div>
                <Eyebrow>
                  {project.period} · {project.role}
                </Eyebrow>
                <h3 className="mt-2 font-serif text-2xl tracking-tight">
                  <Link href={`/projects/${project.slug}/`} className="after:absolute after:inset-0">
                    {project.title}
                  </Link>
                </h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted">{project.summary}</p>
              </div>
              <dl className={`mt-5 flex gap-8 ${i === 0 ? "md:mt-8" : ""}`}>
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="flex max-w-[11rem] flex-col-reverse justify-end">
                    <dt className="mt-1 text-xs leading-snug text-faint">{m.label}</dt>
                    <dd className="font-serif text-3xl tracking-tight text-ink">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Read the case study
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </p>
          </article>
        ))}
      </div>

      {otherWork.length > 0 && (
        <div className="mt-16 border-t border-rule pt-8">
          <Eyebrow>Also</Eyebrow>
          <ul className="mt-4 space-y-4">
            {otherWork.map((w) => (
              <li key={w.title} className="grid gap-x-10 gap-y-1 md:grid-cols-[10rem_1fr]">
                <p className="font-mono text-xs leading-6 text-faint">{w.period}</p>
                <p className="max-w-2xl leading-relaxed text-muted">
                  <span className="font-medium text-ink">{w.title}.</span> {w.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Section>
  );
}

function ResearchSection() {
  return (
    <Section id="research" label="Research" title="Publications">
      <ul className="space-y-10">
        {publications.map((pub) => (
          <li key={pub.title} className="grid gap-x-10 gap-y-2 md:grid-cols-[10rem_1fr]">
            <p className="font-mono text-xs leading-7 text-faint">
              {pub.venue}
              <br className="hidden md:block" />
              <span className="md:hidden"> · </span>
              {pub.year}
            </p>
            <div className="max-w-2xl">
              <h3 className="font-serif text-xl leading-snug tracking-tight">
                <a href={pub.href} className="decoration-rule underline-offset-4 hover:underline">
                  {pub.title}
                  <ArrowUpRight className="ml-1 inline size-4 align-baseline text-faint" />
                </a>
              </h3>
              <p className="mt-1 text-sm text-faint">{pub.role}</p>
              <p className="mt-3 leading-relaxed text-muted">{pub.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function BackgroundSection() {
  return (
    <Section id="background" label="Background" title="Education and skills">
      <div className="grid gap-14 md:grid-cols-2">
        <ul className="space-y-8">
          {education.map((e) => (
            <li key={e.institution}>
              <p className="font-mono text-xs text-faint">
                {e.start} – {e.end}
              </p>
              <h3 className="mt-1 text-lg font-medium">{e.institution}</h3>
              <p className="text-muted">{e.qualification}</p>
              {e.detail && <p className="mt-2 text-sm leading-relaxed text-faint">{e.detail}</p>}
            </li>
          ))}
        </ul>
        <dl className="space-y-6">
          {skills.map((group) => (
            <div key={group.name}>
              <dt className="font-mono text-xs text-faint uppercase">{group.name}</dt>
              <dd>
                <Tags items={group.items} className="mt-2" />
              </dd>
            </div>
          ))}
          <div>
            <dt className="font-mono text-xs text-faint uppercase">Languages</dt>
            <dd className="mt-2 text-sm text-muted">{languages}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="border-t border-rule py-20 sm:py-28">
      <Eyebrow>Contact</Eyebrow>
      <h2 className="mt-3 max-w-2xl font-serif text-4xl tracking-tight text-balance sm:text-5xl">
        Let&apos;s talk about what you&apos;re building.
      </h2>
      <p className="mt-6">
        <a
          href={`mailto:${profile.email}`}
          className="font-serif text-2xl text-accent underline decoration-accent/30 underline-offset-[6px] transition-colors hover:decoration-accent sm:text-3xl"
        >
          {profile.email}
        </a>
      </p>
    </section>
  );
}
