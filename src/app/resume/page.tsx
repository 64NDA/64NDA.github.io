import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Download } from "@/components/icons";
import { PrintButton } from "@/components/print-button";
import { ButtonLink } from "@/components/ui";
import { experience } from "@/content/experience";
import { education, languages, ogImage, profile, site, skills } from "@/content/profile";
import { otherWork, projects } from "@/content/projects";
import { publications } from "@/content/publications";
import type { Experience } from "@/content/types";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name}: experience, projects, research and skills.`,
  alternates: { canonical: "/resume/" },
  openGraph: { title: `Resume · ${profile.name}`, url: "/resume/", images: [ogImage] },
};

// The web resume is rendered from the same content files as the home page, and prints to a
// clean document. The downloadable PDF is the hand-tailored version from Word.
export default function ResumePage() {
  const industry = experience.filter((e) => e.kind === "industry");
  const research = experience.filter((e) => e.kind === "research");

  return (
    <div className="mx-auto max-w-3xl px-5 pt-12 pb-20 sm:px-8 print:max-w-none print:p-0 print:text-[10pt]">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4 print:hidden">
        <p className="text-sm text-muted">The same content as a web page. The PDF is the printable original.</p>
        <div className="flex gap-2">
          <PrintButton />
          <ButtonLink href={profile.resumePdf} variant="primary" download>
            <Download className="size-4" /> PDF
          </ButtonLink>
        </div>
      </div>

      <header className="border-b border-rule pb-6 print:pb-3">
        <h1 className="font-serif text-4xl tracking-tight print:text-[20pt]">{profile.name}</h1>
        <p className="mt-2 text-sm text-muted">
          {profile.location} · <a href={`mailto:${profile.email}`} className="hover:text-ink">{profile.email}</a> ·{" "}
          <a href={site.url} className="hover:text-ink">{site.url.replace("https://", "")}</a>
        </p>
        <p className="mt-1 text-sm text-muted">
          {profile.links
            .filter((l) => l.href.startsWith("https://"))
            .map((l) => l.href.replace("https://", "").replace("www.", ""))
            .join(" · ")}
        </p>
      </header>

      <ResumeSection title="Education">
        {education.map((e) => (
          <Entry key={e.institution} title={e.institution} meta={`${e.start} – ${e.end}`} sub={`${e.qualification} · ${e.location}`}>
            {e.detail && <p className="text-sm text-muted">{e.detail}</p>}
          </Entry>
        ))}
      </ResumeSection>

      <ResumeSection title="Experience">
        {industry.map((job) => (
          <JobEntry key={job.organisation} job={job} />
        ))}
      </ResumeSection>

      <ResumeSection title="Research">
        {research.map((job) => (
          <JobEntry key={job.organisation} job={job} />
        ))}
      </ResumeSection>

      <ResumeSection title="Projects">
        {projects.map((p) => (
          <Entry key={p.slug} title={p.title} meta={p.period} sub={p.tagline}>
            <ul className="list-disc space-y-1 pl-5 text-sm text-muted marker:text-faint">
              {p.results.slice(0, 2).map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Entry>
        ))}
        {otherWork.map((w) => (
          <Entry key={w.title} title={w.title} meta={w.period}>
            <p className="text-sm text-muted">{w.description}</p>
          </Entry>
        ))}
      </ResumeSection>

      <ResumeSection title="Publications">
        {publications.map((p) => (
          <Entry key={p.title} title={p.title} meta={p.venue} sub={p.role}>
            <a href={p.href} className="text-sm break-all text-faint hover:text-ink">
              {p.href.replace("https://", "")}
            </a>
          </Entry>
        ))}
      </ResumeSection>

      <ResumeSection title="Skills">
        <dl className="space-y-1.5 text-sm">
          {skills.map((g) => (
            <div key={g.name} className="grid gap-x-4 sm:grid-cols-[8rem_1fr]">
              <dt className="font-medium">{g.name}</dt>
              <dd className="text-muted">{g.items.join(", ")}</dd>
            </div>
          ))}
          <div className="grid gap-x-4 sm:grid-cols-[8rem_1fr]">
            <dt className="font-medium">Languages</dt>
            <dd className="text-muted">{languages}</dd>
          </div>
        </dl>
      </ResumeSection>
    </div>
  );
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-rule py-7 last:border-0 print:break-inside-auto print:py-3">
      <h2 className="mb-5 font-mono text-xs tracking-wide text-faint uppercase print:mb-2">{title}</h2>
      <div className="space-y-6 print:space-y-3">{children}</div>
    </section>
  );
}

function Entry({ title, meta, sub, children }: { title: string; meta: string; sub?: string; children?: ReactNode }) {
  return (
    <div className="print:break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h3 className="font-medium">{title}</h3>
        <p className="font-mono text-xs text-faint">{meta}</p>
      </div>
      {sub && <p className="text-sm text-faint italic">{sub}</p>}
      {children && <div className="mt-2">{children}</div>}
    </div>
  );
}

function JobEntry({ job }: { job: Experience }) {
  return (
    <Entry title={`${job.organisation} · ${job.role}`} meta={`${job.start} – ${job.end}`} sub={job.location}>
      <p className="mb-1.5 text-sm text-ink">{job.summary}</p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted marker:text-faint">
        {job.highlights.map((h) => (
          <li key={h}>{h}</li>
        ))}
      </ul>
    </Entry>
  );
}
