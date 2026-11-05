import type { Metadata } from "next";
import Link from "next/link";
import { cv } from "@/data/cv";
import { PrintButton } from "./print-button";
import "./print.css";

export const metadata: Metadata = {
  title: "Jhon Acevedo — Software engineer and QA analyst",
  description:
    "CV of Jhon Carlos Acevedo Mendoza, software engineer and QA analyst in Colombia.",
};

function hostLabel(href: string) {
  return href.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export default function CvPage() {
  return (
    <div lang="en" className="cv-root min-h-screen bg-sand px-4 py-8 text-ink sm:px-6">
      <div className="no-print mx-auto mb-4 flex max-w-[820px] flex-wrap items-center justify-between gap-3 text-sm">
        <Link href="/#prueba" className="font-medium text-brand hover:underline">
          Volver al portafolio
        </Link>
        <div className="flex flex-wrap gap-2">
          <PrintButton />
          <a
            href="/jhon-acevedo-cv.pdf"
            className="rounded-full bg-navy px-4 py-2 font-semibold text-white hover:opacity-90"
          >
            Descargar PDF
          </a>
        </div>
      </div>

      <article className="cv-sheet mx-auto max-w-[820px] bg-white px-6 py-8 text-[13.5px] leading-snug shadow-sm sm:px-10 sm:py-10">
        <header className="border-b border-line pb-4">
          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[0.06em] text-navy">
            {cv.name}
          </h1>
          <p className="mt-2 text-base font-semibold text-brand">{cv.role}</p>
          <p className="mt-3 text-muted">
            {cv.location}
            <span className="px-1.5">·</span>
            <a href={cv.phoneHref}>{cv.phone}</a>
            <span className="px-1.5">·</span>
            <a href={`mailto:${cv.email}`}>{cv.email}</a>
          </p>
          <p className="mt-1 text-muted">{cv.availability}</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
            {cv.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="font-medium text-brand">
                  {link.label}
                </a>
                <span className="text-muted"> {hostLabel(link.href)}</span>
              </li>
            ))}
          </ul>
        </header>

        <section>
          <h2 className="mt-5 border-b border-line pb-1 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy">
            Summary
          </h2>
          <p className="mt-2">{cv.summary}</p>
        </section>

        <section>
          <h2 className="mt-5 border-b border-line pb-1 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy">
            Skills
          </h2>
          <p className="mt-2">
            <span className="font-semibold text-navy">Daily work. </span>
            {cv.dailySkills.join(", ")}.
          </p>
          <p className="mt-1">
            <span className="font-semibold text-navy">Portico project. </span>
            {cv.projectSkills.join(", ")}.
          </p>
        </section>

        <section>
          <h2 className="mt-5 border-b border-line pb-1 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy">
            Experience
          </h2>
          {cv.experience.map((job) => (
            <article key={`${job.company}-${job.period}`} className="mt-3">
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-semibold text-navy">
                  {job.title}, {job.company}
                </h3>
                <p className="shrink-0 font-medium text-brand">{job.period}</p>
              </div>
              <p className="text-muted">{job.place}</p>
              <ul className="mt-1 list-disc space-y-0.5 pl-4">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section>
          <h2 className="mt-5 border-b border-line pb-1 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy">
            Selected project
          </h2>
          <article className="mt-3">
            <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-semibold text-navy">
                <a href={cv.project.href}>{cv.project.name}</a>
              </h3>
              <p className="shrink-0 font-medium text-brand">{cv.project.period}</p>
            </div>
            <p className="text-muted">{hostLabel(cv.project.href)}</p>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {cv.project.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </section>

        <section>
          <h2 className="mt-5 border-b border-line pb-1 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy">
            Education
          </h2>
          <ul className="mt-2 space-y-1">
            {cv.education.map((item) => (
              <li key={item.school}>
                <span className="font-semibold text-navy">{item.school}. </span>
                {item.detail}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mt-5 border-b border-line pb-1 font-display text-sm font-bold uppercase tracking-[0.16em] text-navy">
            Languages
          </h2>
          <p className="mt-2">{cv.languages}</p>
        </section>
      </article>
    </div>
  );
}
