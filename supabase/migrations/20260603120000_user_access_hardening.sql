-- Hardening: RLS deny-by-default for anon/authenticated; CHECK on highest_plan; updated_at trigger.
-- Safe on existing DB: idempotent where possible. service_role bypasses RLS (server API unchanged).

alter table if exists public.user_access enable row level security;

revoke all on table public.user_access from anon, authenticated;

alter table public.user_access
  drop constraint if exists user_access_highest_plan_check;

alter table public.user_access
  add constraint user_access_highest_plan_check
  check (highest_plan in (0, 3, 6, 12, 15));

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists user_access_updated_at on public.user_access;

create trigger user_access_updated_at
  before update on public.user_access
  for each row execute function public.set_updated_at();
