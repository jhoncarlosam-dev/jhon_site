import { FaTrophy } from "react-icons/fa";
import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Education() {
  return (
    <Section id="formacion">
      <SectionHeading eyebrow="UNAD y más">Formación</SectionHeading>
      <ol className="relative mb-12 space-y-8 border-l border-line pl-6">
        {resume.education.map((item) => (
          <li key={item.school} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand shadow" />
            <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line">
              <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="text-xl font-semibold text-navy">{item.school}</h3>
                <p className="shrink-0 text-sm font-semibold text-brand">
                  {item.period}
                </p>
              </div>
              <p className="text-sm font-medium uppercase tracking-wide text-brand">
                {item.program}
              </p>
              {item.detail ? (
                <p className="mt-3 leading-relaxed text-muted">{item.detail}</p>
              ) : null}
            </article>
          </li>
        ))}
      </ol>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
        Certificaciones
      </h3>
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
