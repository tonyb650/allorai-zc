alter table public.trips
  add column name text;

update public.trips
set name = coalesce(
  nullif(trim(name), ''),
  (
    case
      when departure_date is not null then
        to_char(departure_date, 'FMMonth') || ' trip to ' || coalesce(
          nullif(trim(split_part(city, ',', 1)), ''),
          nullif(trim(split_part(destination, ',', 1)), ''),
          'Unknown destination'
        )
      else
        'Trip to ' || coalesce(
          nullif(trim(split_part(city, ',', 1)), ''),
          nullif(trim(split_part(destination, ',', 1)), ''),
          'Unknown destination'
        )
    end
  )
);

alter table public.trips
  alter column name set not null;
