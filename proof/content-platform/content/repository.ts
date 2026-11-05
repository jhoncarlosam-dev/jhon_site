import { createCache, type TtlCache } from "./cache";
import { homeEntry } from "./entries";
import { resolvePage } from "./resolve";
import { resolveStory, type ResolvedStory } from "./stories";
import type { Audience, PageEntry, PersonalizedPage } from "./types";
import { createOpenMeteoClient, type WeatherClient } from "./weather";

const PAGE_TTL_MS = 30_000;

export type RepositoryOptions = {
  entries?: PageEntry[];
  weather?: WeatherClient;
  now?: () => number;
  cache?: TtlCache;
};

export function createRepository(options: RepositoryOptions = {}) {
  const entries = options.entries ?? [homeEntry];
  const weather = options.weather ?? createOpenMeteoClient();
  const cache = options.cache ?? createCache(options.now);

  return {
    async getPersonalizedPage(
      slug: string,
      audience: Audience,
    ): Promise<PersonalizedPage | null> {
      const entry = entries.find((item) => item.slug === slug);
      if (!entry) return null;

      const resolved = resolvePage(entry, audience);
      const variant = resolved.experiment?.variant ?? "none";
      const key = `${slug}:${variant}:${audience.segment}`;
      const cached = cache.get(key);
      if (cached) return cached as PersonalizedPage;

      const blocks = await Promise.all(
        resolved.blocks.map(async (block) => {
          if (block.type !== "location") return block;
          const report = await weather.get(block.latitude, block.longitude);
          return { ...block, weather: report };
        }),
      );
      const page: PersonalizedPage = { ...resolved, blocks };
      cache.set(key, page, PAGE_TTL_MS);
      return page;
    },
    getStory(slug: string): ResolvedStory | undefined {
      return resolveStory(slug);
    },
  };
}

export type ContentRepository = ReturnType<typeof createRepository>;
