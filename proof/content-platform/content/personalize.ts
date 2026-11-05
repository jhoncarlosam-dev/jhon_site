import type { Audience, Segment, Variant } from "./types";

export function assignVariant(
  visitorId: string,
  experimentId: string,
): Variant {
  const input = `${experimentId}:${visitorId}`;
  let hash = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % 2 === 0 ? "A" : "B";
}

export function parseSegment(value: unknown): Segment {
  return value === "subscriber" ? "subscriber" : "visitor";
}

export function parseVariant(value: unknown): Variant | undefined {
  return value === "A" || value === "B" ? value : undefined;
}

export function variantFor(audience: Audience, experimentId: string): Variant {
  return audience.variant ?? assignVariant(audience.visitorId, experimentId);
}
