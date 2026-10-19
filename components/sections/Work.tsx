import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Work() {
  return (
    <Section id="proyectos">
      <SectionHeading eyebrow="Repositorios y un sitio publicado">
        Proyectos
      </SectionHeading>
      <div className="grid gap-6">
        {resume.projects.map((project) => (
          <article
            key={project.name}
            className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line sm:p-8"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
              {project.role}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-navy">{project.name}</h3>
            <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand-dark"
                >
                  {item}
                </li>
              ))}
            </ul>
            <ul className="mt-5 space-y-2 text-muted">
              {project.points.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex font-medium text-brand hover:underline"
              >
                {project.linkLabel}
              </a>
              {project.secondaryHref && project.secondaryLinkLabel ? (
                <a
                  href={project.secondaryHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex font-medium text-brand hover:underline"
                >
                  {project.secondaryLinkLabel}
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
