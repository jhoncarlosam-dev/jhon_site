import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Interests() {
  return (
    <Section id="interests">
      <SectionHeading>Interests</SectionHeading>
      <div className="space-y-4 text-lg leading-relaxed text-muted">
        {resume.interests.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
