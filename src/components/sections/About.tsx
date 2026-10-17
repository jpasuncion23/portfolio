import { about, navCta, profile, stats } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ArrowRightIcon } from "@/components/ui/icons";

export default function About() {
  return (
    <Section id="about" eyebrow={about.eyebrow} title={about.heading}>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {about.paragraphs.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "text-foreground" : undefined}>
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={80} className="mt-12">
            <h3 className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{about.focusTitle}</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {about.focus.map((item) => (
                <li key={item.title} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <p className="font-semibold">{item.title}</p>
                  <div>
                    <p className="text-muted">{item.description}</p>
                    <p className="mt-2 text-sm text-accent">{item.tech}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="space-y-6">
          <Reveal delay={120}>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {stats.map((stat) => (
                // Label first for valid <dl> markup; column-reverse shows the number on top,
                // and justify-end keeps it pinned to the top of the cell.
                <div key={stat.label} className="flex flex-col-reverse justify-end bg-surface p-5 sm:p-6">
                  <dt className="mt-2 text-sm text-muted">{stat.label}</dt>
                  <dd className="text-4xl font-semibold tracking-tight sm:text-5xl">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={180}>
            <div className="rounded-2xl border border-border bg-surface/60 p-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">{about.availabilityTitle}</p>
              <p className="mt-3 flex items-center gap-2 text-lg font-semibold">
                <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
                {profile.availability}
              </p>
              <p className="mt-1 text-sm text-muted">{profile.location}</p>
              <Button href="#contact" variant="outline" size="sm" className="mt-5">
                {navCta}
                <ArrowRightIcon />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
