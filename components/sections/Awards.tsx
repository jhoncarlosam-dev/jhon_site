import { FaTrophy } from "react-icons/fa";
import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Awards() {
  return (
    <Section id="awards">
      <SectionHeading>Awards & Certifications</SectionHeading>
      <ul className="space-y-3">
        {resume.awards.map((award) => (
          <li
            key={award}
            className="flex items-start gap-3 rounded-xl bg-card px-4 py-4 shadow-sm ring-1 ring-line"
          >
            <FaTrophy className="mt-0.5 shrink-0 text-amber-500" />
            <span className="text-ink">{award}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
