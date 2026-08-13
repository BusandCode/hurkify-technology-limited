-- Run this in the Supabase SQL editor for the project.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  service text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Allow the anon key (used by the server action) to insert new leads only.
-- No select/update/delete policy is created, so submissions can't be read
-- back via the public anon key — read them from the Supabase dashboard or
-- a service-role key in an internal tool.
create policy "Allow public inserts"
  on public.contact_submissions
  for insert
  to anon
  with check (true);
