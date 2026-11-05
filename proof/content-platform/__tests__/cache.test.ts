import { createCache } from "../content/cache";

test("expires a value when the clock passes the ttl", () => {
  let now = 0;
  const cache = createCache(() => now);
  cache.set("page", { ok: true }, 1000);
  expect(cache.get("page")).toEqual({ ok: true });
  now = 1000;
  expect(cache.get("page")).toBeUndefined();
});
