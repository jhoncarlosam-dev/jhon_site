export function openStreetMapEmbed(
  latitude: number,
  longitude: number,
): string {
  const south = (latitude - 0.02).toFixed(4);
  const north = (latitude + 0.02).toFixed(4);
  const west = (longitude - 0.02).toFixed(4);
  const east = (longitude + 0.02).toFixed(4);
  const markerLat = latitude.toFixed(4);
  const markerLng = longitude.toFixed(4);
  return `https://www.openstreetmap.org/export/embed.html?bbox=${west}%2C${south}%2C${east}%2C${north}&layer=mapnik&marker=${markerLat}%2C${markerLng}`;
}
