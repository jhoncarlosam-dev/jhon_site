import type { ComponentType } from "react";
import {
  FaAngular,
  FaCss3Alt,
  FaDatabase,
  FaGitAlt,
  FaHtml5,
  FaJsSquare,
  FaLaravel,
  FaNodeJs,
  FaNpm,
  FaReact,
} from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";
import type { SkillIcon } from "@/data/resume";

const skillIconMap: Record<SkillIcon["icon"], ComponentType<{ className?: string }>> = {
  html5: FaHtml5,
  css3: FaCss3Alt,
  js: FaJsSquare,
  angular: FaAngular,
  react: FaReact,
  node: FaNodeJs,
  npm: FaNpm,
  git: FaGitAlt,
  database: FaDatabase,
  laravel: FaLaravel,
};

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading>Skills</SectionHeading>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
        Programming Languages & Tools
      </h3>
      <ul className="mb-8 flex flex-wrap gap-4">
        {resume.skillIcons.map((skill) => {
          const Icon = skillIconMap[skill.icon];
          return (
            <li
              key={skill.name}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-3xl text-navy shadow-sm ring-1 ring-line"
              title={skill.name}
            >
              <Icon />
              <span className="sr-only">{skill.name}</span>
            </li>
          );
        })}
      </ul>
      <ul className="mb-10 flex flex-wrap gap-2">
        {resume.skillBadges.map((badge) => (
          <li
            key={badge}
            className="rounded-full bg-brand/10 px-3 py-1 text-sm font-medium text-brand-dark"
          >
            {badge}
          </li>
        ))}
      </ul>
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted">
        Workflow
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {resume.workflow.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-xl bg-card px-4 py-3 text-ink shadow-sm ring-1 ring-line"
          >
            <FaCheck className="mt-1 shrink-0 text-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
