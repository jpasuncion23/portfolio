import { workSection } from "@/lib/data";
import { Section } from "@/components/ui/Section";
import { ProjectList } from "@/components/work/ProjectList";

export default function Work() {
  return (
    <Section id="work" eyebrow={workSection.eyebrow} title={workSection.title} description={workSection.description}>
      <ProjectList />
    </Section>
  );
}
