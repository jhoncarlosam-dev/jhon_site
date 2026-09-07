import type { ReactNode } from "react";

export function Section({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-b border-line px-6 py-16 sm:px-10 lg:scroll-mt-8 lg:px-16 lg:py-24"
    >
      <div className="mx-auto max-w-3xl">{children}</div>
    </section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display mb-10 text-4xl font-bold uppercase tracking-[0.12em] text-navy lg:text-5xl">
      {children}
      <span className="mt-3 block h-1 w-14 rounded-full bg-brand" />
    </h2>
  );
}
