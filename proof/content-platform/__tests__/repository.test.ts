import { homeEntry } from "../content/entries";
import { createRepository } from "../content/repository";
import { resolveStory } from "../content/stories";

test("caches weather for the same version and segment", async () => {
  let calls = 0;
  let now = 0;
  const repository = createRepository({
    entries: [homeEntry],
    now: () => now,
    weather: {
      async get() {
        calls += 1;
        return { temperatureC: 18, windKph: 6 };
      },
    },
  });
  const audience = {
    visitorId: "visitor-cache",
    segment: "visitor" as const,
    variant: "A" as const,
  };

  const first = await repository.getPersonalizedPage("home", audience);
  const second = await repository.getPersonalizedPage("home", audience);
  expect(
    first?.blocks.find((block) => block.type === "location"),
  ).toMatchObject({
    weather: { temperatureC: 18, windKph: 6 },
  });
  expect(second).toEqual(first);
  expect(calls).toBe(1);

  now = 30_000;
  await repository.getPersonalizedPage("home", audience);
  expect(calls).toBe(2);
});

test("resolves a story author reference", () => {
  const story = resolveStory("schema-change");
  expect(story?.author).toEqual({
    name: "Portico desk",
    role: "Sample author",
  });
  expect(resolveStory("missing")).toBeUndefined();
});
