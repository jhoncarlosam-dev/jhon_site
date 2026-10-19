import { FaWhatsapp } from "react-icons/fa";
import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";
import { SocialIcons } from "@/components/SocialIcons";

export function Contact() {
  return (
    <Section id="contacto">
      <SectionHeading eyebrow="Hablemos">Contacto</SectionHeading>
      <p className="mb-8 max-w-xl text-lg leading-relaxed text-muted">
        Busco un rol de desarrollo backend, con teletrabajo. Si el equipo trabaja
        con Python y bases relacionales, escribe al correo o por WhatsApp.
      </p>
      <a
        href={resume.whatsapp.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-lg font-semibold text-white hover:opacity-90"
      >
        <FaWhatsapp />
        {resume.whatsapp.label} · {resume.whatsapp.detail}
      </a>
      <ul className="mb-8 space-y-2 text-ink">
        <li>
          <a href={resume.phoneHref} className="hover:text-brand">
            {resume.phone}
          </a>
        </li>
        <li>
          <a href={`mailto:${resume.email}`} className="hover:text-brand">
            {resume.email}
          </a>
        </li>
        <li className="text-muted">{resume.locationDetail}</li>
      </ul>
      <SocialIcons links={resume.socials} />
    </Section>
  );
}
