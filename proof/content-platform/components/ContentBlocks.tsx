import type { ResolvedBlock } from "@/content/types";
import { FeatureGrid } from "./FeatureGrid";
import { Hero } from "./Hero";
import { LeadForm } from "./LeadForm";
import { LocationBlock } from "./LocationBlock";

export function ContentBlocks({ blocks }: { blocks: ResolvedBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        if (block.type === "hero") return <Hero key={key} block={block} />;
        if (block.type === "features")
          return <FeatureGrid key={key} block={block} />;
        if (block.type === "location")
          return <LocationBlock key={key} block={block} />;
        if (block.type === "form") return <LeadForm key={key} block={block} />;
        return null;
      })}
    </>
  );
}
