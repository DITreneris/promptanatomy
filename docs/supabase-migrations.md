# Supabase migracijos (user_access)

**Kanonas:** versijuojamas SQL – [supabase/migrations/](../supabase/migrations/). Pirmoji migracija: `20260324120000_user_access_baseline.sql` (idempotent `CREATE TABLE IF NOT EXISTS` + stulpelių komentarai).

[docs/supabase-user-access.sql](supabase-user-access.sql) – santrauka ir rankinio paleidimo atsarginis variantas (tas pats DDL); laikykite sinchronizuotą su migracija.

## Kas nevyksta automatiškai

**Vercel ir FastAPI deploy SQL nevykdo.** Migracijas pritaiko operatorius (Supabase SQL Editor, Supabase CLI `db push`, arba Supabase GitHub branching), pagal jūsų aplinką.

## Pritaikymas: saugi tvarka

1. **Staging (arba kopija)** – pirmiausia. Jei lentelė jau egzistuoja, baseline migracija lentelės nekurs; `COMMENT ON COLUMN` atnaujins komentarus.
2. **Produkcija** – tik po sėkmingo staging. Jei projektas jau turi `user_access` ir naudojate Supabase CLI migracijų istoriją, vadovaukitės [Supabase: Database migrations](https://supabase.com/docs/guides/deployment/database-migrations) (brownfield: `migration repair` / baseline, kad istorija nesidubliuotų).
3. **Alternatyva be CLI** – Supabase SQL Editor: nukopijuokite migracijos failo turinį ir paleiskite vieną kartą (tas pats SQL kaip repo).

## Schema auditas (prieš pirmą migraciją gyvoje DB)

Supabase Table Editor arba `\d user_access` – stulpeliai turi atitikti migraciją: `id`, `email` (UNIQUE), `stripe_customer_id`, `highest_plan`, `updated_at`, `created_at`. Jei produkcijoje skirtumas – pirmiau sutvarkykite dokumentą arba atskirą migraciją; nekelkite bendro baseline, kol neatitinka tikrovės.

## El. paštas

Visi įrašai ir paieška – `lower(trim(email))` konvencija (žr. `supabase-user-access.sql` pabaigoje). Masinis `UPDATE` dėl mišrių raidžių – atskira, peržiūrėta migracija (su dublikatų patikra).
