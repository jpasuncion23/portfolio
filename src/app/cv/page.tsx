import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { contact, cv, education, experience, profile, projects, skills } from "@/lib/data";
import { displayUrl, getInitials } from "@/lib/utils";
import { PrintButton } from "@/components/cv/PrintButton";
import { ArrowRightIcon, MapPinIcon, PhoneIcon, contactIcons } from "@/components/ui/icons";

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

// Email first, then phone, then the other links (Instagram is left off via showOnCv).
const cvContacts = contact
  .filter((link) => link.showOnCv !== false)
  .map((link) => ({ label: link.label, href: link.href, text: displayUrl(link.href), Icon: contactIcons[link.icon] }));
const contactRows = [
  ...cvContacts.slice(0, 1),
  { label: "Phone", href: profile.phone.href, text: profile.phone.display, Icon: PhoneIcon },
  ...cvContacts.slice(1),
];

function dateRange(start?: string, end?: string) {
  if (!start) return end ?? "";
  if (!end || start === end) return start;
  return `${start} – ${end}`;
}

/*
  Two-tone CV: a dark header band with the photo (or initials), a light
  sidebar for contact, education and skills, and a main column for the
  summary and projects. Colors are fixed, not theme tokens, and
  print-color-adjust keeps the backgrounds when printing.
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

      <article className="mx-auto flex max-w-[210mm] flex-col overflow-hidden bg-white text-[12.5px] leading-relaxed text-zinc-700 shadow-2xl shadow-black/50 [print-color-adjust:exact] print:min-h-screen print:max-w-none print:text-[12px] print:leading-normal print:shadow-none">
        <header className="grid bg-[#33363d] text-white sm:grid-cols-[34%_1fr]">
          <div className="flex items-center justify-center px-6 pt-8 sm:py-8 print:py-5">
            <Avatar />
          </div>
          <div className="flex flex-col justify-center px-6 pt-4 pb-8 text-center sm:py-8 sm:pr-10 sm:pl-2 sm:text-left print:py-5">
            <h1 className="text-[32px] leading-tight font-light tracking-tight">{profile.name}</h1>
            <p className="mt-2 text-[15px] text-white/80">{cv.headline}</p>
          </div>
        </header>

        <div className="grid flex-1 sm:grid-cols-[34%_1fr]">
          <aside className="relative space-y-7 bg-[#ede8e3] px-7 pt-8 pb-8 sm:pt-14 print:space-y-6 print:pt-12">
            {/* The header band points down into the sidebar (overlaps the header by 2px to avoid a seam). */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-0.5 hidden h-[38px] bg-[#33363d] [clip-path:polygon(0_0,100%_0,50%_100%)] sm:block"
            />

            <SideSection title="Contact Details">
              <ul className="space-y-2.5">
                {contactRows.map(({ label, href, text, Icon }) => (
                  <li key={label} className="flex items-start gap-2.5">
                    <IconDot>
                      <Icon className="size-3" />
                    </IconDot>
                    {/* break-words wraps long links at hyphens/slashes instead of mid-word. */}
                    <a href={href} className="min-w-0 pt-px break-words text-zinc-700 hover:text-zinc-950">
                      <span className="sr-only">{label}: </span>
                      {text}
                    </a>
                  </li>
                ))}
                <li className="flex items-start gap-2.5">
                  <IconDot>
                    <MapPinIcon className="size-3" />
                  </IconDot>
                  <span className="pt-px">{profile.location}</span>
                </li>
              </ul>
            </SideSection>

            <SideSection title="Education">
              <ul className="space-y-4">
                {education.map((school) => (
                  <li key={`${school.school}-${school.degree}`} className="relative border-l-2 border-zinc-400 pl-4">
                    <span aria-hidden="true" className="absolute top-1 -left-[7px] size-3 rounded-full bg-[#33363d]" />
                    <p className="font-semibold text-zinc-900">{school.degree}</p>
                    <p>{school.school}</p>
                    <p className="text-zinc-500">{dateRange(school.start, school.end) || school.status}</p>
                    {school.details && <p className="mt-1">{school.details}</p>}
                  </li>
                ))}
              </ul>
            </SideSection>

            <SideSection title="Skills">
              <dl className="space-y-2.5">
                {skills.map((group) => (
                  <div key={group.category} className="break-inside-avoid">
                    <dt className="font-semibold text-zinc-900">{group.category}</dt>
                    <dd>{group.skills.join(", ")}</dd>
                  </div>
                ))}
              </dl>
            </SideSection>
          </aside>

          <div className="space-y-6 px-7 py-8 sm:px-9 print:space-y-5 print:py-6">
            <MainSection title="Summary">
              <p>{cv.summary}</p>
            </MainSection>

            {/* Only shown once there's real experience in data.ts. */}
            {experience.length > 0 && (
              <MainSection title="Work Experience">
                <div className="space-y-4">
                  {experience.map((job) => (
                    <div key={`${job.company}-${job.position}`} className="break-inside-avoid">
                      <h3 className="font-semibold text-zinc-900">
                        {job.position}, {job.company}
                      </h3>
                      <p className="text-zinc-500">
                        {dateRange(job.start, job.end)}
                        {job.location && ` · ${job.location}`}
                      </p>
                      <BulletList items={job.points} />
                    </div>
                  ))}
                </div>
              </MainSection>
            )}

            <MainSection title="Projects">
              <div className="space-y-4 print:space-y-2.5">
                {cvProjects.map((project) => {
                  const href = project.link ?? project.repo;
                  return (
                    <div key={project.name} className="break-inside-avoid">
                      <h3 className="font-semibold text-zinc-900">{project.name}</h3>
                      <p className="text-zinc-500">
                        {project.role}
                        {href && (
                          <>
                            {" · "}
                            <a href={href} className="text-teal-700">
                              {displayUrl(href)}
                            </a>
                          </>
                        )}
                      </p>
                      <p className="mt-1">{project.description}</p>
                      <BulletList items={project.highlights.slice(0, cv.projectHighlights)} />
                      <p className="mt-1 text-zinc-500">
                        <span className="font-medium text-zinc-700">Tech: </span>
                        {project.tech.join(", ")}
                      </p>
                    </div>
                  );
                })}
              </div>
            </MainSection>

            {cv.references && (
              <MainSection title="References">
                <p>{cv.references}</p>
              </MainSection>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}

/** Photo if `profile.photo` is set, otherwise initials, in a ringed circle. */
function Avatar() {
  const ring = "size-[30mm] max-w-32 max-h-32 rounded-full ring-4 ring-white/15";
  if (profile.photo) {
    return <Image src={profile.photo} alt={profile.name} width={240} height={240} className={`${ring} object-cover`} />;
  }
  return (
    <div aria-hidden="true" className={`${ring} grid place-items-center bg-[#4a4e57] text-4xl font-light tracking-wide`}>
      {getInitials(profile.name)}
    </div>
  );
}

function IconDot({ children }: { children: ReactNode }) {
  return <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#33363d] text-white">{children}</span>;
}

function SideSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-[17px] font-semibold text-zinc-800">{title}</h2>
      {children}
    </section>
  );
}

function MainSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 border-b-2 border-zinc-800 pb-1 text-[17px] font-semibold text-zinc-900">{title}</h2>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-1 list-disc space-y-0.5 pl-4 marker:text-zinc-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
