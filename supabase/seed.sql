insert into public.games (title, slug, description, cover_image_url, genre, platform, rating, release_year, developer)
values
  ('Starlight Drifters', 'starlight-drifters', 'A co-op space exploration game about salvaging derelict ships.', null, 'Adventure', array['PC','PS5','Xbox Series X'], 8.7, 2024, 'Nomad Studio'),
  ('Ironbound', 'ironbound', 'A tactical roguelike where every run rewrites the map.', null, 'Strategy', array['PC','Switch'], 9.1, 2023, 'Foundry Games'),
  ('Neon Undertow', 'neon-undertow', 'A cyberpunk stealth-action game set in a flooded megacity.', null, 'Action', array['PC','PS5'], 8.3, 2025, 'Riptide Interactive'),
  ('Hollow Pines', 'hollow-pines', 'A slow-burn horror game about a town that forgets its visitors.', null, 'Horror', array['PC','Xbox Series X'], 8.9, 2024, 'Quiet Room'),
  ('Kickoff Legends', 'kickoff-legends', 'An arcade football game built for couch multiplayer.', null, 'Sports', array['PS5','Xbox Series X','Switch'], 7.8, 2023, 'Backyard Games'),
  ('Loomfall', 'loomfall', 'An open-world RPG about weaving fate itself.', null, 'RPG', array['PC','PS5'], 9.4, 2025, 'Wovenlight'),
  ('Pixel Pushers', 'pixel-pushers', 'A tight, brutal platformer about a courier in a crumbling city.', null, 'Platformer', array['PC','Switch'], 8.5, 2022, 'Small Talk Games'),
  ('Deadline Zero', 'deadline-zero', 'A fast-paced competitive FPS with a 90-second round timer.', null, 'FPS', array['PC','PS5','Xbox Series X'], 8.0, 2024, 'Volt Studios'),
  ('Terraced', 'terraced', 'A gentle city-building sim about rebuilding after a flood.', null, 'Simulation', array['PC','Switch'], 8.8, 2023, 'Fieldstone'),
  ('Static Choir', 'static-choir', 'A narrative puzzle game told through a broken radio signal.', null, 'Indie', array['PC'], 9.0, 2025, 'Low Hum Collective')
on conflict (slug) do nothing;
