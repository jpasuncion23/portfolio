import Image from "next/image";
import { workSection, type Project } from "@/lib/data";
import { displayUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckIcon, ExternalLinkIcon, GitHubIcon } from "@/components/ui/icons";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group grid overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors duration-300 hover:border-accent/40 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      <ProjectCover project={project} />

      <div className="flex flex-col p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-0.5 font-mono text-accent">
            {project.category}
          </span>
          <span className="text-muted">{project.role}</span>
        </div>

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
            <li key={tech} className="rounded-md border border-border bg-background/60 px-2.5 py-1 font-mono text-xs text-muted">
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
 * The card's visual: the project's screenshot framed as a browser window (web)
 * or an app window (mobile), or a sketched mockup when there's no screenshot.
 */
function ProjectCover({ project }: { project: Project }) {
  return (
    <div
      aria-hidden={project.image ? undefined : true}
      className="relative isolate flex min-h-60 items-center justify-center overflow-hidden border-b border-border bg-surface-2/50 p-5 sm:min-h-72 sm:p-10 lg:border-r lg:border-b-0"
    >
      <div className="bg-grid absolute inset-0 -z-10 opacity-70" />
      <div className="absolute -z-10 size-64 rounded-full bg-accent/15 blur-3xl transition-transform duration-700 group-hover:scale-125" />
      <div className="flex w-full justify-center transition-transform duration-500 group-hover:-translate-y-1">
        {project.image ? (
          <Screenshot project={project} src={project.image} />
        ) : project.category === "Mobile" ? (
          <PhoneMock project={project} />
        ) : (
          <BrowserMock project={project} />
        )}
      </div>
    </div>
  );
}

function Screenshot({ project, src }: { project: Project; src: string }) {
  // width/height 0 + w-full h-auto keeps each screenshot's own aspect ratio.
  const image = (
    <Image
      src={src}
      alt={`Screenshot of ${project.name}`}
      width={0}
      height={0}
      sizes="(min-width: 1024px) 40vw, 90vw"
      className="h-auto w-full"
    />
  );

  if (project.category === "Mobile") {
    return (
      <div className="w-full max-w-72 rounded-[1.25rem] border border-border bg-background p-1.5 shadow-2xl shadow-black/50">
        <div className="overflow-hidden rounded-[0.9rem]">{image}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/50">
      <BrowserBar address={project.link ?? project.repo} />
      {image}
    </div>
  );
}

function BrowserBar({ address }: { address?: string }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-border px-3 py-2.5">
      <span className="size-2 shrink-0 rounded-full bg-border" />
      <span className="size-2 shrink-0 rounded-full bg-border" />
      <span className="size-2 shrink-0 rounded-full bg-border" />
      {address && (
        <span className="ml-2 truncate rounded-md bg-surface px-2 py-0.5 font-mono text-[10px] text-muted">
          {displayUrl(address)}
        </span>
      )}
    </div>
  );
}

function SkeletonLine({ className }: { className: string }) {
  return <div className={`h-2 rounded-full bg-border ${className}`} />;
}

function BrowserMock({ project }: { project: Project }) {
  return (
    <div className="w-72 max-w-full overflow-hidden rounded-xl border border-border bg-background/90 shadow-2xl shadow-black/50 sm:w-80">
      <BrowserBar address={project.link ?? project.repo} />
      <div className="p-5">
        <p className="font-mono text-[10px] text-accent">{`// ${project.category.toLowerCase()}`}</p>
        <p className="mt-1 truncate text-lg font-semibold">{project.name}</p>
        <div className="mt-3 space-y-2">
          <SkeletonLine className="w-full" />
          <SkeletonLine className="w-4/5" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-12 rounded-md border border-border bg-surface" />
          <div className="h-12 rounded-md border border-border bg-surface" />
          <div className="h-12 rounded-md border border-accent/30 bg-accent/10" />
        </div>
      </div>
    </div>
  );
}

function PhoneMock({ project }: { project: Project }) {
  return (
    <div className="w-40 rounded-[1.75rem] border border-border bg-background/90 p-2.5 shadow-2xl shadow-black/50">
      <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-border" />
      <div className="px-1.5">
        <p className="font-mono text-[9px] text-accent">{`// ${project.category.toLowerCase()}`}</p>
        <p className="mt-0.5 truncate text-sm font-semibold">{project.name}</p>
      </div>
      <div className="mt-3 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`rounded-lg border p-2 ${i === 0 ? "border-accent/30 bg-accent/10" : "border-border bg-surface"}`}>
            <SkeletonLine className="w-3/4" />
            <SkeletonLine className="mt-1.5 w-1/2" />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-around border-t border-border pt-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`size-1.5 rounded-full ${i === 0 ? "bg-accent" : "bg-border"}`} />
        ))}
      </div>
    </div>
  );
}
