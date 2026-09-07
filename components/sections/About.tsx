import { resume } from "@/data/resume";
import { Section } from "@/components/Section";
import { SocialIcons } from "@/components/SocialIcons";

export function About() {
  return (
    <Section id="about">
      <h1 className="font-display mb-4 text-5xl font-bold uppercase leading-none tracking-[0.06em] text-navy sm:text-6xl lg:text-7xl">
        {resume.name}{" "}
        <span className="text-brand">{resume.lastName}</span>
      </h1>
      <p className="mb-8 text-sm font-medium uppercase tracking-[0.14em] text-muted">
        {resume.location} ·{" "}
        <a href={resume.phoneHref} className="text-brand hover:underline">
          {resume.phone}
        </a>{" "}
        ·{" "}
        <a href={`mailto:${resume.email}`} className="text-brand hover:underline">
          {resume.email}
        </a>
      </p>
      <p className="mb-10 max-w-2xl text-lg leading-relaxed text-ink/90">
        {resume.summary}
      </p>
      <SocialIcons links={resume.socials} />
    </Section>
  );
}
