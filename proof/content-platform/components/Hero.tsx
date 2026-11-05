import type { ResolvedHero } from "@/content/types";

export function Hero({ block }: { block: ResolvedHero }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <p className="eyebrow">
        <span data-testid="hero-variant">Version {block.variant}</span>
        <span aria-hidden="true"> · </span>
        <span data-testid="hero-segment">{block.segment}</span>
      </p>
      <h1 id="hero-title" data-testid="hero-title">
        {block.title}
      </h1>
      <p className="lede">{block.subtitle}</p>
    </section>
  );
}
