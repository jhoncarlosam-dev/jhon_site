import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Experience() {
  return (
    <Section id="experiencia">
      <SectionHeading eyebrow="De dónde vengo">Experiencia</SectionHeading>
      <ol className="relative space-y-8 border-l border-line pl-6">
        {resume.experience.map((job) => (
          <li key={`${job.title}-${job.company}`} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand shadow" />
            <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line">
              <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-navy">{job.title}</h3>
                  <p className="text-sm font-medium uppercase tracking-wide text-brand">
                    {job.company} · {job.location}
                  </p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-brand">
                  {job.period}
                </p>
              </div>
              <p className="leading-relaxed text-muted">{job.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
