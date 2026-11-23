# Agent hierarchy

**Snapshot:** 2026-10-23. Short map of who belongs where. Each repo keeps its own roster. The hub orchestrator does not command spoke agents.

**Count:** **53** named agents. **14** have a Cursor stub (`.cursor/agents/*.md`). **41** skill packs (`SKILL.md`, `_template` excluded). A skill pack is a workflow, not a second agent, unless the repo has no other name for that worker.

`.help` and `.lol` have no local checkout. `.help` is from GitHub `DITreneris/personalas` HEAD. `.lol` (`DITreneris/ladder`) has no `AGENTS.md` and no `.cursor/`. Training agents live in `C:\060_promptu_anatomija`; the hub submodule `apps/prompt-anatomy` has none. Not in this map: Sales OS, `.org`, `.online`.

---

## Belonging

```
Prompt Anatomy
├── .app   hub          8   orchestrator → 7 specialists
├── /anatomy training  10   own orchestrator → pipeline
├── .site  discovery    5   flat roster
├── .cloud enter        7   one flow, prose lanes + 2 skills
├── .info  use          5   orchestrator → 4
├── .space create       6   orchestrator → 5
├── .help  hire         5   orchestrator → 4
├── .ceo   manage       5   orchestrator → content, UI, QA, backend
├── .pro   decide       0   two skills, no named agent
├── .blog  deepen       2   plus an unnamed implementer
└── .lol   play         0
```

---

## .app — hub (`C:\059_home_page`) — 8

`orchestrator` (skill only) routes hub work.

| Agent | Owns |
|-------|------|
| frontend-agent | LP, `frontend/`, hub SEO |
| backend-agent | `backend/`, `api/` |
| supabase-agent | SQL, RLS, registry |
| fullstack-agent | LP + API + submodule, deploy |
| q-and-a-agent | How it works, docs |
| quality-assurance-agent | Review before merge |
| video-agent | Remotion films in `video/` (hub and spoke films; the agent stays here) |

Stubs: 7. Skills: those 7 + `orchestrator`. `_template` is not an agent.

## Training — `/anatomy` (`C:\060_promptu_anatomija`) — 10

`ORCHESTRATOR` → `CURRICULUM` → `CONTENT` → `SCHEME` (if a diagram) → `DATA` → `CODING` → `UI_UX` → `QA`. Also `USER_JOURNEY` and `CODE_REVIEW`. Each has a skill. No `.cursor/agents` stubs.

## .site — discovery (`C:\68_site`) — 5

Flat. No orchestrator.

| Agent | Skills |
|-------|--------|
| ui-builder | — |
| content-editor | ecosystem-content, anatomizer-prompt |
| seo-specialist | seo-crawler |
| verifier | — |
| changelog-keeper | — |

Extra skills, no agent of their own: `deploy-vercel`, `scaffold-mvp`.

## .cloud — enter (`C:\64_APK`) — 7

One flow. Prose lanes: orchestrator, content, frontend, PDF sync, library. Skill agents called from that flow: `data-agent`, `q-a-agent`. No stubs.

## .info — use (`C:\biblioteka-restore`) — 5

Orchestrator → Content, Curriculum, UI/UX, QA. No stubs. Six skill packs sit under those roles: `hero-copy`, `locale-switcher`, `locale-sync`, `design-token-guard`, `release-changelog`, `test-debug`.

## .space — create (`C:\03_uzduotys`) — 6

```
Orchestrator
├── Content
├── Curriculum
├── UI/UX
├── Commerce
└── QA
```

Feedback Store is a metric sink, not an agent. No stubs, no skills.

## .help — hire (`DITreneris/personalas`) — 5

Same shape as `.space` without Commerce: Orchestrator → Content, Curriculum, UI/UX, QA. Feedback Store is off. No stubs. One skill: `vercel-deploy`. Commit prefixes are labels, not agents.

## .ceo — manage (`C:\05_DI_operacine_sistema_TOP_vadvams_CEO_COO`) — 5

Orchestrator → Content, UI/UX, QA, and `backend-agent` (Stripe fulfillment). Skills on disk: `orchestrator`, `backend-agent`. No stubs.

## .pro — decide (`C:\066_Leader`) — 0 named

No roster. Two skills for the default coding agent: `executive-landing-improvement` (the page), `decision` (one JEV card, stops at NEEDS_HUMAN).

## .blog — deepen (`C:\08_PA_blog`) — 2

| Agent | Owns |
|-------|------|
| editorial-agent | Corpus audit, editorial plan |
| q-and-a-agent | Questions, CHANGELOG, design-system docs |

Theme, templates, and articles go to an unnamed default implementer. Skills: `add-article`, `editorial-audit`, `satori-hero`, `theme-release`, `production-release`.

## .lol — play (`DITreneris/ladder`) — 0

No agent roster and no Cursor skills in the repo.
