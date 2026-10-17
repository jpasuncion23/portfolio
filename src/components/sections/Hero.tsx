import { contact, hero, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, DownloadIcon, MapPinIcon, contactIcons } from "@/components/ui/icons";

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-16">
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute top-20 left-1/2 -z-10 h-72 w-xl max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-3xl"
      />

      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <p className="inline-flex animate-fade-up flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl border border-border bg-surface/60 px-3 py-1 text-xs text-muted sm:rounded-full">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
            <span aria-hidden="true" className="hidden text-border sm:inline">
              |
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPinIcon className="size-3.5" />
              {profile.location}
            </span>
          </p>

          <p className="mt-8 animate-fade-up font-mono text-sm text-accent [animation-delay:80ms]">{hero.greeting}</p>
          <h1 className="mt-3 animate-fade-up text-4xl font-semibold tracking-tight text-balance [animation-delay:140ms] sm:text-5xl lg:text-6xl">
            {profile.name}
            <span className="mt-1 block text-muted">{profile.title}</span>
          </h1>
          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-muted [animation-delay:200ms] sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:260ms] sm:flex-row sm:flex-wrap">
            <Button href="#work">
              {hero.buttons.work}
              <ArrowRightIcon />
            </Button>
            <Button href="#contact" variant="outline">
              {hero.buttons.contact}
            </Button>
            <Button href={profile.cvPath} variant="ghost">
              <DownloadIcon />
              {hero.buttons.cv}
            </Button>
          </div>

          <ul className="mt-10 flex animate-fade-up items-center gap-2 [animation-delay:320ms]">
            {contact.map((link) => {
              const Icon = contactIcons[link.icon];
              const external = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    aria-label={link.label}
                    title={link.label}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="grid size-11 place-items-center rounded-lg border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground sm:size-10"
                  >
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <CodeCard className="hidden animate-fade-up [animation-delay:380ms] sm:block" />
      </Container>
    </section>
  );
}

type Token = [text: string, className?: string];

const punct = "text-muted";
const key = "text-sky-300";
const str = "text-amber-200";
const keyword = "text-violet-300";

function quoted(value: string): Token {
  return [`"${value}"`, str];
}

/** A small editor window that describes you as a TypeScript object. */
function CodeCard({ className }: { className?: string }) {
  const lines: Token[][] = [
    [["const ", keyword], ["developer"], [" = {", punct]],
    [["  name", key], [": ", punct], quoted(profile.name), [",", punct]],
    [["  role", key], [": ", punct], quoted(profile.title), [",", punct]],
    [["  location", key], [": ", punct], quoted(profile.location), [",", punct]],
    [["  stack", key], [": [", punct]],
    ...hero.stack.map((item): Token[] => [["    "], quoted(item), [",", punct]]),
    [["  ]", punct], [",", punct]],
    [["  available", key], [": ", punct], [String(Boolean(profile.availability)), keyword], [",", punct]],
    [["};", punct]],
  ];

  return (
    <div className={cn("relative", className)}>
      <div aria-hidden="true" className="absolute -inset-px rounded-2xl bg-linear-to-br from-accent/40 via-border/40 to-transparent" />
      <div className="relative overflow-hidden rounded-2xl bg-surface shadow-2xl shadow-black/40">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="size-3 rounded-full bg-surface-2 ring-1 ring-border" />
          <span className="size-3 rounded-full bg-surface-2 ring-1 ring-border" />
          <span className="size-3 rounded-full bg-surface-2 ring-1 ring-border" />
          <span className="ml-2 font-mono text-xs text-muted">developer.ts</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
          <code>
            {lines.map((line, i) => (
              <span key={i} className="block">
                <span aria-hidden="true" className="mr-5 inline-block w-4 text-right text-muted/40 select-none">
                  {i + 1}
                </span>
                {line.map(([text, tokenClass], j) => (
                  <span key={j} className={tokenClass}>
                    {text}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
