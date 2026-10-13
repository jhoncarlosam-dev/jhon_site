import type { ReactNode } from "react";

export function Section({
  id,
  children,
  wide = false,
}: {
  id: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-line px-6 py-16 sm:px-10 lg:scroll-mt-8 lg:px-16 lg:py-24"
    >
      <div className={`mx-auto ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  children,
  eyebrow,
}: {
  children: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-10">
      {eyebrow ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-display text-4xl font-bold uppercase tracking-[0.12em] text-navy lg:text-5xl">
        {children}
        <span className="mt-3 block h-1 w-14 rounded-full bg-brand" />
      </h2>
    </div>
  );
}
