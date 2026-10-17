import Image from "next/image";
import { categoryTypes, workSection, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckIcon, ExternalLinkIcon, GitHubIcon } from "@/components/ui/icons";

/** `reverse` puts the image on the right on wide screens, so a list of cards alternates. */
export function ProjectCard({ project, reverse = false }: { project: Project; reverse?: boolean }) {
  const meta = [
    { label: workSection.meta.type, value: categoryTypes[project.category] },
    { label: workSection.meta.role, value: project.role },
    { label: workSection.meta.stack, value: `${project.tech.length} technologies` },
  ];

  return (
    <article className="group grid overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors duration-300 hover:border-accent/40 lg:grid-cols-2">
      <div className={cn("border-b border-border p-5 sm:p-7 lg:border-b-0", reverse ? "lg:order-last lg:border-l" : "lg:border-r")}>
        <ProjectImage project={project} />

        <dl className="mt-5 grid divide-y divide-border rounded-xl border border-border text-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {meta.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-4 px-4 py-3 sm:block">
              <dt className="text-[11px] font-semibold tracking-[0.14em] text-muted uppercase">{item.label}</dt>
              <dd className="font-medium sm:mt-1">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col p-5 sm:p-8">
        <span className="self-start rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
          {project.category}
        </span>

        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

        <ul className="mt-5 space-y-2.5 text-sm leading-relaxed">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2.5">
              <CheckIcon className="mt-0.5 text-accent" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <li key={tech} className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-muted">
              {tech}
            </li>
          ))}
        </ul>

        {(project.link || project.repo) && (
          <div className="mt-auto flex flex-wrap gap-3 pt-7">
            {project.link && (
              <Button href={project.link} target="_blank" rel="noopener noreferrer" size="sm">
                {workSection.liveLabel}
                <ExternalLinkIcon />
              </Button>
            )}
            {project.repo && (
              <Button href={project.repo} target="_blank" rel="noopener noreferrer" variant="outline" size="sm">
                <GitHubIcon />
                {workSection.sourceLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

/**
 * 16:9 screenshot, cropped from the top so headers and hero areas stay in view.
 * Without a screenshot it shows the project name on the site's grid pattern.
 */
function ProjectImage({ project }: { project: Project }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-surface-2">
      {project.image ? (
        <Image
          src={project.image}
          alt={`Screenshot of ${project.name}`}
          fill
          quality={95}
          // Matches the rendered width (page gutter + card padding) so the browser picks a sharp enough file.
          sizes="(min-width: 1024px) 31rem, (min-width: 640px) calc(100vw - 6.5rem), calc(100vw - 4.75rem)"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        />
      ) : (
        <div aria-hidden="true" className="absolute inset-0 isolate grid place-items-center">
          <div className="bg-grid absolute inset-0 -z-10 opacity-70" />
          <div className="absolute -z-10 size-48 rounded-full bg-accent/10 blur-3xl" />
          <span className="px-6 text-center text-2xl font-semibold tracking-tight text-muted">{project.name}</span>
        </div>
      )}
    </div>
  );
}
