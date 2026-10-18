import Image from "next/image";
import { about, contact, contactSection, hero, profile } from "@/lib/data";
import { cn, contactHref, getInitials } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, DownloadIcon, MapPinIcon, contactIcons } from "@/components/ui/icons";

export default function Hero() {
  return (
    // The dots and glows behind the hero come from SiteBackground in the (site) layout.
    <section id="top" className="relative pt-16">
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <h1 className="animate-fade-up text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {profile.name}
            <span className="mt-2 block text-muted">{profile.title}</span>
          </h1>

          {/* On phones the profile card is hidden, so its key details appear here instead. */}
          <p className="mt-5 flex animate-fade-up flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted [animation-delay:60ms] sm:hidden">
            <span className="inline-flex items-center gap-1.5">
              <MapPinIcon className="size-3.5" />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-accent" />
              {profile.availability}
            </span>
          </p>

          <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-muted [animation-delay:120ms] sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-8 flex animate-fade-up flex-col gap-3 [animation-delay:180ms] sm:flex-row sm:flex-wrap">
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

          <ul className="mt-10 flex animate-fade-up items-center gap-2 [animation-delay:240ms]">
            {contact.map((link) => {
              const Icon = contactIcons[link.icon];
              const href = contactHref(link, contactSection.emailSubject);
              const external = href.startsWith("http");
              return (
                <li key={link.label}>
                  <a
                    href={href}
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

        <ProfileCard className="hidden animate-fade-up [animation-delay:300ms] sm:block" />
      </Container>
    </section>
  );
}

/** Summary card beside the headline: photo or initials, key facts, and core stack. */
function ProfileCard({ className }: { className?: string }) {
  const facts = [
    { label: hero.card.location, value: profile.location },
    { label: hero.card.availability, value: profile.availability, status: true },
    ...about.facts,
  ];

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-2xl border border-border bg-surface/90 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:ml-auto",
        className,
      )}
    >
      <div className="flex items-center gap-4">
        {profile.photo ? (
          <Image
            src={profile.photo}
            alt={profile.name}
            width={64}
            height={64}
            className="size-16 rounded-xl border border-border object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 text-xl font-semibold text-accent"
          >
            {getInitials(profile.name)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold">{profile.name}</p>
          <p className="truncate text-sm text-muted">{profile.title}</p>
        </div>
      </div>

      <dl className="mt-6 divide-y divide-border border-y border-border text-sm">
        {facts.map((fact) => (
          <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3">
            <dt className="shrink-0 text-muted">{fact.label}</dt>
            <dd className="flex items-center gap-2 text-right font-medium">
              {"status" in fact && <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />}
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-muted uppercase">{hero.card.stack}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {hero.stack.map((item) => (
          <li key={item} className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-xs text-muted">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
