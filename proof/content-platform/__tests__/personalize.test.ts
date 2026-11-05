import { assignVariant } from "../content/personalize";

test("keeps the same version for the same visitor", () => {
  const first = assignVariant("visitor-7", "home-hero");
  const second = assignVariant("visitor-7", "home-hero");
  expect(first).toBe(second);
  expect(["A", "B"]).toContain(first);
});

test("produces both versions across visitors", () => {
  const seen = new Set(
    Array.from({ length: 40 }, (_, index) =>
      assignVariant(`visitor-${index}`, "home-hero"),
    ),
  );
  expect(seen).toEqual(new Set(["A", "B"]));
});
