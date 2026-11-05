import { openStreetMapEmbed } from "../content/map";
import { createOpenMeteoClient } from "../content/weather";

test("builds an OpenStreetMap embed with a marker", () => {
  const url = openStreetMapEmbed(4.5981, -74.076);
  expect(url).toContain("openstreetmap.org/export/embed.html");
  expect(url).toContain("marker=4.5981%2C-74.0760");
});

test("reads temperature and wind from Open-Meteo", async () => {
  const client = createOpenMeteoClient(async () => {
    return {
      ok: true,
      json: async () => ({
        current: { temperature_2m: 19.2, wind_speed_10m: 7.4 },
      }),
    } as Response;
  });

  await expect(client.get(4.6, -74.1)).resolves.toEqual({
    temperatureC: 19.2,
    windKph: 7.4,
  });
});

test("returns null when the weather service fails", async () => {
  const client = createOpenMeteoClient(async () => {
    throw new Error("offline");
  });
  await expect(client.get(0, 0)).resolves.toBeNull();
});
