"use client";

import { useState } from "react";
import { projectCategories, projects, workSection, type ProjectCategory } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/work/ProjectCard";

type Filter = "All" | ProjectCategory;

// Featured projects first, otherwise in the order they appear in data.ts.
const ordered = [...projects].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));

/** Filter tabs plus the project cards they control. */
export function ProjectList() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? ordered : ordered.filter((project) => project.category === filter);

  const tabs: { value: Filter; label: string; count: number }[] = [
    { value: "All", label: workSection.filterAll, count: projects.length },
    ...projectCategories.map((category) => ({
      value: category,
      label: category,
      count: projects.filter((project) => project.category === category).length,
    })),
  ];

  return (
    <>
      <Reveal>
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const selected = filter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(tab.value)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors",
                  selected
                    ? "border-accent/50 bg-accent/10 text-foreground"
                    : "border-border text-muted hover:border-accent/30 hover:text-foreground",
                )}
              >
                {tab.label}
                <span className={cn("text-xs tabular-nums", selected ? "text-accent" : "text-muted/70")}>{tab.count}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <p aria-live="polite" className="sr-only">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <div className="mt-8 space-y-6 sm:space-y-8">
        {visible.map((project, index) => (
          <Reveal key={project.name} delay={Math.min(index, 3) * 80}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
