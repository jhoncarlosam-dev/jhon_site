import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listStories, resolveStory } from "@/content/stories";

export function generateStaticParams() {
  return listStories().map((story) => ({ slug: story.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const story = resolveStory(slug);
  return { title: story?.title ?? "Story" };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = resolveStory(slug);
  if (!story) notFound();

  return (
    <article className="story">
      <header>
        <p className="eyebrow">Static story</p>
        <h1>{story.title}</h1>
        <p>{story.summary}</p>
        {story.author ? (
          <p>
            {story.author.name} · {story.author.role}
          </p>
        ) : (
          <p>Author reference could not be resolved.</p>
        )}
      </header>
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </article>
  );
}
