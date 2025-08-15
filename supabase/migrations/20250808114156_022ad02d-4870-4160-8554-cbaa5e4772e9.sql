-- Create audios table similar to videos
create table if not exists public.audios (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  author text not null,
  category text not null,
  tags text[] default '{}'::text[],
  duration text,
  audio_url text not null,
  thumbnail text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.audios enable row level security;

-- Policies (match permissive style of existing videos table)
create policy "Everyone can view audios"
  on public.audios
  for select
  using (true);

create policy "Anyone can create audios"
  on public.audios
  for insert
  with check (true);

create policy "Anyone can update audios"
  on public.audios
  for update
  using (true);

create policy "Anyone can delete audios"
  on public.audios
  for delete
  using (true);

-- Optional: trigger to auto-update updated_at on updates
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger audios_set_updated_at
before update on public.audios
for each row execute function public.update_updated_at_column();

-- Create storage buckets for audio files and thumbnails
insert into storage.buckets (id, name, public)
values ('audios', 'audios', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('audio-thumbnails', 'audio-thumbnails', true)
on conflict (id) do nothing;

-- Storage policies for public access and uploads (consistent with existing openness)
-- Read access for public
create policy "Public can read audios bucket"
  on storage.objects for select
  using (bucket_id = 'audios');

create policy "Public can read audio-thumbnails bucket"
  on storage.objects for select
  using (bucket_id = 'audio-thumbnails');

-- Allow anyone to upload/update/delete (to match current project openness)
create policy "Anyone can upload to audios bucket"
  on storage.objects for insert
  with check (bucket_id = 'audios');

create policy "Anyone can update audios bucket"
  on storage.objects for update
  using (bucket_id = 'audios');

create policy "Anyone can delete from audios bucket"
  on storage.objects for delete
  using (bucket_id = 'audios');

create policy "Anyone can upload to audio-thumbnails bucket"
  on storage.objects for insert
  with check (bucket_id = 'audio-thumbnails');

create policy "Anyone can update audio-thumbnails bucket"
  on storage.objects for update
  using (bucket_id = 'audio-thumbnails');

create policy "Anyone can delete from audio-thumbnails bucket"
  on storage.objects for delete
  using (bucket_id = 'audio-thumbnails');