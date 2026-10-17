import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

type SectionProps = {
  id: string;
  /** Small uppercase label above the title. */
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

/** Page section with an animated heading block. Every section below the hero uses this. */
export function Section({ id, eyebrow, title, description, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("border-t border-border/60 py-20 sm:py-28", className)}>
      <Container>
        <Reveal className="max-w-2xl">
          {eyebrow && <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{eyebrow}</p>}
          <h2 id={`${id}-title`} className="mt-2 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
        </Reveal>
        {children && <div className="mt-10 sm:mt-12">{children}</div>}
      </Container>
    </section>
  );
}
