import type { FeatureGridBlock } from "@/content/types";

export function FeatureGrid({ block }: { block: FeatureGridBlock }) {
  return (
    <section className="features" aria-labelledby="features-title">
      <h2 id="features-title">{block.title}</h2>
      <ul>
        {block.items.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
