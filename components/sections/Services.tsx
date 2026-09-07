"use client";

import { useState, type ComponentType } from "react";
import {
  FaChalkboardTeacher,
  FaDesktop,
  FaDownload,
  FaLaptopCode,
  FaVideo,
  FaVial,
  FaWhatsapp,
} from "react-icons/fa";
import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";
import type { Service } from "@/data/resume";

const serviceIcons: Record<
  Service["icon"],
  ComponentType<{ className?: string }>
> = {
  web: FaLaptopCode,
  qa: FaVial,
  mentor: FaChalkboardTeacher,
  video: FaVideo,
  systems: FaDesktop,
};

type DownloadStatus = "idle" | "working" | "done" | "error";

export function Services() {
  const [status, setStatus] = useState<DownloadStatus>("idle");

  async function downloadCard() {
    const card = document.getElementById("servicesCard");
    if (!card || status === "working") return;

    setStatus("working");
    try {
      const html2canvas = (await import("html2canvas-pro")).default;
      const canvas = await html2canvas(card, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#163445",
        logging: false,
      });
      const link = document.createElement("a");
      link.download = "jhon-acevedo-servicios.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2500);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <Section id="services">
      <SectionHeading>Services</SectionHeading>
      <div
        id="servicesCard"
        className="services-card mb-6 rounded-3xl p-6 sm:p-8"
      >
        <div className="mb-8 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={resume.profileImageFallback}
            alt={resume.fullName}
            className="h-16 w-16 rounded-full object-cover ring-2 ring-white/30"
          />
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-[0.12em]">
              Jhon <span className="services-card-accent">{`{DEV}`}</span>
            </h3>
            <p className="services-card-muted text-sm">{resume.tagline}</p>
          </div>
        </div>
        <h4 className="mb-5 text-lg font-semibold">¿Qué puedo hacer por ti?</h4>
        <div className="grid gap-4 sm:grid-cols-2">
          {resume.services.map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <div key={service.title} className="flex items-start gap-3">
                <Icon className="services-card-accent mt-1 shrink-0" />
                <div>
                  <h5 className="font-semibold">{service.title}</h5>
                  <p className="services-card-faint text-sm">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 border-t border-white/15 pt-6 text-center">
          <a
            href={resume.whatsapp.href}
            target="_blank"
            rel="noopener noreferrer"
            className="services-whatsapp inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold transition-opacity hover:opacity-90"
          >
            <FaWhatsapp />
            {resume.whatsapp.label}
          </a>
          <p className="mt-3 text-sm text-white/70">
            Respuesta rápida. Soluciones reales.
          </p>
        </div>
      </div>
      <div className="text-center">
        <button
          type="button"
          onClick={downloadCard}
          disabled={status === "working"}
          className="inline-flex items-center gap-2 rounded-full border border-brand px-5 py-2.5 font-medium text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-wait disabled:opacity-70"
        >
          <FaDownload />
          {status === "working"
            ? "Generando imagen..."
            : status === "done"
              ? "Imagen descargada"
              : status === "error"
                ? "Error al generar. Reintenta"
                : "Descargar como imagen"}
        </button>
      </div>
    </Section>
  );
}
