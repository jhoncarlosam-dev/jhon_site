export type Author = {
  uid: string;
  name: string;
  role: string;
};

export type Story = {
  slug: string;
  title: string;
  summary: string;
  authorUid: string;
  paragraphs: string[];
};

export type ResolvedStory = Omit<Story, "authorUid"> & {
  author: { name: string; role: string } | null;
};

export const authors: Author[] = [
  {
    uid: "portico-desk",
    name: "Portico desk",
    role: "Sample author",
  },
];

export const stories: Story[] = [
  {
    slug: "schema-change",
    title: "How a schema change ships",
    summary:
      "Version 1 stored a hero heading. Version 2 stores a title inside each variant.",
    authorUid: "portico-desk",
    paragraphs: [
      "A Contentstack-style content type does not stay still. This slice keeps a schema version on each page entry so an old shape can still be read.",
      "The migration copies a flat heading into the four hero copies and fills experimentId when the old entry does not have one. A Jest test loads a version 1 fixture and checks the version 2 shape.",
      "New entries are written as version 2. The repository runs the migration on read, so a caller never sees the old field name.",
    ],
  },
  {
    slug: "experiments",
    title: "How the hero experiment stays put",
    summary:
      "The visitor id picks version A or B. A reload does not reshuffle it.",
    authorUid: "portico-desk",
    paragraphs: [
      "Assignment is a hash of the experiment id and the visitor id. The same browser keeps the same version because the id lives in a cookie.",
      "The preview links force version A or B so you can read both copies. That override is for review. It is not the assignment rule.",
      "After a valid form post, a segment cookie changes the copy. The version stays. Subscriber and visitor text both live in the content entry.",
    ],
  },
];

export function listStories(): Story[] {
  return stories;
}

export function resolveStory(slug: string): ResolvedStory | undefined {
  const story = stories.find((item) => item.slug === slug);
  if (!story) return undefined;
  const author = authors.find((item) => item.uid === story.authorUid) ?? null;
  return {
    slug: story.slug,
    title: story.title,
    summary: story.summary,
    paragraphs: story.paragraphs,
    author: author ? { name: author.name, role: author.role } : null,
  };
}
