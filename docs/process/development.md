# Development workflow

1. **Užduotis** – nustatykite scope (frontend / backend / abu). Žiūrėkite [AGENTS.md](../../AGENTS.md) – kuris agentas tinkamas.
2. **Agentai** – deleguokite: frontend-agent, backend-agent arba fullstack-agent pagal keičiamus failus.
3. **Kodas** – implementacija laikantis `.cursor/rules/` (project-global, frontend.mdc, backend.mdc). **DoD Lygis A:** [dod_system.md](dod_system.md) §2.
4. **Kokybe** – po reikšmingų pakeitimų paleiskite **quality-assurance-agent** (code review, saugumas, taisyklių laikymasis). **DoD Lygis B:** [dod_system.md](dod_system.md) §3.
5. **CI** – PR į `main`: workflow **CI** / job **Golden Legacy** turi būti žalias (tas pats regresijos rinkinys kaip [golden-legacy-standard.md](../golden-legacy-standard.md) 5 skyriuje).
6. **Dokumentacija** – jei pakeitimas liečia API, konfigūraciją, procesą ar **LP viešą copy** (Hero, WhatIs, Navbar skaičiai), atnaujinkite README, TODO arba `docs/` pagal [documentation.md](documentation.md) (įskaitant [golden-legacy-standard.md](../golden-legacy-standard.md) §1–3 ir [CHANGELOG.md](../../CHANGELOG.md), kai keičiasi kanoniniai faktai).
7. **Deploy** – po merge: produkcijos smoke ir env. **DoD Lygis C:** [dod_system.md](dod_system.md) §4.

Klausimams apie projektą ar dokumentaciją naudokite **q-and-a-agent**. Pilnas DoD checklist: [dod_system.md](dod_system.md) §6.
