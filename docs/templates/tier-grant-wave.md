# Tier grant wave — checklist template

Copy to `docs/archive/snapshots/tier-grants-YYYY-MM.md` (or keep notes private). Do **not** commit raw email lists or `.xlsx` PII.

**Playbook:** [upgrade-playbook.md](../upgrade-playbook.md) §8. **Registry:** [user-access-tier-registry.md](../user-access-tier-registry.md) §3.

| Field | Value |
|-------|--------|
| Wave date | YYYY-MM-DD |
| Path | cohort / B2B / individual |
| Target `highest_plan` | 9 / 12 (or 3/6 if Core import only) |
| Email count | N (whitelist held offline) |
| Executor | operator name |
| Method | SQL `greatest` / import `--plan 3\|6` |

## Checklist

- [ ] Whitelist approved by operator
- [ ] Preview: `select email, highest_plan from user_access where email in (...);`
- [ ] Apply
- [ ] Counts: `select highest_plan, count(*) from user_access group by highest_plan order by 1;`
- [ ] Registry §3 + snapshot updated
- [ ] CHANGELOG Operacijos
- [ ] Smoke: LP Check + **new** magic link (1–2 emails)

## Counts (after)

| `highest_plan` | count |
|----------------|-------|
| 3 | |
| 6 | |
| 9 | |
| 12 | |

## Notes

_
