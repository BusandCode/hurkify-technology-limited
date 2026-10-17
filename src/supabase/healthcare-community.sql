-- Run once in the Supabase SQL Editor. Does not change enquiry tables.
create table public.healthcare_discussions (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.healthcare_discussions(id) on delete cascade,
  user_id uuid not null default auth.uid() references auth.users(id),
  author_name text not null check (char_length(author_name) between 2 and 80),
  title text,
  body text not null check (char_length(trim(body)) between 10 and 2500),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  check ((parent_id is null and char_length(trim(title)) between 10 and 160 and title is not null)
    or (parent_id is not null and title is null))
);
create index healthcare_discussions_threads on public.healthcare_discussions(parent_id, created_at desc);
alter table public.healthcare_discussions enable row level security;
revoke all on public.healthcare_discussions from anon, authenticated;
grant select on public.healthcare_discussions to anon, authenticated;
grant insert (parent_id, title, body) on public.healthcare_discussions to authenticated;
create policy "Read published discussions or own pending posts"
  on public.healthcare_discussions for select to anon, authenticated
  using (published or user_id = (select auth.uid()));
create policy "Members submit for moderation"
  on public.healthcare_discussions for insert to authenticated
  with check (user_id = (select auth.uid()) and not published);

-- Derive attribution from the signed-in account, validate reply targets,
-- and rate-limit submissions in the database, not only in the interface.
create function public.prepare_healthcare_post() returns trigger
language plpgsql security definer set search_path = '' as $$
declare display_name text;
begin
  if auth.uid() is null then raise exception 'Sign in before posting'; end if;
  perform pg_advisory_xact_lock(hashtextextended(auth.uid()::text, 0));
  if exists (select 1 from public.healthcare_discussions where user_id = auth.uid() and created_at > now() - interval '1 minute') then
    raise exception 'Please wait a minute before posting again';
  end if;
  if (select count(*) from public.healthcare_discussions where user_id = auth.uid() and created_at > now() - interval '1 day') >= 20 then
    raise exception 'Daily posting limit reached. Please return tomorrow';
  end if;
  if new.parent_id is not null and not exists (select 1 from public.healthcare_discussions where id = new.parent_id and parent_id is null and published) then
    raise exception 'This question is not open for replies';
  end if;
  select coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', 'Community member') into display_name from auth.users where id = auth.uid();
  new.author_name := left(coalesce(nullif(trim(display_name), ''), 'Community member'), 80);
  if char_length(new.author_name) < 2 then new.author_name := 'Community member'; end if;
  new.user_id := auth.uid();
  new.published := false;
  new.created_at := now();
  return new;
end;
$$;
revoke all on function public.prepare_healthcare_post() from public;
create trigger prepare_healthcare_post before insert on public.healthcare_discussions
  for each row execute function public.prepare_healthcare_post();
-- No public UPDATE or DELETE. An owner moderates in the Supabase dashboard.
