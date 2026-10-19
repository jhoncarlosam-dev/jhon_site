import { FaWhatsapp } from "react-icons/fa";
import { resume } from "@/data/resume";
import { Section } from "@/components/Section";
import { SocialIcons } from "@/components/SocialIcons";

export function About() {
  return (
    <Section id="inicio">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
        {resume.location}
      </p>
      <h1 className="font-display mb-3 text-5xl font-bold uppercase leading-none tracking-[0.06em] text-navy sm:text-6xl lg:text-7xl">
        {resume.name}{" "}
        <span className="text-brand">{resume.lastName}</span>
      </h1>
      <p className="mb-6 text-xl font-medium text-navy sm:text-2xl">
        {resume.role}
      </p>
      <p className="mb-4 max-w-2xl text-lg leading-relaxed text-ink/90">
        {resume.tagline}
      </p>
      <p className="mb-8 max-w-2xl leading-relaxed text-muted">
        {resume.summary}
      </p>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <a
          href={resume.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-3 font-semibold text-white hover:opacity-90"
        >
          <FaWhatsapp />
          {resume.whatsapp.label}
        </a>
        <a
          href="#proyectos"
          className="inline-flex items-center rounded-full border border-brand px-5 py-3 font-medium text-brand hover:bg-brand hover:text-white"
        >
          Ver proyectos
        </a>
        <a
          href={`mailto:${resume.email}`}
          className="inline-flex items-center rounded-full border border-navy/15 px-5 py-3 font-medium text-navy hover:border-navy"
        >
          Correo
        </a>
      </div>
      <p className="mb-6 text-sm text-muted">{resume.languagesNote}</p>
      <SocialIcons links={resume.socials} />
    </Section>
  );
}
