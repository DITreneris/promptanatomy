-- MVP upgrade: user_access table for Supabase.
-- Kanonas (versijuojama): supabase/migrations/20260324120000_user_access_baseline.sql
-- Šis failas – santrauka / rankinis atsarginis paleidimas per SQL Editor.
-- Email stored lowercased; unique on email for upsert. Žr. docs/supabase-migrations.md

create table if not exists user_access (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  stripe_customer_id text,
  highest_plan integer not null default 0,
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

comment on column user_access.email is 'Lowercased email; backend always sends lower(email)';
comment on column user_access.highest_plan is 'Module cap: 3, 6, 9 (prod M1-9), 12, 15; 0 = no purchase. Operator registry: docs/user-access-tier-registry.md';
comment on column user_access.stripe_customer_id is 'Stripe customer id from checkout.session.completed';

-- Hardening (20260603120000_user_access_hardening.sql): RLS enabled, no policies;
-- REVOKE anon/authenticated. CHECK (20260710120000): highest_plan in (0,3,6,9,12,15).
-- Bulk import: scripts/import_user_access.py

-- Rankinis upsert (produkcija): VISADA naudokite lower(email). Kitu atveju api/access.js ir
-- stripe-webhook.js ieško vickyva@gmail.com, o DB gali turėti Vickyva@gmail.com – eilutė
-- nerandama (PostgreSQL text lyginimas case-sensitive), UI rodo „No access found“.
--
-- Pavyzdys – du adresai (pridėkite arba pašalinkite eilutes pagal poreikį):
--
-- insert into user_access (email, highest_plan)
-- values
--   (lower('Vickyva@gmail.com'), 6),
--   (lower('kitas@example.com'), 6)
-- on conflict (email) do update set
--   highest_plan = greatest(user_access.highest_plan, excluded.highest_plan),
--   updated_at = now();
--
-- Vienkartinis pataisymas jau egzistuojančių mišrių raidžių:
-- update user_access set email = lower(trim(email)) where email <> lower(trim(email));
