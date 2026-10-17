import { projects, skills, skillsSection } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/** Projects whose tech list includes any skill in the group. */
function projectsUsing(groupSkills: string[]) {
  return projects.filter((project) => project.tech.some((tech) => groupSkills.includes(tech))).map((project) => project.name);
}

export default function Skills() {
  return (
    <Section id="skills" eyebrow={skillsSection.eyebrow} title={skillsSection.title} description={skillsSection.description}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, index) => {
          const usedIn = projectsUsing(group.skills);
          // Stretch the last card across any empty columns so the grid's last row has no gap.
          const isLast = index === skills.length - 1;
          return (
            <Reveal
              key={group.category}
              delay={Math.min(index, 5) * 60}
              className={cn(
                "h-full",
                isLast && skills.length % 2 === 1 && "sm:col-span-2",
                // Two columns' worth on wide screens if the last row has one gap, otherwise back to one.
                isLast && skills.length % 2 === 1 && (skills.length % 3 === 2 ? "lg:col-span-2" : "lg:col-span-1"),
                isLast && skills.length % 2 === 0 && skills.length % 3 === 2 && "lg:col-span-2",
              )}
            >
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-accent/40">
                <h3 className="text-lg font-semibold">{group.category}</h3>
                {group.description && <p className="mt-1 text-sm text-muted">{group.description}</p>}

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill} className="rounded-md border border-border bg-background/60 px-2.5 py-1 text-sm">
                      {skill}
                    </li>
                  ))}
                </ul>

                {usedIn.length > 0 && (
                  <p className="mt-auto pt-5 text-xs text-muted">
                    <span className="font-semibold tracking-[0.14em] uppercase">{skillsSection.usedIn}</span>
                    <span className="mx-2 text-border">|</span>
                    {usedIn.join(" · ")}
                  </p>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
