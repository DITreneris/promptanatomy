-- Finish hardening that 20260603120000 did not fully land on the live hub DB.
-- Do not re-apply 20260603120000: its CHECK omits 9 and fails while tier-9 rows exist.
-- CHECK (0, 3, 6, 9, 12, 15) is already in place. Idempotent.

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
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

revoke all on table public.user_access from anon, authenticated;

drop policy if exists "Users can read own access" on public.user_access;

comment on column public.user_access.highest_plan is
  'Module cap: 3, 6, 9 (prod M1-9), 12, 15; 0 = no purchase. Operator registry: docs/user-access-tier-registry.md';
