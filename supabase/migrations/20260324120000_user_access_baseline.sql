-- Baseline: user_access (idempotent). Matches docs/supabase-user-access.sql.
-- Safe on existing DB: CREATE TABLE IF NOT EXISTS is a no-op when table exists.
-- Email stored lowercased; application uses trim + lower on all paths.

create table if not exists user_access (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  stripe_customer_id text,
  highest_plan integer not null default 0,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

comment on column user_access.email is 'Lowercased email; backend always sends lower(email)';
comment on column user_access.highest_plan is '3, 6, 12, or 15 (module cap); 0 = no purchase';
comment on column user_access.stripe_customer_id is 'Stripe customer id from checkout.session.completed';
