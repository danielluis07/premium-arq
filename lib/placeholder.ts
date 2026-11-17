/**
 * Free-to-use architecture photos from Unsplash (https://unsplash.com/license).
 * Only `images.unsplash.com/photo-*` URLs are allowed by `next.config.ts`.
 */
export const IMAGES = [
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625", // Rock and Roll Hall of Fame, geometric facade
  "https://images.unsplash.com/photo-1613977257363-707ba9348227", // white villa with pool
  "https://images.unsplash.com/photo-1527576539890-dfa815648363", // curved facade, Copenhagen
  "https://images.unsplash.com/photo-1758448756207-54505680d130", // modern house, large windows
  "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8", // white cement building
  "https://images.unsplash.com/photo-1531591022136-eb8b0da1e6d0", // Walt Disney Concert Hall
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", // white concrete house
  "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a", // grey building, low angle
  "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2", // house with balconies
  "https://images.unsplash.com/photo-1546349851-64285be8e9fa", // diamond-pattern curved wall
  "https://images.unsplash.com/photo-1613490493576-7fde63acd811", // white and brown house
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742", // white concrete building
  "https://images.unsplash.com/photo-1706808849780-7a04fbac83ef", // house with pool and loungers
  "https://images.unsplash.com/photo-1486718448742-163732cd1544", // brown wavy structure
  "https://images.unsplash.com/photo-1615406020658-6c4b805f1f30", // brown concrete building
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914", // white and brown concrete house
  "https://images.unsplash.com/photo-1628012209120-d9db7abf7eab", // white concrete building
  "https://images.unsplash.com/photo-1574848296471-28f79a036f79", // high-rise
] as const;

/** Deterministic pick so SSR and client agree; wraps around the pool. */
export function imageAt(index: number): string {
  return IMAGES[((index % IMAGES.length) + IMAGES.length) % IMAGES.length];
}
