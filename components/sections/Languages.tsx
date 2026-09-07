import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Languages() {
  return (
    <Section id="languages">
      <SectionHeading>Languages</SectionHeading>
      <div className="grid gap-6">
        {resume.languages.map((language) => (
          <article
            key={language.name}
            className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line"
          >
            <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-navy">{language.name}</h3>
              {language.period ? (
                <p className="text-sm font-semibold text-brand">{language.period}</p>
              ) : null}
            </div>
            <p className="text-sm font-medium uppercase tracking-wide text-brand">
              {language.level}
            </p>
            {language.description ? (
              <p className="mt-3 leading-relaxed text-muted">
                {language.description}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </Section>
  );
}
