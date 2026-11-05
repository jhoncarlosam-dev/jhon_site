import { openStreetMapEmbed } from "./map";
import { variantFor } from "./personalize";
import type {
  Audience,
  PageEntry,
  PersonalizedPage,
  ResolvedBlock,
} from "./types";

export function resolvePage(
  entry: PageEntry,
  audience: Audience,
): PersonalizedPage {
  let experiment: PersonalizedPage["experiment"] = null;

  const blocks: ResolvedBlock[] = entry.blocks.map((block) => {
    if (block.type === "hero") {
      const variant = variantFor(audience, block.experimentId);
      const copy = block.variants[variant][audience.segment];
      experiment ??= { id: block.experimentId, variant };
      return {
        type: "hero" as const,
        experimentId: block.experimentId,
        variant,
        segment: audience.segment,
        title: copy.title,
        subtitle: copy.subtitle,
      };
    }
    if (block.type === "location") {
      return {
        ...block,
        mapUrl: openStreetMapEmbed(block.latitude, block.longitude),
        weather: null,
      };
    }
    return block;
  });

  return {
    slug: entry.slug,
    title: entry.title,
    segment: audience.segment,
    experiment,
    blocks,
  };
}
