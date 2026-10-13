import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Work() {
  const study = resume.caseStudy;

  return (
    <Section id="trabajo">
      <SectionHeading eyebrow="Caso publicado">Trabajo</SectionHeading>
      <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          {study.role}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-navy">{study.name}</h3>
        <p className="mt-4 leading-relaxed text-muted">{study.summary}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-navy">
              Antes
            </h4>
            <p className="mt-2 leading-relaxed text-muted">{study.before}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-navy">
              Después
            </h4>
            <ul className="mt-2 space-y-2 text-muted">
              {study.after.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href={study.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex font-medium text-brand hover:underline"
        >
          Ver cafemarron.co
        </a>
      </article>
    </Section>
  );
}
