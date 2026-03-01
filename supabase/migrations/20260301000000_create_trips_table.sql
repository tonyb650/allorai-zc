create table public.trips (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references auth.users(id) on delete cascade,
  origin              text,
  destination         text,
  city                text,
  departure_date      date,
  return_date         date,
  budget              numeric,
  preferences         text,
  budget_includes     text[] not null default '{}',
  transportation      text[] not null default '{}',
  interests           text[] not null default '{}',
  constraints         text[] not null default '{}',
  flight_preference   text check (flight_preference in ('budget','balanced','premium','none')),
  lodging_preference  text check (lodging_preference in ('budget','balanced','premium','none')),
  dining_preference   text check (dining_preference in ('budget','balanced','premium','none')),
  activity_preference text check (activity_preference in ('budget','balanced','premium','none')),
  departure_flight    jsonb,
  return_flight       jsonb,
  hotel               jsonb,
  destination_coords  jsonb,
  hotel_coords        jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create table public.trip_activities (
  id         uuid primary key default gen_random_uuid(),
  trip_id    uuid not null references public.trips(id) on delete cascade,
  activity   jsonb not null,
  pinned     boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index trips_user_id_idx        on public.trips(user_id);
create index trips_departure_date_idx on public.trips(user_id, departure_date);
create index trip_activities_trip_idx on public.trip_activities(trip_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trips_set_updated_at
  before update on public.trips
  for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.trips enable row level security;
alter table public.trip_activities enable row level security;

create policy "Users can view own trips"
  on public.trips for select
  using (auth.uid() = user_id);

create policy "Users can insert own trips"
  on public.trips for insert
  with check (auth.uid() = user_id);

create policy "Users can update own trips"
  on public.trips for update
  using (auth.uid() = user_id);

create policy "Users can delete own trips"
  on public.trips for delete
  using (auth.uid() = user_id);

create policy "Users can view own trip activities"
  on public.trip_activities for select
  using (
    exists (
      select 1 from public.trips
      where id = trip_id and user_id = auth.uid()
    )
  );

create policy "Users can insert own trip activities"
  on public.trip_activities for insert
  with check (
    exists (
      select 1 from public.trips
      where id = trip_id and user_id = auth.uid()
    )
  );

create policy "Users can delete own trip activities"
  on public.trip_activities for delete
  using (
    exists (
      select 1 from public.trips
      where id = trip_id and user_id = auth.uid()
    )
  );
