import type { ResolvedLocation } from "@/content/types";

export function LocationBlock({ block }: { block: ResolvedLocation }) {
  const weather = block.weather
    ? `${Math.round(block.weather.temperatureC)}°C · wind ${Math.round(block.weather.windKph)} km/h`
    : "Live weather is unavailable.";

  return (
    <section className="location" aria-labelledby="newsroom-title">
      <div>
        <h2 id="newsroom-title">{block.title}</h2>
        <p>{block.address}</p>
        <p data-testid="weather">{weather}</p>
        <p className="note">
          Map tiles from OpenStreetMap. Weather from Open-Meteo. A Google Maps
          embed can replace the map URL without changing the content entry.
        </p>
      </div>
      <iframe
        title="Map of the demo newsroom"
        src={block.mapUrl}
        loading="lazy"
      />
    </section>
  );
}
