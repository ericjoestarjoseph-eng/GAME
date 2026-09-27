-- Game Catalog schema
-- Run this in the Supabase SQL editor (or via `supabase db push`).

create extension if not exists "pgcrypto";

create table if not exists public.games (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  slug          text not null unique,
  description   text,
  cover_image_url text,
  genre         text not null,
  platform      text[] not null default '{}',
  rating        numeric(3,1) not null default 0 check (rating >= 0 and rating <= 10),
  release_year  integer,
  developer     text,
  created_at    timestamptz not null default now()
);

create index if not exists games_genre_idx on public.games (genre);
create index if not exists games_platform_idx on public.games using gin (platform);

-- Row Level Security: this is a public catalog, so anyone (using the anon key)
-- can read games. No one can write from the client — inserts/updates happen
-- from the Supabase dashboard or a service role key.
alter table public.games enable row level security;

create policy "Public games are viewable by everyone"
  on public.games
  for select
  using (true);
