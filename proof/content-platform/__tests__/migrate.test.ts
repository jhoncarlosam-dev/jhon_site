import { migratePage } from "../content/migrate";
import { homeEntry } from "../content/entries";

test("copies a version 1 heading into version 2 variant titles", () => {
  const migrated = migratePage({
    schemaVersion: 1,
    type: "page",
    slug: "legacy",
    title: "Legacy",
    blocks: [
      {
        type: "hero",
        heading: "Publish without a release train",
        subtitle: "One subtitle for every visitor.",
      },
    ],
  });

  expect(migrated.schemaVersion).toBe(2);
  expect(migrated.blocks[0]).toMatchObject({
    type: "hero",
    experimentId: "home-hero",
    variants: {
      A: {
        visitor: {
          title: "Publish without a release train",
          subtitle: "One subtitle for every visitor.",
        },
        subscriber: {
          title: "Publish without a release train — subscriber",
        },
      },
      B: {
        visitor: { title: "Publish without a release train — version B" },
      },
    },
  });
});

test("leaves a version 2 entry unchanged", () => {
  expect(migratePage(homeEntry)).toEqual(homeEntry);
});
