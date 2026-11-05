export type ContentTypeField = {
  uid: string;
  type: string;
  required: boolean;
};

export type ContentType = {
  uid: string;
  title: string;
  description: string;
  stackEquivalent: string;
  fields: ContentTypeField[];
};

export const contentTypes: ContentType[] = [
  {
    uid: "page",
    title: "Page",
    description: "A URL assembled from modular blocks.",
    stackEquivalent: "Contentstack content type with Modular Blocks",
    fields: [
      { uid: "title", type: "Single line text", required: true },
      { uid: "slug", type: "Single line text", required: true },
      {
        uid: "blocks",
        type: "Modular Blocks (hero, features, location, form)",
        required: true,
      },
      { uid: "schemaVersion", type: "Number", required: true },
    ],
  },
  {
    uid: "hero",
    title: "Hero",
    description: "Experiment copy for two versions and two segments.",
    stackEquivalent: "Modular block with a group field per variant",
    fields: [
      { uid: "experimentId", type: "Single line text", required: true },
      {
        uid: "variants",
        type: "Group: A/B × visitor/subscriber, each with title and subtitle",
        required: true,
      },
    ],
  },
  {
    uid: "features",
    title: "Feature grid",
    description: "A titled list of short points.",
    stackEquivalent: "Modular block with a group list",
    fields: [
      { uid: "title", type: "Single line text", required: true },
      { uid: "items", type: "Group (title, text)", required: true },
    ],
  },
  {
    uid: "location",
    title: "Location",
    description: "Address, map embed, and optional live weather.",
    stackEquivalent: "Modular block plus a third-party integration",
    fields: [
      { uid: "title", type: "Single line text", required: true },
      { uid: "address", type: "Multi line text", required: true },
      { uid: "latitude", type: "Number", required: true },
      { uid: "longitude", type: "Number", required: true },
    ],
  },
  {
    uid: "form",
    title: "Dynamic form",
    description:
      "Fields are content. The React form renders whatever the entry lists.",
    stackEquivalent: "Modular block with a field-schema group",
    fields: [
      { uid: "title", type: "Single line text", required: true },
      { uid: "submitLabel", type: "Single line text", required: true },
      {
        uid: "fields",
        type: "Group (name, label, type, required, options)",
        required: true,
      },
    ],
  },
  {
    uid: "story",
    title: "Story",
    description: "A statically generated article.",
    stackEquivalent: "Content type with a reference to Author",
    fields: [
      { uid: "title", type: "Single line text", required: true },
      { uid: "slug", type: "Single line text", required: true },
      { uid: "summary", type: "Multi line text", required: true },
      { uid: "author", type: "Reference → author", required: true },
      { uid: "paragraphs", type: "Multi line text, multiple", required: true },
    ],
  },
  {
    uid: "author",
    title: "Author",
    description: "Referenced by stories. The page resolves the uid on read.",
    stackEquivalent: "Contentstack reference field",
    fields: [
      { uid: "name", type: "Single line text", required: true },
      { uid: "role", type: "Single line text", required: true },
    ],
  },
];
