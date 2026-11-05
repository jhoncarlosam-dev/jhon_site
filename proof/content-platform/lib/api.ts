import type { PersonalizedPage, Segment, Variant } from "@/content/types";

const base = process.env.CONTENT_API_URL ?? "http://127.0.0.1:4000";

export async function getPersonalizedPage(
  slug: string,
  audience: { visitorId: string; segment: Segment; variant?: Variant },
): Promise<PersonalizedPage> {
  const headers: Record<string, string> = {
    "x-visitor-id": audience.visitorId,
    "x-segment": audience.segment,
  };
  if (audience.variant) headers["x-variant"] = audience.variant;
  const response = await fetch(`${base}/v1/pages/${slug}`, {
    headers,
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Content API responded ${response.status}`);
  }
  return (await response.json()) as PersonalizedPage;
}
