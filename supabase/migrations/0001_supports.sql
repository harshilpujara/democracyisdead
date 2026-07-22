-- Democracy Is Dead: supports table
--
-- Each row is one person adding their voice to the movement. Anonymous
-- visitors can insert their own row and read back the public fields of
-- everyone's rows (city-level location, message, display name — only when
-- the submitter chose not to be anonymous). Nothing else is readable
-- through the normal Supabase client: not who is anonymous, not their
-- state/country, nothing.
--
-- Caveat worth knowing: Supabase Realtime (postgres_changes) streams the
-- full row from the WAL, not through the column grants below. Since
-- anonymous rows are written with display_name = NULL at insert time (see
-- the CHECK constraint), there is no hidden name for realtime to leak —
-- but the raw state/country/is_anonymous columns will be present in the
-- realtime payload even though they're not selectable via a normal query.
-- If that ever needs to be airtight, move realtime consumption behind an
-- Edge Function/broadcast relay instead of subscribing to this table
-- directly.

create extension if not exists "pgcrypto";

create table if not exists public.supports (
  id uuid primary key default gen_random_uuid(),
  display_name text,
  is_anonymous boolean not null default false,
  city text not null,
  state text,
  country text not null,
  lat double precision not null,
  lng double precision not null,
  message text,
  created_at timestamptz not null default now(),
  constraint supports_anonymous_has_no_name
    check (not is_anonymous or display_name is null),
  constraint supports_message_length check (char_length(message) <= 280),
  constraint supports_lat_range check (lat between -90 and 90),
  constraint supports_lng_range check (lng between -180 and 180)
);

create index if not exists supports_created_at_idx on public.supports (created_at);
create index if not exists supports_city_country_idx on public.supports (lower(city), lower(country));

-- Row Level Security -------------------------------------------------------

alter table public.supports enable row level security;

-- Anyone (anon or authenticated) may add a row.
create policy "supports_insert_anyone"
  on public.supports
  for insert
  to anon, authenticated
  with check (true);

-- Row-level visibility is open (every row is meant to show up on the
-- globe); COLUMN-level grants below are what actually restrict which
-- fields are readable. This also lets Realtime authorize anon/authenticated
-- subscribers for postgres_changes on this table.
create policy "supports_select_anyone"
  on public.supports
  for select
  to anon, authenticated
  using (true);

-- No update/delete policy: neither anon nor authenticated can modify or
-- remove a row once written.

-- Column-level grants --------------------------------------------------
-- Revoke the broad table-level grants Supabase applies by default, then
-- grant back only what each role should touch.

revoke all on public.supports from anon, authenticated;

grant insert (display_name, is_anonymous, city, state, country, lat, lng, message)
  on public.supports to anon, authenticated;

grant select (id, created_at, city, lat, lng, message, display_name)
  on public.supports to anon, authenticated;

-- Realtime -------------------------------------------------------------

alter table public.supports replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'supports'
  ) then
    alter publication supabase_realtime add table public.supports;
  end if;
end $$;
