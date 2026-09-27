// Deterministic "cover art" — picsum.photos can return a stable image per
// seed string, so the same game always shows the same picture without us
// having to host or upload any images ourselves.
export function coverImageFor(game) {
  if (game.cover_image_url) return game.cover_image_url
  return `https://picsum.photos/seed/${encodeURIComponent(game.slug)}/480/320`
}

// Small icon sets so genres/platforms are scannable at a glance.
// Using plain characters instead of a logo library avoids pulling in
// trademarked console/platform logos.
export const GENRE_ICONS = {
  RPG: '🗡️',
  Strategy: '♟️',
  Action: '⚔️',
  Horror: '👻',
  Sports: '⚽',
  Adventure: '🧭',
  Platformer: '🕹️',
  FPS: '🎯',
  Simulation: '🏗️',
  Indie: '✨',
}

export const PLATFORM_ICONS = {
  PC: '🖥️',
  PS5: '🎮',
  'Xbox Series X': '🟩',
  Switch: '🔴',
}

export function genreIcon(genre) {
  return GENRE_ICONS[genre] ?? '🎮'
}

export function platformIcon(platform) {
  return PLATFORM_ICONS[platform] ?? '🎮'
}
