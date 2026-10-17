import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { contact, education, experience, profile, projects, skills } from "@/lib/data";
import { PrintButton } from "@/components/cv/PrintButton";
import { ArrowRightIcon } from "@/components/ui/icons";

const description = `CV of ${profile.name}, ${profile.title} based in ${profile.location}.`;

export const metadata: Metadata = {
  title: "CV",
  description,
  alternates: { canonical: "/cv" },
  // Setting openGraph here replaces the root one, so the shared image is re-listed.
  openGraph: {
    url: "/cv",
    title: `CV | ${profile.name}`,
    description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` }],
  },
};

// Featured projects keep the CV to one page; falls back to the first three.
const cvProjects = projects.some((project) => project.featured)
  ? projects.filter((project) => project.featured)
  : projects.slice(0, 3);

/** "https://www.github.com/me" -> "github.com/me", "mailto:a@b.c" -> "a@b.c". Reads well on paper. */
function printableUrl(href: string) {
  return href.replace(/^mailto:/, "").replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}

function dateRange(start: string, end: string) {
  return start === end ? start : `${start} – ${end}`;
}

/*
  The CV is a light "sheet of paper" on the dark site background. Its colors
  are fixed (not theme tokens) so it prints the same as it looks. Two columns
  use the sm breakpoint, which an A4 or Letter page width still reaches.
*/
export default function CvPage() {
  return (
    <main id="main" className="flex-1 px-4 py-6 sm:py-10 print:p-0">
      <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-3 print:hidden">
        <Link href="/" className="inline-flex h-10 items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
          <ArrowRightIcon className="rotate-180" />
          Back to portfolio
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-[210mm] rounded-sm bg-white p-6 text-[13px] leading-relaxed text-zinc-700 shadow-2xl shadow-black/50 sm:p-[14mm] print:max-w-none print:rounded-none print:p-0 print:shadow-none">
        <header className="flex flex-col gap-4 border-b-2 border-teal-600 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{profile.name}</h1>
            <p className="mt-0.5 text-base font-medium text-teal-700">{profile.title}</p>
            <p className="text-zinc-500">{profile.location}</p>
          </div>
          <ul className="space-y-0.5 text-zinc-600 sm:text-right">
            {[...contact, { label: "Website", href: profile.siteUrl }].map((link) => (
              <li key={link.label}>
                <span className="sr-only">{link.label}: </span>
                <a href={link.href} className="hover:text-teal-700">
                  {printableUrl(link.href)}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <CvSection title="Summary" className="mt-5">
          <p>{profile.intro}</p>
        </CvSection>

        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-[1fr_32%]">
          <div className="space-y-5">
            <CvSection title="Experience">
              <div className="space-y-4">
                {experience.map((job) => (
                  <div key={`${job.company}-${job.position}`} className="break-inside-avoid">
                    <EntryHeading title={job.position} date={dateRange(job.start, job.end)} />
                    <p className="text-zinc-500">
                      {job.company}
                      {job.location && ` · ${job.location}`}
                    </p>
                    <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-zinc-400">
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </CvSection>

            <CvSection title="Projects">
              <div className="space-y-3.5">
                {cvProjects.map((project) => {
                  const href = project.link ?? project.repo;
                  return (
                    <div key={project.name} className="break-inside-avoid">
                      <EntryHeading title={project.name} date={project.role} />
                      <p>{project.description}</p>
                      <p className="mt-0.5 text-zinc-500">
                        {project.tech.join(" · ")}
                        {href && (
                          <>
                            {" · "}
                            <a href={href} className="text-teal-700">
                              {printableUrl(href)}
                            </a>
                          </>
                        )}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CvSection>
          </div>

          <div className="space-y-5">
            <CvSection title="Skills">
              <dl className="space-y-2.5">
                {skills.map((group) => (
                  <div key={group.category} className="break-inside-avoid">
                    <dt className="font-semibold text-zinc-900">{group.category}</dt>
                    <dd>{group.skills.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </CvSection>

            <CvSection title="Education">
              <div className="space-y-3">
                {education.map((school) => (
                  <div key={`${school.school}-${school.degree}`} className="break-inside-avoid">
                    <p className="font-semibold text-zinc-900">{school.degree}</p>
                    <p>{school.school}</p>
                    <p className="text-zinc-500">{dateRange(school.start, school.end)}</p>
                    {school.details && <p className="mt-1">{school.details}</p>}
                  </div>
                ))}
              </div>
            </CvSection>
          </div>
        </div>
      </article>
    </main>
  );
}

function CvSection({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <section className={className}>
      <h2 className="mb-2 border-b border-zinc-200 pb-1 text-[11px] font-semibold tracking-[0.14em] text-teal-700 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

function EntryHeading({ title, date }: { title: string; date: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
      <h3 className="font-semibold text-zinc-900">{title}</h3>
      <span className="text-xs text-zinc-500 tabular-nums">{date}</span>
    </div>
  );
}
