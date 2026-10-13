import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Process() {
  return (
    <Section id="proceso">
      <SectionHeading eyebrow="Sin sorpresas">Proceso</SectionHeading>
      <ol className="grid gap-5 sm:grid-cols-2">
        {resume.process.map((item) => (
          <li key={item.step} className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line">
            <p className="font-display text-2xl font-bold text-brand">{item.step}</p>
            <h3 className="mt-2 text-lg font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{item.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
