import { migratePage } from "./migrate";
import type { FormBlock, PageEntry } from "./types";

export const homeEntry: PageEntry = migratePage({
  schemaVersion: 2,
  type: "page",
  slug: "home",
  title: "Portico",
  blocks: [
    {
      type: "hero",
      experimentId: "home-hero",
      variants: {
        A: {
          visitor: {
            title: "Publish the page without waiting on a release.",
            subtitle:
              "Portico reads a headless content model, renders it with Next.js, and keeps the hero experiment stable for each visitor.",
          },
          subscriber: {
            title: "This browser is on the subscriber path.",
            subtitle:
              "The form was accepted, so the hero now uses the subscriber copy for version A.",
          },
        },
        B: {
          visitor: {
            title: "Blocks, APIs, and tests in one slice.",
            subtitle:
              "The same entry is served over REST and GraphQL. Jest, Testing Library, and Playwright cover the path.",
          },
          subscriber: {
            title: "Subscriber path, version B.",
            subtitle: "The version stayed on B. Only the segment changed.",
          },
        },
      },
    },
    {
      type: "features",
      title: "What this slice is for",
      items: [
        {
          title: "Modular pages",
          text: "Blocks come from a typed content entry, the way a headless CMS stores modular fields.",
        },
        {
          title: "Personalization",
          text: "One experiment, two versions, and a subscriber segment after the form is saved.",
        },
        {
          title: "A real service",
          text: "Node, REST, GraphQL, a short-lived cache, and automated tests sit behind the page.",
        },
      ],
    },
    {
      type: "location",
      title: "Demo newsroom",
      address: "Carrera 7, Bogotá, Colombia. Sample pin for the map embed.",
      latitude: 4.5981,
      longitude: -74.076,
    },
    {
      type: "form",
      title: "Request a walkthrough",
      submitLabel: "Request a walkthrough",
      successMessage: "Saved. This browser is now in the subscriber segment.",
      fields: [
        {
          name: "email",
          label: "Work email",
          fieldType: "email",
          required: true,
          options: [],
        },
        {
          name: "company",
          label: "Company",
          fieldType: "text",
          required: true,
          options: [],
        },
        {
          name: "interest",
          label: "Interest",
          fieldType: "select",
          required: true,
          options: ["Content model", "Personalization", "Testing"],
        },
      ],
    },
  ],
});

export function leadForm(entry: PageEntry = homeEntry): FormBlock {
  const block = entry.blocks.find((item) => item.type === "form");
  if (!block || block.type !== "form") {
    throw new Error("Page is missing a form block");
  }
  return block;
}
