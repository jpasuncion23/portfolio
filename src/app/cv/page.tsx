import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { contact, cv, education, experience, profile, projects, skills } from "@/lib/data";
import { displayUrl } from "@/lib/utils";
import { PrintButton } from "@/components/cv/PrintButton";
import { ArrowRightIcon } from "@/components/ui/icons";

const description = `CV of ${profile.name}, ${cv.headline}, based in ${profile.location}.`;

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

const cvLinks = [
  ...contact.filter((link) => link.showOnCv !== false),
  { label: "Website", href: profile.siteUrl },
];

function dateRange(start?: string, end?: string) {
  if (!start) return end ?? "";
  if (!end || start === end) return start;
  return `${start} – ${end}`;
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

      {/* Slightly tighter line height when printing so it fits one US Letter page as well as A4. */}
      <article className="mx-auto max-w-[210mm] rounded-sm bg-white p-6 text-[13px] leading-relaxed text-zinc-700 shadow-2xl shadow-black/50 sm:p-[14mm] print:max-w-none print:rounded-none print:p-0 print:leading-normal print:shadow-none">
        <header className="flex flex-col gap-4 border-b-2 border-teal-600 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900">{profile.name}</h1>
            <p className="mt-0.5 text-base font-medium text-teal-700">{cv.headline}</p>
            <p className="text-zinc-500">{profile.location}</p>
          </div>
          <ul className="space-y-0.5 text-zinc-600 sm:text-right">
            {cvLinks.map((link) => (
              <li key={link.label}>
                <span className="sr-only">{link.label}: </span>
                <a href={link.href} className="hover:text-teal-700">
                  {displayUrl(link.href)}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <CvSection title="Summary" className="mt-5">
          <p>{cv.summary}</p>
        </CvSection>

        <div className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-[1fr_30%]">
          <div className="space-y-5">
            <CvSection title="Education">
              <div className="space-y-3">
                {education.map((school) => (
                  <div key={`${school.school}-${school.degree}`} className="break-inside-avoid">
                    <EntryHeading title={school.degree} date={dateRange(school.start, school.end) || school.status || ""} />
                    <p className="text-zinc-500">{school.school}</p>
                    {school.details && <p className="mt-1">{school.details}</p>}
                  </div>
                ))}
              </div>
            </CvSection>

            {/* Only shown once there's real experience in data.ts. */}
            {experience.length > 0 && (
              <CvSection title="Experience">
                <div className="space-y-4">
                  {experience.map((job) => (
                    <div key={`${job.company}-${job.position}`} className="break-inside-avoid">
                      <EntryHeading title={job.position} date={dateRange(job.start, job.end)} />
                      <p className="text-zinc-500">
                        {job.company}
                        {job.location && ` · ${job.location}`}
                      </p>
                      <BulletList items={job.points} />
                    </div>
                  ))}
                </div>
              </CvSection>
            )}

            <CvSection title="Projects">
              <div className="space-y-4 print:space-y-3">
                {cvProjects.map((project) => {
                  const href = project.link ?? project.repo;
                  return (
                    <div key={project.name} className="break-inside-avoid">
                      <EntryHeading title={project.name} date={project.role} />
                      <p>{project.description}</p>
                      <BulletList items={project.highlights.slice(0, cv.projectHighlights)} />
                      <p className="mt-1 text-zinc-500">
                        {project.tech.join(" · ")}
                        {href && (
                          <>
                            {" · "}
                            <a href={href} className="text-teal-700">
                              {displayUrl(href)}
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-zinc-400">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
