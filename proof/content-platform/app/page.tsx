import { headers } from "next/headers";
import Link from "next/link";
import { ApiOffline } from "@/components/ApiOffline";
import { ContentBlocks } from "@/components/ContentBlocks";
import { parseSegment, parseVariant } from "@/content/personalize";
import { getPersonalizedPage } from "@/lib/api";
import type { PersonalizedPage } from "@/content/types";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>;
}) {
  const params = await searchParams;
  const headerList = await headers();
  const variant = parseVariant(params.variant);
  let page: PersonalizedPage | null = null;

  try {
    page = await getPersonalizedPage("home", {
      visitorId: headerList.get("x-visitor-id") ?? "anonymous",
      segment: parseSegment(headerList.get("x-segment")),
      variant,
    });
  } catch {
    page = null;
  }

  if (!page) return <ApiOffline />;

  return (
    <div className="stack">
      <p className="preview-row">
        Preview <Link href="/?variant=A">version A</Link> or{" "}
        <Link href="/?variant=B">version B</Link>. A reload without those links
        keeps the assigned version.
      </p>
      <ContentBlocks blocks={page.blocks} />
    </div>
  );
}
