import Image from "next/image";
import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function PlatformProof() {
  const proof = resume.platformProof;

  return (
    <Section id="prueba">
      <SectionHeading eyebrow="Código que puedo mostrar">Prueba</SectionHeading>
      <article className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand">
          {proof.role}
        </p>
        <h3 className="mt-2 text-2xl font-semibold text-navy">{proof.name}</h3>
        <p className="mt-4 leading-relaxed text-muted">{proof.summary}</p>
        <div className="mt-6 grid gap-4">
          <Image
            src="/proof/home.png"
            alt="Portico: hero con experimento A/B, bloques de contenido y mapa de la redacción de ejemplo"
            width={1280}
            height={900}
            className="h-auto w-full rounded-xl ring-1 ring-line"
          />
          <Image
            src="/proof/model.png"
            alt="Modelo de contenido de Portico, con los tipos Page y Hero"
            width={1280}
            height={900}
            className="h-auto w-full rounded-xl ring-1 ring-line"
          />
        </div>
        <ul className="mt-5 space-y-2 text-ink">
          {proof.points.map((point) => (
            <li key={point} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              {point}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={proof.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex font-medium text-brand hover:underline"
          >
            Ver el código
          </a>
          <a href={proof.cvHref} className="inline-flex font-medium text-brand hover:underline">
            CV en inglés
          </a>
        </div>
      </article>
    </Section>
  );
}
