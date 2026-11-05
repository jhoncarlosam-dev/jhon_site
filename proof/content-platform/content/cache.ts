export type TtlCache = {
  get(key: string): unknown;
  set(key: string, value: unknown, ttlMs: number): void;
};

export function createCache(clock: () => number = Date.now): TtlCache {
  const store = new Map<string, { value: unknown; expires: number }>();

  return {
    get(key) {
      const hit = store.get(key);
      if (!hit) return undefined;
      if (hit.expires <= clock()) {
        store.delete(key);
        return undefined;
      }
      return hit.value;
    },
    set(key, value, ttlMs) {
      store.set(key, { value, expires: clock() + ttlMs });
    },
  };
}
