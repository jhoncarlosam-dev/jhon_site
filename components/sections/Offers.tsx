import { resume } from "@/data/resume";
import { Section, SectionHeading } from "@/components/Section";

export function Offers() {
  return (
    <Section id="ofertas" wide>
      <SectionHeading eyebrow="Cómo te puedo ayudar">Ofertas</SectionHeading>
      <div className="grid gap-6 lg:grid-cols-3">
        {resume.offers.map((offer) => (
          <article
            key={offer.name}
            className="flex flex-col rounded-2xl bg-card p-6 shadow-sm ring-1 ring-line"
          >
            <h3 className="text-xl font-semibold text-navy">{offer.name}</h3>
            <p className="mt-3 font-display text-3xl font-bold tracking-wide text-brand">
              {offer.price}
            </p>
            <p className="text-sm font-medium uppercase tracking-wide text-muted">
              {offer.term}
            </p>
            <p className="mt-4 leading-relaxed text-muted">{offer.description}</p>
            <ul className="mt-5 space-y-2 text-sm text-ink">
              {offer.included.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <ul className="mt-8 grid gap-2 text-sm text-muted sm:grid-cols-2">
        {resume.offerTerms.map((term) => (
          <li key={term}>{term}</li>
        ))}
      </ul>
    </Section>
  );
}
