-- Add highest_plan=9 to CHECK (operator grant for select clients; prod has tier-9 rows).
-- Apply after 20260603120000_user_access_hardening.sql (or replaces its CHECK if not yet applied).
-- Idempotent. service_role bypasses RLS (server API unchanged).
--
-- Rollback (if needed):
--   alter table public.user_access drop constraint if exists user_access_highest_plan_check;
--   alter table public.user_access add constraint user_access_highest_plan_check
--     check (highest_plan in (0, 3, 6, 12, 15));

alter table public.user_access
  drop constraint if exists user_access_highest_plan_check;

alter table public.user_access
  add constraint user_access_highest_plan_check
  check (highest_plan in (0, 3, 6, 9, 12, 15));
