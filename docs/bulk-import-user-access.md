# Bulk import: user_access iš Excel

Vienkartinis akademijos dalyvių įkėlimas į Supabase `user_access` be rankinio SQL.

## Reikalavimai

- Python 3.11+
- `backend/.env` su `SUPABASE_URL` ir `SUPABASE_SERVICE_ROLE_KEY`
- `pip install openpyxl` (vienkartinis importas)
- Backend priklausomybės: `cd backend && pip install -r requirements.txt`

## Excel formatas

Skriptas [`scripts/import_user_access.py`](../scripts/import_user_access.py) tikisi:

| Stulpelis | Turinys |
|-----------|---------|
| **B** | Vardas Pavardė |
| **C** | El. pašto adresas |

Praleidžiami sesijų antraštės („Birželio…“, „Liepos…“) ir etiketės („Vardas Pavardė“, „El. pašto“).

## Paleidimas

```bash
# 1) (Vieną kartą) Supabase SQL Editor – hardening migracija
#    supabase/migrations/20260603120000_user_access_hardening.sql

# 2) Sausas bėgimas – tik peržiūra, be DB rašymo
pip install openpyxl
cd backend
python ../scripts/import_user_access.py "../registracija i Promtu Akademijos mokymus.xlsx" --dry-run

# 3) Įkėlimas (numatyta: highest_plan=3, moduliai 1–3)
python ../scripts/import_user_access.py "../registracija i Promtu Akademijos mokymus.xlsx" --apply

# Jei reikia pilno plano 2 (1–6 mod.):
python ../scripts/import_user_access.py "../registracija i Promtu Akademijos mokymus.xlsx" --apply --plan 6
```

Planai: numatyta `--plan 3` (1–3 mod., planas 1); `--plan 6` (1–6 mod., planas 2) – [payment-best-practices.md](payment-best-practices.md).

## Elgsena

- Email normalizuojamas: `lower(trim())`
- Dubliatai faile – perspėjimas; naudojama paskutinė eilutė to email
- Upsert: `new_highest = max(current, --plan)` – neperrašo aukštesnio plano
- `stripe_customer_id` lieka NULL (rankinis importas)

## Patikra po importo

1. LP → „Patikrinti prieigą“ su 2–3 email
2. „Eiti į mokymus“ → magic link
3. Supabase: `select count(*), highest_plan from user_access group by highest_plan;`

## Saugumas

- **Nekomituokite** `.xlsx` su dalyvių PII (žr. `.gitignore`)
- Skriptą paleiskite tik lokaliai su service role; raktų ne committinkite
