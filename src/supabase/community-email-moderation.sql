-- Run after healthcare-community.sql. Does not change public posting policies.
create table public.community_review_tokens (
  token_hash text primary key,
  post_id uuid unique references public.healthcare_discussions(id) on delete set null,
  expires_at timestamptz not null default now() + interval '7 days',
  used_at timestamptz,
  decision text check (decision in ('approve', 'reject')),
  notified_at timestamptz
);
alter table public.community_review_tokens enable row level security;
revoke all on public.community_review_tokens from public, anon, authenticated;
grant all on public.community_review_tokens to service_role;

-- Consume the link and moderate the post in one atomic transaction.
create function public.moderate_healthcare_post(review_hash text, review_action text)
returns text language plpgsql security definer set search_path = '' as $$
declare ticket public.community_review_tokens; post public.healthcare_discussions;
begin
  if review_action is null or review_action not in ('approve', 'reject') then raise exception 'Invalid action'; end if;
  select * into ticket from public.community_review_tokens where token_hash = review_hash for update;
  if not found or ticket.used_at is not null or ticket.expires_at <= now() or ticket.post_id is null then
    raise exception 'This review link has expired or has already been used';
  end if;
  select * into post from public.healthcare_discussions where id = ticket.post_id for update;
  if not found or post.published then raise exception 'This post has already been reviewed'; end if;
  if review_action = 'approve' then
    if post.parent_id is not null and not exists (select 1 from public.healthcare_discussions where id = post.parent_id and published) then
      raise exception 'The parent question is not published';
    end if;
    update public.healthcare_discussions set published = true where id = post.id;
  else
    delete from public.healthcare_discussions where id = post.id;
  end if;
  update public.community_review_tokens set used_at = now(), decision = review_action where token_hash = review_hash;
  return review_action;
end;
$$;
revoke all on function public.moderate_healthcare_post(text, text) from public, anon, authenticated;
grant execute on function public.moderate_healthcare_post(text, text) to service_role;
