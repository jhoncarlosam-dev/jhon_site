import type { WeatherReport } from "./types";

export type WeatherClient = {
  get(latitude: number, longitude: number): Promise<WeatherReport | null>;
};

type ForecastBody = {
  current?: {
    temperature_2m?: unknown;
    wind_speed_10m?: unknown;
  };
};

export function createOpenMeteoClient(
  fetcher: typeof fetch = fetch,
): WeatherClient {
  return {
    async get(latitude, longitude) {
      try {
        const url = new URL("https://api.open-meteo.com/v1/forecast");
        url.searchParams.set("latitude", String(latitude));
        url.searchParams.set("longitude", String(longitude));
        url.searchParams.set("current", "temperature_2m,wind_speed_10m");
        const response = await fetcher(url, {
          signal: AbortSignal.timeout(2500),
        });
        if (!response.ok) return null;
        const body = (await response.json()) as ForecastBody;
        const temperatureC = body.current?.temperature_2m;
        const windKph = body.current?.wind_speed_10m;
        if (typeof temperatureC !== "number" || typeof windKph !== "number") {
          return null;
        }
        return { temperatureC, windKph };
      } catch {
        return null;
      }
    },
  };
}
